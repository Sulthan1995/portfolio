<script setup lang="ts">
import type { SiteData } from '../data/site'

defineProps<{ site: SiteData }>()
</script>

<template>
  <section id="projects" class="section projects reveal">
    <div class="projectsPanel">
      <div class="projectsPanel__head">
        <div class="projectsPanel__headLeft">
          <p class="projectsPanel__eyebrow">Featured projects</p>
        </div>
        <a class="projectsPanel__cta" href="#" aria-label="Full case studies">
          <span>Full case studies</span>
          <span aria-hidden="true">→</span>
        </a>
      </div>

      <ul class="projectsGrid">
        <li v-for="p in site.projects" :key="p.name" class="projectsCard">
          <h3 class="projectsCard__name">{{ p.name }}</h3>
          <p class="projectsCard__desc">{{ p.description }}</p>
          <ul class="projectsCard__tags">
            <li v-for="t in p.stack" :key="t">{{ t }}</li>
          </ul>
          <a class="projectsCard__link" :href="p.link" target="_blank" rel="noopener noreferrer">
            <span class="projectsCard__linkIcon" aria-hidden="true">↗</span>
            Preview
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>
