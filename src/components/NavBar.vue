<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'

const STORAGE_KEY = 'portfolio-theme'

const SECTION_IDS = ['about', 'skills', 'experience', 'projects', 'contact'] as const
type SectionId = (typeof SECTION_IDS)[number]

const isDark = ref(true)
const activeId = ref<SectionId>('about')
const hoverId = ref<SectionId | null>(null)

const linksWrapRef = ref<HTMLElement | null>(null)
const indicatorStyle = ref({
  left: '0px',
  width: '0px',
  opacity: '0',
})

function syncDom() {
  document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
  localStorage.setItem(STORAGE_KEY, isDark.value ? 'dark' : 'light')
}

function pickActiveSection() {
  const marker = 100
  let current: SectionId = SECTION_IDS[0]
  for (const id of SECTION_IDS) {
    const el = document.getElementById(id)
    if (!el) continue
    if (el.getBoundingClientRect().top <= marker) {
      current = id
    }
  }
  activeId.value = current
}

function updateIndicatorPosition() {
  const wrap = linksWrapRef.value
  if (!wrap) return
  const id = hoverId.value ?? activeId.value
  const link = wrap.querySelector(`a[data-nav="${id}"]`) as HTMLElement | null
  if (!link) return
  const wr = wrap.getBoundingClientRect()
  const lr = link.getBoundingClientRect()
  const lineW = Math.min(lr.width * 0.72, 38)
  const center = lr.left - wr.left + lr.width / 2
  indicatorStyle.value = {
    left: `${center - lineW / 2}px`,
    width: `${lineW}px`,
    opacity: '1',
  }
}

let onScroll: (() => void) | undefined
let ro: ResizeObserver | undefined

function onLinkEnter(id: SectionId) {
  hoverId.value = id
}

function onLinksLeave() {
  hoverId.value = null
}

watch([activeId, hoverId], () => nextTick(updateIndicatorPosition))

onMounted(() => {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') {
    isDark.value = stored === 'dark'
  } else {
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  syncDom()

  const hash = window.location.hash.slice(1)
  if (SECTION_IDS.includes(hash as SectionId)) {
    activeId.value = hash as SectionId
  }

  onScroll = () => pickActiveSection()
  pickActiveSection()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('hashchange', onScroll)

  ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => updateIndicatorPosition()) : undefined
  window.addEventListener('resize', updateIndicatorPosition)

  nextTick(() => {
    updateIndicatorPosition()
    if (ro && linksWrapRef.value) ro.observe(linksWrapRef.value)
  })
})

onUnmounted(() => {
  if (onScroll) {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('hashchange', onScroll)
  }
  window.removeEventListener('resize', updateIndicatorPosition)
  ro?.disconnect()
})

watch(isDark, syncDom)

function toggleTheme() {
  isDark.value = !isDark.value
}

const links = [
  { id: 'about' as const, href: '#about', label: 'About' },
  { id: 'skills' as const, href: '#skills', label: 'Skills' },
  { id: 'experience' as const, href: '#experience', label: 'Experience' },
  { id: 'projects' as const, href: '#projects', label: 'Projects' },
  { id: 'contact' as const, href: '#contact', label: 'Contact' },
] as const
</script>

<template>
  <div class="nav-shell">
    <nav class="nav-pill" aria-label="Primary">
      <a class="nav-pill__brand" href="#top">S.</a>
      <div
        ref="linksWrapRef"
        class="nav-pill__links-wrap"
        @mouseleave="onLinksLeave"
      >
        <ul class="nav-pill__links">
          <li v-for="item in links" :key="item.href">
            <a
              class="nav-pill__link"
              :class="{ 'nav-pill__link--active': activeId === item.id }"
              :href="item.href"
              :data-nav="item.id"
              :aria-current="activeId === item.id ? 'true' : undefined"
              @mouseenter="onLinkEnter(item.id)"
              >{{ item.label }}</a>
          </li>
        </ul>
        <span
          class="nav-pill__indicator"
          :style="{
            left: indicatorStyle.left,
            width: indicatorStyle.width,
            opacity: indicatorStyle.opacity,
          }"
          aria-hidden="true"
        />
      </div>
      <button
        type="button"
        class="nav-pill__theme"
        :aria-pressed="isDark"
        :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        @click="toggleTheme"
      >
        <span class="nav-pill__theme-inner">
          <svg
            v-if="isDark"
            class="nav-pill__icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.75"
            stroke-linecap="round"
            aria-hidden="true"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
          <svg
            v-else
            class="nav-pill__icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.75"
            stroke-linecap="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          </svg>
        </span>
      </button>
    </nav>
  </div>
</template>

<style scoped>
.nav-shell {
  position: fixed;
  top: max(1.1rem, env(safe-area-inset-top));
  left: 50%;
  transform: translateX(-50%);
  width: min(calc(100% - 2 * var(--space)), 52rem);
  z-index: 100;
  padding: 0;
  pointer-events: none;
}

.nav-pill {
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: clamp(0.75rem, 3vw, 2rem);
  padding: 0.55rem clamp(1.15rem, 3.5vw, 2.85rem);
  border-radius: 999px;
  background: var(--nav-pill-bg);
  border: 1px solid var(--nav-pill-border);
  box-shadow: 0 8px 32px var(--nav-pill-shadow);
}

.nav-pill__brand {
  flex-shrink: 0;
  font-weight: 700;
  font-size: 1.05rem;
  letter-spacing: -0.02em;
  color: var(--nav-brand);
  text-decoration: none;
  line-height: 1;
}

.nav-pill__brand:hover {
  color: var(--accent);
}

.nav-pill__links-wrap {
  position: relative;
  flex: 1;
  min-width: 0;
}

.nav-pill__links {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: clamp(0.95rem, 2.4vw, 2.35rem);
  list-style: none;
  margin: 0;
  padding: 0.15rem 0 0.55rem;
  min-width: 0;
}

.nav-pill__indicator {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 2px;
  border-radius: 2px;
  background: var(--nav-active-line);
  pointer-events: none;
  transition:
    left 0.38s cubic-bezier(0.22, 1, 0.36, 1),
    width 0.38s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.2s ease;
}

.nav-pill__link {
  display: inline-block;
  padding-bottom: 0.1rem;
  font-size: clamp(0.62rem, 1.25vw, 0.78rem);
  font-weight: 500;
  letter-spacing: 0.11em;
  text-transform: uppercase;
  color: var(--nav-link);
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.2s ease;
}

.nav-pill__link:hover {
  color: var(--nav-brand);
}

.nav-pill__link--active {
  color: var(--nav-brand);
}

.nav-pill__theme {
  flex-shrink: 0;
  margin: 0;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 999px;
}

.nav-pill__theme-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 999px;
  background: color-mix(in oklab, var(--nav-toggle-bg) 70%, transparent);
  border: 1px solid var(--nav-toggle-border);
  color: var(--nav-brand);
  box-shadow:
    0 10px 26px rgba(0, 0, 0, 0.22),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.15s ease;
}

.nav-pill__theme:hover .nav-pill__theme-inner {
  border-color: var(--nav-toggle-border-hover);
  transform: translateY(-1px);
  color: var(--accent);
}

.nav-pill__theme:active .nav-pill__theme-inner {
  transform: translateY(0);
}

.nav-pill__icon {
  width: 1.05rem;
  height: 1.05rem;
}
</style>
