import { toValue, type MaybeRefOrGetter } from 'vue'
import { useHead } from '@unhead/vue'
import { useLang } from '@/i18n'
import {
  absoluteUrl,
  localizedPath,
  media,
  DEFAULT_LANG,
  LANGS,
  NOINDEX_BUILD,
  OG_LOCALES,
  SITE_NAME,
} from '@/lib/site'

export interface PageSeo {
  /** The page's own title; `App.vue` appends ` · Jeannot` when the name is not in it. */
  title: string
  /** One or two sentences for the result snippet and the share card, 160 characters or so. */
  description: string
  /** The language-neutral path, `/support`: canonical and hreflang alternates derive from it. */
  path: string
  /**
   * A site path to prefer over this page. Set on the legal pages, whose standalone HTML is the
   * copy search engines should keep; alternates are then left to that copy.
   */
  canonical?: string
  /** Keep the page out of search results; preview builds set this for every page. */
  noindex?: boolean
  /** Schema.org objects, one `<script type="application/ld+json">` each. */
  jsonLd?: Record<string, unknown>[]
}

/**
 * Title, description, canonical, hreflang alternates, Open Graph and Twitter cards for a page,
 * in the current language. Every view calls it; the prerender writes the result into the HTML.
 */
export function usePageSeo(input: MaybeRefOrGetter<PageSeo>): void {
  const current = useLang()

  useHead(() => {
    const seo = toValue(input)
    const lang = current.value
    const canonical = absoluteUrl(seo.canonical ?? localizedPath(seo.path, lang))
    const noindex = seo.noindex === true || NOINDEX_BUILD
    const image = absoluteUrl(media(lang, 'og-image.jpg'))
    const alternates =
      seo.canonical === undefined && !noindex
        ? [
            ...LANGS.map((other) => ({
              rel: 'alternate' as const,
              hreflang: other,
              href: absoluteUrl(localizedPath(seo.path, other)),
            })),
            {
              rel: 'alternate' as const,
              hreflang: 'x-default',
              href: absoluteUrl(localizedPath(seo.path, DEFAULT_LANG)),
            },
          ]
        : []

    return {
      title: seo.title,
      htmlAttrs: { lang },
      link: [{ rel: 'canonical' as const, href: canonical }, ...alternates],
      meta: [
        { name: 'description', content: seo.description },
        { name: 'robots', content: noindex ? 'noindex, nofollow' : 'index, follow' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: SITE_NAME },
        { property: 'og:locale', content: OG_LOCALES[lang] },
        ...LANGS.filter((other) => other !== lang).map((other) => ({
          property: 'og:locale:alternate',
          content: OG_LOCALES[other],
        })),
        { property: 'og:title', content: seo.title },
        { property: 'og:description', content: seo.description },
        { property: 'og:url', content: canonical },
        { property: 'og:image', content: image },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: seo.title },
        { name: 'twitter:description', content: seo.description },
        { name: 'twitter:image', content: image },
      ],
      script: (seo.jsonLd ?? []).map((data, index) => ({
        key: `ld-${index}`,
        type: 'application/ld+json',
        innerHTML: JSON.stringify(data),
      })),
    }
  })
}
