/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Public origin for canonical URLs and the sitemap. Defaults to the one in publisher.json. */
  readonly VITE_SITE_URL?: string
  /** `true` on preview builds: every page says `noindex` and robots.txt bars all. */
  readonly VITE_NOINDEX?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

/** Rendered by `scripts/legal-pages.ts` from the Markdown in `src/content/legal`. */
declare module 'virtual:legal-pages' {
  type Lang = import('@/lib/site').Lang
  export type LegalPageId = 'terms' | 'privacy' | 'support'
  export interface LegalPage {
    id: LegalPageId
    lang: Lang
    /** The page's `# Title`, kept out of `html`. */
    title: string
    /** A short name for menus and footers. */
    label: string
    /** The first paragraph, cut to a result snippet, for `<meta name="description">`. */
    description: string
    /** The date the page last changed, written out in its language, and as `YYYY-MM-DD`. */
    updated: string
    updatedIso: string
    /** The body as HTML. Links between pages already point at the Vue views. */
    html: string
    /** Question and answer pairs of the help page; empty for the others. */
    qa: { question: string; answer: string }[]
    /** Where the Vue view of the page lives, `/fr/legal/terms`. */
    path: string
    /** The standalone HTML copy, `/legal/fr/terms.html`, and its Markdown twin. */
    staticPath: string
    markdownPath: string
  }
  export const langs: readonly Lang[]
  export const pageIds: readonly LegalPageId[]
  export const pages: Record<Lang, Record<LegalPageId, LegalPage>>
}

/** The same without the HTML: titles, addresses, questions and answers. */
declare module 'virtual:legal-pages/index' {
  type Lang = import('@/lib/site').Lang
  type LegalPageId = import('virtual:legal-pages').LegalPageId
  export type LegalPageSummary = Omit<import('virtual:legal-pages').LegalPage, 'html'>
  export const langs: readonly Lang[]
  export const pageIds: readonly LegalPageId[]
  export const pages: Record<Lang, Record<LegalPageId, LegalPageSummary>>
}
