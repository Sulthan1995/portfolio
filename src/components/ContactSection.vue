<script setup lang="ts">
import { computed } from 'vue'
import type { SiteData } from '../data/site'

const props = defineProps<{ site: SiteData }>()

function pick(url: string, re: RegExp): string | null {
  const m = url.match(re)
  return m?.[1] ? m[1] : null
}

const linkedinLine = computed(() => pick(props.site.social.linkedin, /linkedin\.com\/in\/([^/?#]+)/i))
const githubUser = computed(() => pick(props.site.social.github, /github\.com\/([^/?#]+)/i))
const xUser = computed(() => pick(props.site.social.x, /(?:x\.com|twitter\.com)\/([^/?#]+)/i))
const igUser = computed(() => pick(props.site.social.instagram, /instagram\.com\/([^/?#]+)/i))

const linkedinSub = computed(() => (linkedinLine.value ? 'in/' + linkedinLine.value : ''))
const githubSub = computed(() => (githubUser.value ? '@' + githubUser.value : ''))
const xSub = computed(() => (xUser.value ? '@' + xUser.value : ''))
const igSub = computed(() => (igUser.value ? '@' + igUser.value : ''))
</script>

<template>
  <footer id="contact" class="section contact reveal">
    <div class="contactPanel tiltCard tiltCard--subtle">
      <div class="contactPanel__left">
        <p class="contactPanel__eyebrow">Connectivity</p>
        <h2 class="contactPanel__title">
          <span class="contactPanel__titleLine">Ready for the</span>
          <span class="contactPanel__titleAccent">next mission?</span>
        </h2>

        <p class="contactPanel__location">
          <span class="contactPanel__pin" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path
                d="M12 21s7-5.2 7-11a7 7 0 10-14 0c0 5.8 7 11 7 11z"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 10.2a2.2 2.2 0 110-4.4 2.2 2.2 0 010 4.4z"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          {{ site.location }}
        </p>

        <a class="contactCTA" :href="'mailto:' + site.social.email">
          <span class="contactCTA__kicker">Start conversation</span>
          <span class="contactCTA__value">{{ site.social.email }}</span>
          <span class="contactCTA__icon" aria-hidden="true">↗</span>
        </a>
      </div>

      <div class="contactPanel__right">
        <a v-if="linkedinLine" class="contactCard" :href="site.social.linkedin" target="_blank" rel="noopener noreferrer">
          <div class="contactCard__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path
                d="M4.98 3.5A2.5 2.5 0 102.5 6a2.5 2.5 0 002.48-2.5zM3 8.98h3.96V21H3V8.98zM9.03 8.98H13v1.64h.06c.55-1.04 1.9-2.14 3.92-2.14 4.2 0 4.98 2.77 4.98 6.36V21h-3.96v-5.47c0-1.31-.02-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9V21H9.03V8.98z"
              />
            </svg>
          </div>
          <div class="contactCard__label">LinkedIn</div>
          <div class="contactCard__value">{{ linkedinSub }}</div>
        </a>

        <a v-if="githubUser" class="contactCard" :href="site.social.github" target="_blank" rel="noopener noreferrer">
          <div class="contactCard__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path
                d="M12 .5a12 12 0 00-3.79 23.4c.6.11.82-.26.82-.58v-2.17c-3.34.73-4.04-1.61-4.04-1.61-.55-1.4-1.34-1.77-1.34-1.77-1.09-.75.08-.74.08-.74 1.2.09 1.84 1.24 1.84 1.24 1.07 1.84 2.8 1.31 3.49 1 .11-.77.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.97 0-1.32.47-2.4 1.24-3.25-.12-.3-.54-1.52.12-3.17 0 0 1-.32 3.3 1.24a11.4 11.4 0 016 0C17.28 2.7 18.28 3 18.28 3c.66 1.65.24 2.87.12 3.17.77.85 1.24 1.93 1.24 3.25 0 4.64-2.8 5.66-5.48 5.96.43.37.82 1.1.82 2.22v3.28c0 .32.22.7.82.58A12 12 0 0012 .5z"
              />
            </svg>
          </div>
          <div class="contactCard__label">GitHub</div>
          <div class="contactCard__value">{{ githubSub }}</div>
        </a>

        <a v-if="xUser" class="contactCard" :href="site.social.x" target="_blank" rel="noopener noreferrer">
          <div class="contactCard__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path
                d="M18.9 2H22l-6.8 7.77L23.2 22H16.7l-5.1-6.6L5.6 22H2.5l7.4-8.45L1.2 2h6.6l4.6 5.95L18.9 2zm-1.1 18h1.7L6.9 3.9H5.1L17.8 20z"
              />
            </svg>
          </div>
          <div class="contactCard__label">X</div>
          <div class="contactCard__value">{{ xSub }}</div>
        </a>

        <a v-if="igUser" class="contactCard" :href="site.social.instagram" target="_blank" rel="noopener noreferrer">
          <div class="contactCard__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
              <rect x="6.2" y="6.2" width="11.6" height="11.6" rx="3.2" stroke-width="1.6" />
              <path
                d="M12 15.4a3.4 3.4 0 110-6.8 3.4 3.4 0 010 6.8z"
                stroke-width="1.6"
              />
              <path d="M16.95 7.85h.02" stroke-width="2.6" stroke-linecap="round" />
            </svg>
          </div>
          <div class="contactCard__label">Instagram</div>
          <div class="contactCard__value">{{ igSub }}</div>
        </a>
      </div>
    </div>
  </footer>
</template>
