<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { PhArrowRight } from '@phosphor-icons/vue'
import { useLang, useMessages } from '@/i18n'
import { usePageSeo } from '@/lib/seo'
import { localizedPath } from '@/lib/site'

/** Shown for any address the site does not know, and kept out of search results. */
const lang = useLang()
const m = useMessages()

usePageSeo(() => ({
  title: m.value.notFound.title,
  description: m.value.notFound.text,
  path: '/',
  noindex: true,
}))
</script>

<template>
  <div class="page flex flex-col items-center py-20 text-center md:py-28">
    <img
      src="/media/brand/root.webp"
      alt=""
      aria-hidden="true"
      width="560"
      height="560"
      class="engraving w-56 opacity-60"
    />
    <h1 class="mt-6 text-4xl sm:text-5xl">{{ m.notFound.title }}</h1>
    <p class="mt-4 text-lg text-ink-soft">{{ m.notFound.text }}</p>
    <RouterLink :to="localizedPath('/', lang)" class="btn btn-ink mt-8">
      {{ m.notFound.back }}
      <PhArrowRight :size="18" weight="bold" aria-hidden="true" />
    </RouterLink>
  </div>
</template>
