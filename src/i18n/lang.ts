/** A heading in two parts: plain text, then the words drawn with the highlighter. */
export type Marked = [plain: string, highlighted: string]

export interface FeatureCopy {
  eyebrow: string
  title: Marked
  text: string
  points: string[]
  /** The small labels floating next to the screens. */
  chips: string[]
  /** What each screen shows, for screen readers and image search. */
  alts: [string, string]
}

export interface Messages {
  meta: { title: string; description: string }
  nav: {
    features: string
    web: string
    pricing: string
    help: string
    openWeb: string
    getApp: string
    menu: string
    close: string
    language: string
    home: string
    main: string
    skip: string
  }
  cta: {
    appStoreSmall: string
    appStore: string
    playSmall: string
    play: string
    webSmall: string
    openWeb: string
  }
  hero: {
    eyebrow: string
    title: Marked
    lead: string
    note: string
    chips: [string, string, string]
    videoLabel: string
    gardenerAlt: string
  }
  highlights: { title: string; text: string }[]
  features: {
    eyebrow: string
    title: string
    plan: FeatureCopy
    garden: FeatureCopy
    calendar: FeatureCopy
    assistant: FeatureCopy
    encyclopedia: FeatureCopy
    journal: FeatureCopy
  }
  web: {
    badge: string
    eyebrow: string
    title: Marked
    text: string
    points: string[]
    cta: string
    note: string
    alt: string
  }
  pricing: {
    eyebrow: string
    title: string
    free: { name: string; text: string; items: string[] }
    premium: { name: string; text: string; items: string[] }
    note: string
    terms: string
  }
  values: { title: string; items: { title: string; text: string }[] }
  faq: { eyebrow: string; title: string; more: string }
  download: { title: Marked; text: string }
  footer: {
    tagline: string
    product: string
    legal: string
    getApp: string
    contact: string
    rights: string
    madeWith: string
    publishedBy: string
  }
  legal: {
    updated: string
    plain: string
    markdown: string
    otherPages: string
    contactTitle: string
    contactText: string
  }
  notFound: { title: string; text: string; back: string }
}
