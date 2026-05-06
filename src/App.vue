<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { site } from './data/site'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import IntroSection from './components/IntroSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import ContactSection from './components/ContactSection.vue'

const isLoading = ref(true)

onMounted(() => {
  document.documentElement.classList.add('portfolio-v6')

  const done = () => {
    window.setTimeout(() => {
      isLoading.value = false
    }, 650)
  }

  if (document.readyState === 'complete') done()
  else window.addEventListener('load', done, { once: true })

  const nodes = document.querySelectorAll<HTMLElement>('.reveal')
  const io = new IntersectionObserver(
    (entries) => {
      for (const en of entries) {
        if (en.isIntersecting) {
          en.target.classList.add('reveal--in')
          io.unobserve(en.target)
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.06 },
  )
  nodes.forEach((el) => io.observe(el))

  const tiltEls = document.querySelectorAll<HTMLElement>('.tiltCard')
  const rafMap = new WeakMap<HTMLElement, number>()

  const setFromEvent = (el: HTMLElement, e: PointerEvent) => {
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / Math.max(1, r.width)
    const py = (e.clientY - r.top) / Math.max(1, r.height)
    const x = (px - 0.5) * 2
    const y = (py - 0.5) * 2
    el.style.setProperty('--px', String(px))
    el.style.setProperty('--py', String(py))
    el.style.setProperty('--mx', x.toFixed(4))
    el.style.setProperty('--my', y.toFixed(4))
  }

  tiltEls.forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const prev = rafMap.get(el)
      if (prev) cancelAnimationFrame(prev)
      const raf = requestAnimationFrame(() => setFromEvent(el, e))
      rafMap.set(el, raf)
    })
    el.addEventListener('pointerleave', () => {
      const prev = rafMap.get(el)
      if (prev) cancelAnimationFrame(prev)
      rafMap.delete(el)
      el.style.removeProperty('--px')
      el.style.removeProperty('--py')
      el.style.removeProperty('--mx')
      el.style.removeProperty('--my')
    })
  })
})

onUnmounted(() => {
  document.documentElement.classList.remove('portfolio-v6')
})
</script>

<template>
  <div class="page">
    <div
      v-if="isLoading"
      class="preloader"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div class="preloader__stage">
        <div class="preloader__orb" aria-hidden="true" />
        <div class="preloader__hi" aria-hidden="true">Hi<span class="preloader__hiDots">..</span></div>
        <div class="preloader__bar" aria-hidden="true">
          <div class="preloader__barFill" />
        </div>
        <div class="preloader__label">100% loaded</div>
      </div>
    </div>
    <NavBar />
    <HeroSection :site="site" />
    <main>
      <IntroSection :site="site" />
      <SkillsSection :site="site" />
      <ExperienceSection :site="site" />
      <ProjectsSection :site="site" />
      <ContactSection :site="site" />
    </main>
  </div>
</template>
