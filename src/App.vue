<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import { PhAppleLogo, PhDesktop, PhEnvelopeSimple, PhGooglePlayLogo, PhList, PhX } from '@phosphor-icons/vue'
import { pages } from 'virtual:legal-pages/index'
import { useLang, useMessages } from '@/i18n'
import { rememberLang } from '@/lib/locale'
import {
  APP_STORE_ID,
  APP_STORE_URL,
  COMPANY,
  COMPANY_URL,
  LANGS,
  SITE_NAME,
  SUPPORT_EMAIL,
  WEB_APP_LABEL,
  WEB_APP_URL,
  localizedPath,
  playStoreUrl,
} from '@/lib/site'

const route = useRoute()
const lang = useLang()
const m = useMessages()
const menuOpen = ref(false)

const home = computed(() => localizedPath('/', lang.value))
const legal = computed(() => pages[lang.value])
const year = new Date().getFullYear()

const sections = computed(() => [
  { hash: '#features', label: m.value.nav.features },
  { hash: '#web', label: m.value.nav.web },
  { hash: '#pricing', label: m.value.nav.pricing },
])

// The same page in the other languages, for the language switch.
const languages = computed(() =>
  LANGS.map((code) => ({
    code,
    current: code === lang.value,
    to: { path: localizedPath(route.path, code), hash: route.hash },
  })),
)

watch(
  () => route.fullPath,
  () => (menuOpen.value = false),
)

useHead({
  // Views give their own title; the name of the site follows unless the title already has it.
  titleTemplate: (title) =>
    title === undefined || title === '' || title.includes(SITE_NAME)
      ? (title ?? SITE_NAME)
      : `${title} · ${SITE_NAME}`,
  meta: [
    // Safari on iPhone and iPad offers the app at the top of the page.
    { name: 'apple-itunes-app', content: `app-id=${APP_STORE_ID}` },
  ],
})
</script>

<template>
  <div class="flex min-h-screen flex-col bg-paper font-sans text-ink">
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
    >
      {{ m.nav.skip }}
    </a>

    <header class="sticky top-0 z-40 border-b border-line/70 bg-paper/85 backdrop-blur-md">
      <div class="page flex items-center gap-4 py-3">
        <RouterLink :to="home" class="group flex items-center gap-2.5" :aria-label="m.nav.home">
          <img
            src="/media/brand/icon.webp"
            alt=""
            width="40"
            height="40"
            class="size-10 transition-transform duration-300 ease-fluid group-hover:-rotate-6"
          />
          <span class="text-2xl font-extrabold tracking-tight">{{ SITE_NAME }}</span>
        </RouterLink>

        <nav class="ml-6 hidden items-center gap-6 lg:flex" :aria-label="m.nav.main">
          <RouterLink
            v-for="section in sections"
            :key="section.hash"
            :to="{ path: home, hash: section.hash }"
            class="text-[0.95rem] font-bold text-ink-soft transition-colors hover:text-ink"
          >
            {{ section.label }}
          </RouterLink>
          <RouterLink
            :to="legal.support.path"
            class="text-[0.95rem] font-bold text-ink-soft transition-colors hover:text-ink"
          >
            {{ m.nav.help }}
          </RouterLink>
        </nav>

        <div class="ml-auto flex items-center gap-2 sm:gap-3">
          <div
            class="flex items-center rounded-full border border-line bg-card p-0.5 text-xs font-extrabold"
            role="group"
            :aria-label="m.nav.language"
          >
            <RouterLink
              v-for="language in languages"
              :key="language.code"
              :to="language.to"
              :hreflang="language.code"
              :lang="language.code"
              :aria-current="language.current ? 'true' : undefined"
              class="rounded-full px-2.5 py-1 uppercase transition-colors"
              :class="language.current ? 'bg-ink text-paper' : 'text-ink-soft hover:text-ink'"
              @click="rememberLang(language.code)"
            >
              {{ language.code }}
            </RouterLink>
          </div>

          <a
            :href="WEB_APP_URL"
            target="_blank"
            rel="noopener"
            class="btn btn-outline btn-sm hidden md:inline-flex"
          >
            <PhDesktop :size="18" weight="bold" aria-hidden="true" />
            {{ m.nav.openWeb }}
          </a>
          <RouterLink :to="{ path: home, hash: '#download' }" class="btn btn-ink btn-sm hidden sm:inline-flex">
            {{ m.nav.getApp }}
          </RouterLink>

          <button
            type="button"
            class="grid size-10 place-items-center rounded-full border border-line bg-card lg:hidden"
            :aria-label="menuOpen ? m.nav.close : m.nav.menu"
            :aria-expanded="menuOpen"
            aria-controls="mobile-menu"
            @click="menuOpen = !menuOpen"
          >
            <PhX v-if="menuOpen" :size="20" weight="bold" aria-hidden="true" />
            <PhList v-else :size="20" weight="bold" aria-hidden="true" />
          </button>
        </div>
      </div>

      <nav
        v-show="menuOpen"
        id="mobile-menu"
        class="border-t border-line bg-paper lg:hidden"
        :aria-label="m.nav.main"
      >
        <div class="page flex flex-col py-3">
          <RouterLink
            v-for="section in sections"
            :key="section.hash"
            :to="{ path: home, hash: section.hash }"
            class="py-2.5 text-lg font-bold"
          >
            {{ section.label }}
          </RouterLink>
          <RouterLink :to="legal.support.path" class="py-2.5 text-lg font-bold">
            {{ m.nav.help }}
          </RouterLink>
          <div class="mt-3 flex flex-col gap-2 pb-2">
            <a :href="WEB_APP_URL" target="_blank" rel="noopener" class="btn btn-outline">
              <PhDesktop :size="20" weight="bold" aria-hidden="true" />
              {{ m.nav.openWeb }}
            </a>
            <RouterLink :to="{ path: home, hash: '#download' }" class="btn btn-ink">
              {{ m.nav.getApp }}
            </RouterLink>
          </div>
        </div>
      </nav>
    </header>

    <main id="main" class="flex-1 overflow-x-clip">
      <RouterView />
    </main>

    <footer class="bg-ink text-paper">
      <div class="page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
        <div>
          <RouterLink :to="home" class="flex items-center gap-2.5" :aria-label="m.nav.home">
            <span class="grid size-11 place-items-center rounded-2xl bg-paper">
              <img src="/media/brand/icon.webp" alt="" width="36" height="36" loading="lazy" class="size-9" />
            </span>
            <span class="text-2xl font-extrabold tracking-tight">{{ SITE_NAME }}</span>
          </RouterLink>
          <p class="mt-4 max-w-sm text-[0.95rem] leading-relaxed text-paper/70">
            {{ m.footer.tagline }}
          </p>
        </div>

        <div>
          <h2 class="text-sm font-extrabold uppercase tracking-[0.16em] text-paper/60">
            {{ m.footer.product }}
          </h2>
          <ul class="mt-4 space-y-2.5 font-semibold">
            <li v-for="section in sections" :key="section.hash">
              <RouterLink :to="{ path: home, hash: section.hash }" class="footer-link">
                {{ section.label }}
              </RouterLink>
            </li>
            <li>
              <RouterLink :to="legal.support.path" class="footer-link">{{ legal.support.label }}</RouterLink>
            </li>
          </ul>
        </div>

        <div>
          <h2 class="text-sm font-extrabold uppercase tracking-[0.16em] text-paper/60">
            {{ m.footer.legal }}
          </h2>
          <ul class="mt-4 space-y-2.5 font-semibold">
            <li>
              <RouterLink :to="legal.terms.path" class="footer-link">{{ legal.terms.label }}</RouterLink>
            </li>
            <li>
              <RouterLink :to="legal.privacy.path" class="footer-link">{{ legal.privacy.label }}</RouterLink>
            </li>
            <li>
              <a :href="`mailto:${SUPPORT_EMAIL}`" class="footer-link inline-flex items-center gap-2">
                <PhEnvelopeSimple :size="18" aria-hidden="true" />
                {{ SUPPORT_EMAIL }}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 class="text-sm font-extrabold uppercase tracking-[0.16em] text-paper/60">
            {{ m.footer.getApp }}
          </h2>
          <ul class="mt-4 space-y-2.5 font-semibold">
            <li>
              <a :href="WEB_APP_URL" target="_blank" rel="noopener" class="footer-link inline-flex items-center gap-2">
                <PhDesktop :size="18" aria-hidden="true" />
                {{ m.nav.web }} · {{ WEB_APP_LABEL }}
              </a>
            </li>
            <li>
              <a :href="APP_STORE_URL" target="_blank" rel="noopener" class="footer-link inline-flex items-center gap-2">
                <PhAppleLogo :size="18" weight="fill" aria-hidden="true" />
                {{ m.cta.appStore }}
              </a>
            </li>
            <li>
              <a :href="playStoreUrl(lang)" target="_blank" rel="noopener" class="footer-link inline-flex items-center gap-2">
                <PhGooglePlayLogo :size="18" weight="fill" aria-hidden="true" />
                {{ m.cta.play }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-paper/15">
        <div class="page flex flex-col gap-2 py-6 text-sm text-paper/60 md:flex-row md:justify-between">
          <p>
            © {{ year }} {{ SITE_NAME }}. {{ m.footer.publishedBy }}
            <a :href="COMPANY_URL" target="_blank" rel="noopener" class="footer-link underline underline-offset-2">{{ COMPANY }}</a>.
            {{ m.footer.rights }}
          </p>
          <p>{{ m.footer.madeWith }}</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.footer-link {
  color: rgb(248 244 232 / 0.82);
  transition: color 0.2s;
}
.footer-link:hover {
  color: #fff;
}
</style>
