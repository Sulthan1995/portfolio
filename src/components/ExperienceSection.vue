<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import type { SiteData } from '../data/site'

const props = defineProps<{ site: SiteData }>()

type Stat = { value: string; label: string }

const now = ref(Date.now())
let t: number | undefined

onMounted(() => {
  t = window.setInterval(() => {
    now.value = Date.now()
  }, 1000)
})

onUnmounted(() => {
  if (t) window.clearInterval(t)
})

function diffParts(from: Date, to: Date) {
  const start = new Date(from)
  const end = new Date(to)
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end <= start) {
    return { years: 0, months: 0, days: 0, hours: 0, mins: 0, secs: 0 }
  }

  let years = end.getFullYear() - start.getFullYear()
  let months = end.getMonth() - start.getMonth()
  let days = end.getDate() - start.getDate()
  let hours = end.getHours() - start.getHours()
  let mins = end.getMinutes() - start.getMinutes()
  let secs = end.getSeconds() - start.getSeconds()

  if (secs < 0) {
    secs += 60
    mins -= 1
  }
  if (mins < 0) {
    mins += 60
    hours -= 1
  }
  if (hours < 0) {
    hours += 24
    days -= 1
  }
  if (days < 0) {
    const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0).getDate()
    days += prevMonth
    months -= 1
  }
  if (months < 0) {
    months += 12
    years -= 1
  }

  return { years, months, days, hours, mins, secs }
}

const stats = computed<Stat[]>(() => {
  const startStr = props.site.currentRoleStart
  const start = startStr ? new Date(startStr) : new Date()
  const d = diffParts(start, new Date(now.value))
  const pad2 = (n: number) => String(n).padStart(2, '0')
  return [
    { value: pad2(d.years), label: 'YRS' },
    { value: pad2(d.months), label: 'MOS' },
    { value: pad2(d.days), label: 'DAYS' },
    { value: pad2(d.hours), label: 'HRS' },
    { value: pad2(d.mins), label: 'MIN' },
    { value: pad2(d.secs), label: 'SEC' },
  ]
})
</script>

<template>
  <section id="experience" class="section experience reveal">
    <div class="experiencePanel tiltCard">
      <div class="experiencePanel__top">
        <h2 class="experiencePanel__title">Experience</h2>
        <p class="experiencePanel__kicker">Career path</p>
      </div>

      <div class="experiencePanel__stats">
        <p class="experiencePanel__stats-label">Current role</p>
        <div class="experiencePanel__stats-row">
          <div v-for="s in stats" :key="s.label" class="experienceStat">
            <div class="experienceStat__value">{{ s.value }}</div>
            <div class="experienceStat__label">{{ s.label }}</div>
          </div>
        </div>
      </div>

      <ol class="experienceTimeline">
        <li v-for="job in site.experience" :key="job.role + job.period" class="experienceTimeline__item">
          <span class="experienceTimeline__dot" aria-hidden="true" />
          <div class="experienceTimeline__content tiltCard tiltCard--subtle">
            <h3 class="experienceTimeline__role">{{ job.role }}</h3>
            <p class="experienceTimeline__company">{{ job.company }}</p>
            <p class="experienceTimeline__summary">{{ job.summary }}</p>
            <ul class="experienceTimeline__stack">
              <li v-for="t in job.stack" :key="t">{{ t }}</li>
            </ul>
          </div>
          <span class="experienceTimeline__period">{{ job.period }}</span>
        </li>
      </ol>
    </div>
  </section>
</template>
