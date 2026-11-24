<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { PhEnvelopeSimple } from '@phosphor-icons/vue'
import { pageIds, pages, type LegalPageId } from 'virtual:legal-pages'
import { useLang, useMessages } from '@/i18n'
import { usePageSeo } from '@/lib/seo'
import { SUPPORT_EMAIL, neutralPath } from '@/lib/site'

/**
 * The terms of use, the privacy policy and the help page, rendered from the Markdown in
 * `src/content/legal`. The same content is served as standalone HTML at
 * `/legal/<lang>/<page>.html` and as Markdown, both linked at the bottom.
 */
const props = defineProps<{
  /** The help page has its own address, `/support`, instead of `/legal/<page>`. */
  support?: boolean
}>()

const route = useRoute()
const router = useRouter()
const lang = useLang()
const m = useMessages()

const id = computed<LegalPageId>(() => {
  if (props.support) return 'support'
  const param = route.params.page
  return typeof param === 'string' && (pageIds as readonly string[]).includes(param)
    ? (param as LegalPageId)
    : 'terms'
})
const page = computed(() => pages[lang.value][id.value])
const links = computed(() => pageIds.map((entry) => pages[lang.value][entry]))

// The standalone HTML is the copy search engines keep; this view points at it.
usePageSeo(() => ({
  title: page.value.title,
  description: page.value.description,
  path: neutralPath(page.value.path),
  canonical: page.value.staticPath,
  jsonLd:
    page.value.qa.length > 0
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            inLanguage: lang.value,
            mainEntity: page.value.qa.map((pair) => ({
              '@type': 'Question',
              name: pair.question,
              acceptedAnswer: { '@type': 'Answer', text: pair.answer },
            })),
          },
        ]
      : [],
}))

/** Links between pages are written as site paths: keep them inside the router. */
function onClick(event: MouseEvent): void {
  if (event.defaultPrevented || event.button !== 0) return
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
  const anchor = (event.target as HTMLElement | null)?.closest('a')
  const href = anchor?.getAttribute('href')
  if (anchor == null || href == null || !href.startsWith('/') || anchor.target === '_blank') return
  if (router.resolve(href).name === 'not-found') return
  event.preventDefault()
  void router.push(href)
}
</script>

<template>
  <div class="legal relative">
    <div class="page relative pb-20 pt-10 md:pt-14">
      <div class="mx-auto max-w-3xl">
        <nav class="-mx-5 flex gap-2 overflow-x-auto px-5 pb-6 sm:mx-0 sm:px-0" :aria-label="m.legal.otherPages">
          <RouterLink
            v-for="entry in links"
            :key="entry.id"
            :to="entry.path"
            :aria-current="entry.id === id ? 'page' : undefined"
            class="shrink-0 rounded-full border px-4 py-1.5 text-sm font-extrabold transition-colors"
            :class="
              entry.id === id
                ? 'border-sage-ink bg-sage-ink text-white'
                : 'border-line bg-card text-ink-soft hover:text-ink'
            "
          >
            {{ entry.label }}
          </RouterLink>
        </nav>

        <h1 class="text-4xl leading-[1.05] sm:text-5xl">{{ page.title }}</h1>
        <p class="mt-3 text-sm font-semibold text-ink-soft">
          {{ m.legal.updated }}
          <time :datetime="page.updatedIso">{{ page.updated }}</time>
        </p>

        <!-- eslint-disable-next-line vue/no-v-html -- our own Markdown, rendered at build time -->
        <article :key="page.id + page.lang" class="prose-legal mt-8" @click="onClick" v-html="page.html" />

        <aside
          v-if="id === 'support'"
          class="mt-12 flex flex-col items-start gap-4 rounded-3xl border border-line bg-card p-6 shadow-soft sm:flex-row sm:items-center"
        >
          <div class="flex-1">
            <h2 class="text-xl">{{ m.legal.contactTitle }}</h2>
            <p class="mt-1 text-ink-soft">{{ m.legal.contactText }}</p>
          </div>
          <a :href="`mailto:${SUPPORT_EMAIL}`" class="btn btn-ink">
            <PhEnvelopeSimple :size="20" weight="bold" aria-hidden="true" />
            {{ SUPPORT_EMAIL }}
          </a>
        </aside>

        <p class="mt-12 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-5 text-sm font-semibold text-ink-soft">
          <a :href="page.staticPath" class="underline underline-offset-4 hover:text-ink">
            {{ m.legal.plain }}
          </a>
          <a :href="page.markdownPath" class="underline underline-offset-4 hover:text-ink">
            {{ m.legal.markdown }}
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.legal {
  background: radial-gradient(60rem 30rem at 50% -8rem, rgb(124 144 130 / 0.22), transparent 70%)
    no-repeat;
}
</style>
