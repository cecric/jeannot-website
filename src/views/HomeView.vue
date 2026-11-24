<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useHead } from '@unhead/vue'
import {
  PhArrowRight,
  PhArrowUpRight,
  PhBasket,
  PhBookOpenText,
  PhCalendarDots,
  PhCamera,
  PhCaretDown,
  PhChatCircleDots,
  PhCheck,
  PhCloudSun,
  PhDesktop,
  PhEye,
  PhFlower,
  PhHeart,
  PhLeaf,
  PhMapTrifold,
  PhMoon,
  PhMoonStars,
  PhNotebook,
  PhPlant,
  PhPlus,
  PhProhibit,
  PhSparkle,
  PhUsersThree,
} from '@phosphor-icons/vue'
import { pages } from 'virtual:legal-pages/index'
import BrowserFrame from '@/components/BrowserFrame.vue'
import DeviceFrame from '@/components/DeviceFrame.vue'
import FeatureRow from '@/components/FeatureRow.vue'
import StoreButtons from '@/components/StoreButtons.vue'
import { useLang, useMessages } from '@/i18n'
import { usePageSeo } from '@/lib/seo'
import {
  WEB_APP_LABEL,
  WEB_APP_URL,
  appJsonLd,
  media,
  organizationJsonLd,
  webSiteJsonLd,
} from '@/lib/site'

const lang = useLang()
const m = useMessages()

const shot = (name: string) => media(lang.value, `${name}.webp`)
const snippet = (name: string) => media(lang.value, `snippet-${name}.webp`)
const brand = (name: string) => `/media/brand/${name}.webp`

const highlightIcons = [PhMoonStars, PhMapTrifold, PhSparkle, PhCloudSun]
const valueIcons = [PhEye, PhLeaf, PhProhibit, PhFlower]

const legal = computed(() => pages[lang.value])

// A few answers from the help page, by their place in `support.<lang>.md`: what Jeannot is,
// where it runs, whether it is free, and the web version.
const FAQ_PICKS = [0, 1, 16, 4]
const faq = computed(() =>
  FAQ_PICKS.map((index) => legal.value.support.qa[index]).filter((pair) => pair !== undefined),
)

usePageSeo(() => ({
  title: m.value.meta.title,
  description: m.value.meta.description,
  path: '/',
  jsonLd: [organizationJsonLd(), webSiteJsonLd(), appJsonLd(lang.value, m.value.meta.description)],
}))

// The first screen of the phone in the hero is the largest image above the fold.
useHead(() => ({
  link: [{ rel: 'preload', as: 'image', href: shot('today'), fetchpriority: 'high' }],
}))
</script>

<template>
  <div>
    <!-- ===================== Hero ===================== -->
    <section class="hero relative">
      <img :src="brand('moon')" alt="" aria-hidden="true" width="480" height="476" class="engraving hero-moon" />
      <img :src="brand('cabbage')" alt="" aria-hidden="true" width="560" height="560" class="engraving hero-cabbage" />

      <div class="page relative grid items-center gap-12 pb-16 pt-10 md:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pb-24">
        <div>
          <p class="eyebrow accent-sage">
            <span class="dot"><PhPlant :size="14" weight="bold" aria-hidden="true" /></span>
            {{ m.hero.eyebrow }}
          </p>
          <h1 class="mt-6 text-[2.75rem] leading-[1.02] sm:text-6xl lg:text-[4.25rem]">
            {{ m.hero.title[0] }}<em class="hl accent-sage">{{ m.hero.title[1] }}</em>
          </h1>
          <p class="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">
            {{ m.hero.lead }}
          </p>

          <StoreButtons class="mt-8" />

          <p class="mt-5 flex items-start gap-2 text-sm font-semibold text-ink-soft">
            <PhCheck :size="18" weight="bold" class="mt-px shrink-0 text-leaf-ink" aria-hidden="true" />
            {{ m.hero.note }}
          </p>
        </div>

        <div class="hero-stage">
          <span class="hero-halo" aria-hidden="true"></span>
          <img :src="brand('tomatoes')" alt="" aria-hidden="true" width="640" height="640" class="engraving hero-tomatoes" />
          <img
            :src="brand('gardener')"
            :alt="m.hero.gardenerAlt"
            width="640"
            height="646"
            class="hero-gardener"
          />
          <DeviceFrame
            class="hero-phone"
            :src="shot('today')"
            :video="media(lang, 'tour.mp4')"
            :alt="m.hero.videoLabel"
            eager
          />
          <span class="float-chip accent-sage hero-chip hero-chip-1" aria-hidden="true">
            <span class="dot"><PhMoon :size="16" weight="bold" /></span>
            {{ m.hero.chips[0] }}
          </span>
          <span class="float-chip accent-leaf hero-chip hero-chip-2" aria-hidden="true">
            <span class="dot"><PhMapTrifold :size="16" weight="bold" /></span>
            {{ m.hero.chips[1] }}
          </span>
          <span class="float-chip accent-root hero-chip hero-chip-3" aria-hidden="true">
            <span class="dot"><PhLeaf :size="16" weight="bold" /></span>
            {{ m.hero.chips[2] }}
          </span>
        </div>
      </div>
    </section>

    <!-- ===================== At a glance ===================== -->
    <section class="page relative z-10 pb-6">
      <ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <li
          v-for="(item, index) in m.highlights"
          :key="item.title"
          class="flex gap-4 rounded-3xl border border-line bg-card p-5 shadow-soft sm:block"
        >
          <span class="grid size-11 shrink-0 place-items-center rounded-2xl bg-sage-light text-sage-ink">
            <component :is="highlightIcons[index]" :size="24" weight="duotone" aria-hidden="true" />
          </span>
          <div>
            <h2 class="text-lg leading-snug sm:mt-4">{{ item.title }}</h2>
            <p class="mt-1.5 text-[0.95rem] leading-relaxed text-ink-soft">{{ item.text }}</p>
          </div>
        </li>
      </ul>
    </section>

    <!-- ===================== Features ===================== -->
    <section id="features" class="page scroll-mt-24 py-16 md:py-24">
      <div class="mx-auto max-w-3xl text-center">
        <p class="eyebrow accent-sage">
          <span class="dot"><PhSparkle :size="14" weight="bold" aria-hidden="true" /></span>
          {{ m.features.eyebrow }}
        </p>
        <h2 class="mt-5 text-4xl leading-[1.05] sm:text-5xl">{{ m.features.title }}</h2>
      </div>

      <div class="mt-16 space-y-24 md:mt-24 md:space-y-32">
        <FeatureRow
          id="garden-plan"
          :copy="m.features.plan"
          accent="leaf"
          :icon="PhMapTrifold"
          :screens="[shot('garden-map'), shot('garden-map-bed')]"
          :snippets="[]"
          :chip-icons="[PhMapTrifold, PhHeart]"
          :engraving="brand('cabbage')"
        />

        <!-- The web version, right where a large screen helps most. -->
        <div id="web" class="web scroll-mt-24">
          <img :src="brand('flowers')" alt="" aria-hidden="true" width="560" height="560" loading="lazy" class="engraving web-flowers" />
          <div class="relative grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <div>
              <p class="flex flex-wrap items-center gap-2">
                <span class="rounded-full bg-root px-3 py-1 text-xs font-extrabold uppercase tracking-[0.16em] text-white">
                  {{ m.web.badge }}
                </span>
                <span class="text-xs font-extrabold uppercase tracking-[0.16em] text-paper/70">
                  {{ m.web.eyebrow }}
                </span>
              </p>
              <h2 class="mt-5 text-3xl leading-[1.08] sm:text-4xl lg:text-[2.75rem]">
                {{ m.web.title[0] }}<em class="web-hl">{{ m.web.title[1] }}</em>
              </h2>
              <p class="mt-5 text-lg leading-relaxed text-paper/80">{{ m.web.text }}</p>
              <ul class="mt-6 space-y-3">
                <li v-for="point in m.web.points" :key="point" class="flex gap-3 font-semibold">
                  <span class="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-paper/15">
                    <PhCheck :size="14" weight="bold" aria-hidden="true" />
                  </span>
                  <span>{{ point }}</span>
                </li>
              </ul>
              <a :href="WEB_APP_URL" target="_blank" rel="noopener" class="btn btn-paper mt-8 text-lg">
                <PhDesktop :size="22" weight="bold" aria-hidden="true" />
                {{ m.web.cta }}
                <PhArrowUpRight :size="18" weight="bold" aria-hidden="true" />
              </a>
              <p class="mt-4 max-w-md text-sm leading-relaxed text-paper/60">{{ m.web.note }}</p>
            </div>
            <a :href="WEB_APP_URL" target="_blank" rel="noopener" class="web-window" :aria-label="m.web.cta">
              <BrowserFrame :src="shot('web-garden-plan')" :alt="m.web.alt" :address="WEB_APP_LABEL" />
            </a>
          </div>
        </div>

        <FeatureRow
          id="my-garden"
          :copy="m.features.garden"
          accent="sage"
          :icon="PhPlant"
          :screens="[shot('my-garden'), shot('plant-detail')]"
          :snippets="[snippet('plant-stage'), snippet('todo-task')]"
          :chip-icons="[PhLeaf, PhBasket]"
          :engraving="brand('tomatoes')"
          flip
        />

        <FeatureRow
          id="calendar"
          :copy="m.features.calendar"
          accent="flower"
          :icon="PhCalendarDots"
          :screens="[shot('calendar'), shot('today')]"
          :snippets="[]"
          :chip-icons="[PhCalendarDots, PhMoon]"
          :engraving="brand('moon')"
        />

        <FeatureRow
          id="assistant"
          :copy="m.features.assistant"
          accent="fruit"
          :icon="PhChatCircleDots"
          :screens="[shot('identify-plant'), shot('ask-jeannot')]"
          :video="media(lang, 'identify-plant.mp4')"
          :snippets="[]"
          :chip-icons="[PhCamera, PhChatCircleDots]"
          :engraving="brand('flowers')"
          flip
        />

        <FeatureRow
          id="encyclopedia"
          :copy="m.features.encyclopedia"
          accent="root"
          :icon="PhBookOpenText"
          :screens="[shot('species-detail'), shot('encyclopedia')]"
          :snippets="[snippet('species-row')]"
          :chip-icons="[PhPlus, PhCalendarDots]"
          :engraving="brand('root')"
        />

        <FeatureRow
          id="journal"
          :copy="m.features.journal"
          accent="fruit"
          :icon="PhNotebook"
          :screens="[shot('journal'), shot('guilds')]"
          :snippets="[snippet('guild-card'), snippet('journal-entry')]"
          :chip-icons="[PhUsersThree, PhBasket]"
          :engraving="brand('tomatoes')"
          flip
        />
      </div>
    </section>

    <!-- ===================== Free and Premium ===================== -->
    <section id="pricing" class="scroll-mt-24 border-y border-line bg-paper-deep py-16 md:py-24">
      <div class="page">
        <div class="mx-auto max-w-3xl text-center">
          <p class="eyebrow accent-leaf">
            <span class="dot"><PhLeaf :size="14" weight="bold" aria-hidden="true" /></span>
            {{ m.pricing.eyebrow }}
          </p>
          <h2 class="mt-5 text-4xl leading-[1.05] sm:text-5xl">{{ m.pricing.title }}</h2>
        </div>

        <div class="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2">
          <div class="rounded-3xl border border-line bg-card p-7 shadow-soft">
            <h3 class="text-2xl">{{ m.pricing.free.name }}</h3>
            <p class="mt-2 text-ink-soft">{{ m.pricing.free.text }}</p>
            <ul class="mt-6 space-y-3">
              <li v-for="item in m.pricing.free.items" :key="item" class="flex gap-3 font-semibold">
                <span class="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-sage-light text-sage-ink">
                  <PhCheck :size="14" weight="bold" aria-hidden="true" />
                </span>
                {{ item }}
              </li>
            </ul>
          </div>
          <div class="rounded-3xl bg-ink p-7 text-paper shadow-lift">
            <h3 class="flex items-center gap-2 text-2xl">
              <PhSparkle :size="24" weight="fill" class="text-root" aria-hidden="true" />
              {{ m.pricing.premium.name }}
            </h3>
            <p class="mt-2 text-paper/70">{{ m.pricing.premium.text }}</p>
            <ul class="mt-6 space-y-3">
              <li v-for="item in m.pricing.premium.items" :key="item" class="flex gap-3 font-semibold">
                <span class="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-paper/15">
                  <PhCheck :size="14" weight="bold" aria-hidden="true" />
                </span>
                {{ item }}
              </li>
            </ul>
          </div>
        </div>

        <p class="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-ink-soft">
          {{ m.pricing.note }}
          <RouterLink :to="legal.terms.path" class="font-bold text-leaf-ink underline underline-offset-2">
            {{ m.pricing.terms }}
          </RouterLink>
        </p>

        <h2 class="mt-20 text-center text-3xl sm:text-4xl">{{ m.values.title }}</h2>
        <ul class="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          <li v-for="(item, index) in m.values.items" :key="item.title" class="text-center">
            <span class="mx-auto grid size-12 place-items-center rounded-full bg-card text-sage-ink ring-1 ring-line">
              <component :is="valueIcons[index]" :size="24" weight="duotone" aria-hidden="true" />
            </span>
            <h3 class="mt-4 text-lg">{{ item.title }}</h3>
            <p class="mt-1 text-[0.95rem] leading-relaxed text-ink-soft">{{ item.text }}</p>
          </li>
        </ul>
      </div>
    </section>

    <!-- ===================== Questions ===================== -->
    <section class="page py-16 md:py-24">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="eyebrow accent-sage">
            <span class="dot"><PhChatCircleDots :size="14" weight="bold" aria-hidden="true" /></span>
            {{ m.faq.eyebrow }}
          </p>
          <h2 class="mt-5 text-4xl leading-[1.05] sm:text-5xl">{{ m.faq.title }}</h2>
        </div>

        <div class="mt-10 space-y-3">
          <details
            v-for="pair in faq"
            :key="pair.question"
            class="group rounded-2xl border border-line bg-card px-5 shadow-soft"
          >
            <summary class="flex cursor-pointer list-none items-center gap-4 py-4 text-lg font-extrabold [&::-webkit-details-marker]:hidden">
              <span class="flex-1">{{ pair.question }}</span>
              <PhCaretDown
                :size="18"
                weight="bold"
                class="shrink-0 text-ink-soft transition-transform duration-300 group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <p class="pb-5 leading-relaxed text-ink-soft">{{ pair.answer }}</p>
          </details>
        </div>

        <p class="mt-8 text-center">
          <RouterLink :to="legal.support.path" class="inline-flex items-center gap-2 font-extrabold text-leaf-ink hover:text-ink">
            {{ m.faq.more }}
            <PhArrowRight :size="18" weight="bold" aria-hidden="true" />
          </RouterLink>
        </p>
      </div>
    </section>

    <!-- ===================== Download ===================== -->
    <section id="download" class="scroll-mt-24 px-3 pb-12 md:px-5 md:pb-16">
      <div class="download">
        <img :src="brand('tomatoes')" alt="" aria-hidden="true" width="640" height="640" loading="lazy" class="download-engraving download-tomatoes" />
        <img :src="brand('root')" alt="" aria-hidden="true" width="560" height="560" loading="lazy" class="download-engraving download-root" />
        <div class="relative mx-auto flex max-w-3xl flex-col items-center text-center">
          <img :src="brand('gardener')" alt="" aria-hidden="true" width="640" height="646" loading="lazy" class="size-28 rounded-full bg-paper object-cover p-1" />
          <h2 class="mt-6 text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
            {{ m.download.title[0] }}<em class="download-hl">{{ m.download.title[1] }}</em>
          </h2>
          <p class="mt-5 text-lg text-paper/80 sm:text-xl">{{ m.download.text }}</p>
          <StoreButtons tone="dark" class="mt-9 justify-center" />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ---- Hero ---- */
.hero {
  overflow: clip;
  background:
    radial-gradient(60rem 36rem at 78% 8%, rgb(124 144 130 / 0.26), transparent 70%),
    radial-gradient(40rem 26rem at 0% 100%, rgb(214 232 212 / 0.5), transparent 70%);
}

.hero-moon {
  position: absolute;
  top: -5rem;
  right: -5rem;
  width: 22rem;
  height: auto;
  opacity: 0.14;
}

.hero-cabbage {
  position: absolute;
  left: -9rem;
  bottom: -3rem;
  width: 24rem;
  height: auto;
  opacity: 0.16;
  mask-image: linear-gradient(#000 55%, transparent 92%);
}

.hero-stage {
  position: relative;
  width: 100%;
  max-width: 34rem;
  aspect-ratio: 1 / 1.08;
  margin-inline: auto;
}

.hero-halo {
  position: absolute;
  inset: 8% 0 6%;
  border-radius: 50%;
  background: radial-gradient(closest-side, rgb(255 253 247 / 0.95), transparent);
}

.hero-tomatoes {
  position: absolute;
  right: -14%;
  bottom: -2%;
  width: 62%;
  height: auto;
  opacity: 0.3;
}

.hero-gardener {
  position: absolute;
  left: -3%;
  bottom: 3%;
  width: 50%;
  height: auto;
}

.hero-phone {
  position: absolute;
  right: 10%;
  top: 0;
  width: 46%;
  transform: rotate(4deg);
}

.hero-chip {
  position: absolute;
  animation: sway 7s ease-in-out infinite;
}
.hero-chip-1 {
  left: 2%;
  top: 14%;
  --tilt: -5deg;
}
.hero-chip-2 {
  right: 0;
  top: 42%;
  --tilt: 4deg;
  animation-delay: -2.5s;
}
.hero-chip-3 {
  right: 4%;
  bottom: 9%;
  --tilt: -3deg;
  animation-delay: -4.5s;
}

@keyframes sway {
  0%,
  100% {
    transform: rotate(var(--tilt)) translateY(0);
  }
  50% {
    transform: rotate(calc(var(--tilt) + 1.5deg)) translateY(-6px);
  }
}

@media (max-width: 48rem) {
  .hero-moon {
    width: 16rem;
    opacity: 0.08;
  }
}

@media (max-width: 30rem) {
  .hero-chip {
    font-size: 0.8rem;
    padding: 0.3rem 0.7rem 0.3rem 0.3rem;
  }
  .hero-chip > .dot {
    width: 1.5rem;
    height: 1.5rem;
  }
}

/* ---- Web version ---- */
.web {
  position: relative;
  overflow: hidden;
  border-radius: 2.25rem;
  padding: 2.25rem 1.5rem;
  color: var(--color-paper);
  background:
    radial-gradient(40rem 26rem at 100% 0%, rgb(124 144 130 / 0.5), transparent 70%),
    var(--color-ink);
  box-shadow: var(--shadow-lift);
}
@media (min-width: 48rem) {
  .web {
    padding: 3.5rem;
  }
}

.web-flowers {
  position: absolute;
  left: -5rem;
  bottom: -7rem;
  width: 22rem;
  height: auto;
  opacity: 0.12;
  filter: invert(1) sepia(0.3);
}

.web-hl,
.download-hl {
  font-style: normal;
  color: #dfe9d6;
  background-image: linear-gradient(transparent 58%, rgb(124 144 130 / 0.55) 58%, rgb(124 144 130 / 0.55) 94%, transparent 94%);
  padding-inline: 0.12em;
  margin-inline: -0.12em;
  border-radius: 0.2em;
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
}

.web-window {
  display: block;
  transition: transform 0.5s var(--ease-fluid);
}
.web-window:hover {
  transform: translateY(-4px) rotate(-0.4deg);
}
@media (min-width: 64rem) {
  .web-window {
    margin-right: -7rem;
  }
}

/* ---- Download ---- */
.download {
  position: relative;
  overflow: hidden;
  border-radius: 2.25rem;
  padding: 4rem 1.5rem;
  color: var(--color-paper);
  background:
    radial-gradient(46rem 28rem at 50% 0%, rgb(220 228 220 / 0.3), transparent 70%),
    var(--color-sage-ink);
  box-shadow: var(--shadow-lift);
}
@media (min-width: 48rem) {
  .download {
    padding: 6rem 2rem;
  }
}

.download-engraving {
  position: absolute;
  height: auto;
  opacity: 0.13;
  filter: invert(1) sepia(0.3);
  pointer-events: none;
}
.download-tomatoes {
  right: -5rem;
  bottom: -5rem;
  width: 24rem;
}
.download-root {
  left: -5rem;
  top: -4rem;
  width: 20rem;
}
</style>
