<script setup lang="ts">
import { computed } from 'vue'
import type { SiteData } from '../data/site'

const props = defineProps<{ site: SiteData }>()

const parts = computed(() => {
  const n = props.site.name.trim().split(/\s+/)
  const first = n[0] ?? ''
  const rest = n.slice(1).join(' ')
  return { first, rest }
})

const heroLine = computed(() =>
  props.site.heroRoles.join(' | ').toUpperCase(),
)
</script>

<template>
  <header id="top" class="hero">
    <div class="hero__stage">
      <p class="hero__badge">
        <span class="hero__badge-dot" aria-hidden="true" />
        {{ site.availability.toUpperCase() }}
      </p>

      <h1 class="hero__headline">
        <span class="hero__headline-row">
          <span class="hero__headline-name"
            >{{ parts.first }}</span
          >
        </span>
        <span v-if="parts.rest" class="hero__headline-surname">
          {{ parts.rest }}
          <span class="hero__headline-accent" aria-hidden="true" />
        </span>
      </h1>
      <p class="hero__subtitle">{{ heroLine }}</p>
    </div>

    <a class="hero__scroll" href="#about">
      <span class="hero__scroll-label">Scroll to explore</span>
      <span class="hero__scroll-visual" aria-hidden="true">
        <svg class="hero__scroll-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M6 9l6 6 6-6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <span class="hero__scroll-line" />
      </span>
    </a>
  </header>
</template>
