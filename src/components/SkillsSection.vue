<script setup lang="ts">
import { computed } from 'vue'
import type { SiteData } from '../data/site'

const props = defineProps<{ site: SiteData }>()

const iconMap: Record<string, string> = {
  'Vue.js': '/skill-icons/vue.svg',
  Laravel: '/skill-icons/laravel.svg',
  AWS: '/skill-icons/aws.svg',
  Python: '/skill-icons/python.svg',
  JavaScript: '/skill-icons/javascript.svg',
  'Node.js': '/skill-icons/nodejs.svg',
  Git: '/skill-icons/git.svg',
  Figma: '/skill-icons/figma.svg',
  Vite: '/skill-icons/vite.svg',
  HTML: '/skill-icons/html.svg',
  CSS: '/skill-icons/css.svg',
  Cursor: '/skill-icons/cursor.svg',
  Codex: '/skill-icons/codex.svg',
  Windsurf: '/skill-icons/windsurf.svg',
}

const items = computed(() =>
  props.site.skills.map((s) => {
    const initials =
      s.name
        .replace(/[^a-z0-9 ]/gi, ' ')
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((p) => p[0])
        .join('')
        .toUpperCase() || '•'
    const iconSrc = iconMap[s.name] ?? null
    return { ...s, initials, iconSrc }
  }),
)
</script>

<template>
  <section id="skills" class="section skills reveal">
    <div class="skills__panel tiltCard">
      <div class="skills__head">
        <p class="skills__head-left">Technical Proficiency</p>
        <p class="skills__head-right">Core Arsenal</p>
      </div>
      <ul class="skills__grid">
        <li v-for="s in items" :key="s.name" class="skills__card tiltCard tiltCard--subtle">
          <div class="skills__icon" aria-hidden="true">
            <img v-if="s.iconSrc" class="skills__icon-img" :src="s.iconSrc" :alt="s.name" />
            <span v-else class="skills__icon-fallback">{{ s.initials }}</span>
          </div>
          <span class="skills__name">{{ s.name }}</span>
          <span class="skills__cat">{{ s.category }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>
