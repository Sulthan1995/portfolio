<script setup lang="ts">
import { computed } from 'vue'
import type { SiteData } from '../data/site'

const props = defineProps<{ site: SiteData }>()

const initial = computed(() => (props.site.name.trim()[0] ?? 'S').toUpperCase())
</script>

<template>
  <section id="about" class="section intro reveal">
    <div class="introCard tiltCard">
      <div class="introCard__avatar" aria-hidden="true">{{ initial }}</div>
      <div class="introCard__content">
        <p class="introCard__eyebrow">Introduction</p>
        <h2 class="introCard__title">{{ site.name }}</h2>
        <p class="introCard__role">{{ site.title }}</p>
        <p class="introCard__body">{{ site.tagline }}</p>
      </div>
    </div>
  </section>
</template>
