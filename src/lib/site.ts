import publisher from '@/content/legal/publisher.json'

/**
 * Where the site lives and how its public URLs are shaped, for links, canonical URLs, hreflang
 * alternates and structured data. The English pages carry no prefix (`/support`); French does
 * (`/fr/support`). Company details and store addresses come from `publisher.json`, which the
 * legal pages share.
 */
export const LANGS = ['en', 'fr'] as const
export type Lang = (typeof LANGS)[number]
export const DEFAULT_LANG: Lang = 'en'

export const SITE_NAME = publisher.brand
export const SITE_URL = (import.meta.env.VITE_SITE_URL ?? publisher.siteUrl).replace(/\/+$/, '')
/** Set on preview builds so search engines never pick them over production. */
export const NOINDEX_BUILD = import.meta.env.VITE_NOINDEX === 'true'

export const WEB_APP_URL = publisher.webAppUrl
export const WEB_APP_LABEL = publisher.webAppLabel
export const APP_STORE_URL = publisher.appStoreUrl
export const APP_STORE_ID = publisher.appStoreId
export const PLAY_STORE_URL = publisher.playStoreUrl
export const CONTACT_EMAIL = publisher.email
export const SUPPORT_EMAIL = publisher.supportEmail
export const COMPANY = `${publisher.company} ${publisher.legalForm}`
export const COMPANY_URL = publisher.companyUrl

export const OG_LOCALES: Record<Lang, string> = { en: 'en_US', fr: 'fr_FR' }
export const LANGUAGE_NAMES: Record<Lang, string> = { en: 'English', fr: 'Français' }

export function isLang(value: unknown): value is Lang {
  return typeof value === 'string' && (LANGS as readonly string[]).includes(value)
}

/** The route path prefix every public page sits under: `/fr/support`, or `/support` in English. */
export const LOCALE_PREFIX = `/:locale(${LANGS.filter((lang) => lang !== DEFAULT_LANG).join('|')})?`

const PREFIX_RE = new RegExp(`^/(${LANGS.filter((lang) => lang !== DEFAULT_LANG).join('|')})(?=/|$)`)

/** `/fr/support` and `/support` both give `/support`. */
export function neutralPath(path: string): string {
  const stripped = path.replace(PREFIX_RE, '')
  return stripped === '' ? '/' : stripped
}

/** `/support` in French is `/fr/support`; English carries no prefix. */
export function localizedPath(path: string, lang: Lang): string {
  const neutral = neutralPath(path)
  if (lang === DEFAULT_LANG) return neutral
  return neutral === '/' ? `/${lang}` : `/${lang}${neutral}`
}

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

/** The screenshots, videos and share card of a language, copied from the app by `npm run media`. */
export function media(lang: Lang, file: string): string {
  return `/media/${lang}/${file}`
}

/** The store page in the visitor's language. */
export function playStoreUrl(lang: Lang): string {
  return `${PLAY_STORE_URL}&hl=${lang}`
}

function postalAddress(address: string): Record<string, string> {
  const match = /^(.+),\s*(\d{5})\s+(.+),\s*(.+)$/.exec(address)
  if (match === null) return { '@type': 'PostalAddress', streetAddress: address }
  const [, streetAddress, postalCode, addressLocality, addressCountry] = match as unknown as [
    string,
    string,
    string,
    string,
    string,
  ]
  return { '@type': 'PostalAddress', streetAddress, postalCode, addressLocality, addressCountry }
}

/** The publisher, for the home page's structured data. */
export function organizationJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: publisher.company,
    legalName: COMPANY,
    url: COMPANY_URL,
    logo: absoluteUrl('/android-icon-192x192.png'),
    email: publisher.email,
    address: postalAddress(publisher.address),
    vatID: publisher.vat,
    brand: { '@type': 'Brand', name: SITE_NAME },
  }
}

export function webSiteJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: [...LANGS],
    publisher: { '@type': 'Organization', name: publisher.company },
  }
}

/** The app itself, on its three platforms. No rating: we publish none we cannot source. */
export function appJsonLd(lang: Lang, description: string): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: SITE_NAME,
    description,
    url: absoluteUrl(localizedPath('/', lang)),
    image: absoluteUrl(media(lang, 'og-image.jpg')),
    screenshot: ['today', 'garden-map', 'calendar', 'ask-jeannot'].map((name) =>
      absoluteUrl(media(lang, `${name}.webp`)),
    ),
    applicationCategory: 'LifestyleApplication',
    applicationSubCategory: 'Gardening',
    operatingSystem: 'iOS, iPadOS, Android, Web',
    inLanguage: [...LANGS],
    installUrl: [APP_STORE_URL, PLAY_STORE_URL],
    sameAs: [APP_STORE_URL, PLAY_STORE_URL, WEB_APP_URL],
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
      category: 'free with in-app purchases',
    },
    author: { '@type': 'Organization', name: publisher.company, url: COMPANY_URL },
  }
}
