import { readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { Marked, type Tokens } from 'marked'
import type { Plugin, ViteDevServer } from 'vite'

/**
 * The help and legal pages (terms of use, privacy policy, help) are written once, as Markdown
 * in `src/content/legal/<page>.<lang>.md`, and served three ways:
 *
 * - `virtual:legal-pages` gives the site the rendered HTML of every page in every language, for
 *   the Vue view at `/legal/<page>` (and `/support`), which the build then prerenders;
 *   `virtual:legal-pages/index` is the same without the HTML, for menus and the home page.
 * - `/legal/<lang>/<page>.html` is a standalone HTML page with its own styles and no JavaScript,
 *   for the app stores, the links inside the apps, emails and anyone who wants the plain text.
 *   `/legal/<lang>/` lists the pages and `/legal/` picks a language. The dev server renders them
 *   on request; the build writes them into `dist/`. `aliases` in `meta.json` keeps the English
 *   copy at short or historical addresses (`/privacy-policies.html`, `/terms-of-use.html`).
 * - `/legal/<lang>/<page>.html.md` is the same page as clean Markdown, for whoever needs to paste
 *   it elsewhere and for agents following `/llms.txt` (see `scripts/sitemap.ts`).
 *
 * `{{key}}` in the Markdown is filled from `publisher.json` (company, addresses, emails…). The
 * date of each page comes from `updated` in `meta.json` and is written out in the page's
 * language. Links between pages are written as `/legal/<page>` and rewritten for each copy.
 *
 * The standalone files are the copy search engines keep: each carries a description, a
 * canonical link, hreflang alternates and Open Graph tags, and the help page adds `FAQPage`
 * structured data. The Vue view points its canonical link at them.
 */

export interface LegalPagesOptions {
  /** Directory holding the Markdown pages, `meta.json` and `publisher.json`. */
  dir: string
}

interface Meta {
  langs: string[]
  pages: string[]
  /** The date each page last changed, `YYYY-MM-DD`, by page id. */
  updated: Record<string, string>
  /** Extra addresses for the English standalone copy of a page: file name to page id. */
  aliases?: Record<string, string>
  labels: Record<string, Record<string, string>>
  ui: Record<string, UiStrings>
}

interface UiStrings {
  index: string
  indexIntro: string
  pages: string
  backToSite: string
  updated: string
  languages: string
  chooseLanguage: string
  tagline: string
  rights: string
}

interface Page {
  id: string
  lang: string
  title: string
  label: string
  /** The first paragraph, cut to a result snippet. */
  description: string
  /** The policy date written out in the page's language, and as `YYYY-MM-DD`. */
  updated: string
  updatedIso: string
  /** The body as HTML, links between pages still written `/legal/<id>`. */
  html: string
  /** The page as Markdown, placeholders filled and links made absolute, for `<page>.html.md`. */
  markdown: string
  /** Question and answer pairs, when the page is written as `###` questions (the help page). */
  qa: QuestionAnswer[]
}

interface QuestionAnswer {
  question: string
  answer: string
}

export interface Site {
  meta: Meta
  publisher: Record<string, string>
  pages: Record<string, Record<string, Page>>
  /** The public origin, without a trailing slash. */
  siteUrl: string
  /** Preview builds: every page says `noindex` and robots.txt bars all. */
  noindex: boolean
}

const VIRTUAL_ID = 'virtual:legal-pages'
const RESOLVED_ID = `\0${VIRTUAL_ID}`
/** The same without the HTML of the pages, for the layout and the home page. */
const INDEX_ID = 'virtual:legal-pages/index'
const RESOLVED_INDEX_ID = `\0${INDEX_ID}`
const URL_PREFIX = '/legal/'
const DEFAULT_LANG = 'en'
const LANGUAGE_NAMES: Record<string, string> = { en: 'English', fr: 'Français' }
const OG_LOCALES: Record<string, string> = { en: 'en_US', fr: 'fr_FR' }
const DESCRIPTION_LENGTH = 160
/** The pages written as questions and answers. */
const FAQ_PAGES = new Set(['support'])

function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

const markdown = new Marked({
  gfm: true,
  renderer: {
    heading({ tokens, depth }: Tokens.Heading): string {
      const text = this.parser.parseInline(tokens)
      const id = slugify(text.replace(/<[^>]+>/g, ''))
      return `<h${depth} id="${id}">${text}</h${depth}>\n`
    },
  },
})

/** The visible text of an HTML fragment, whitespace folded. */
function plainText(html: string): string {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
}

/** The first paragraph, cut at a word to fit a search result snippet. */
function describe(html: string): string {
  const match = /<p>([\s\S]*?)<\/p>/.exec(html)
  const text = plainText(match?.[1] ?? '')
  if (text.length <= DESCRIPTION_LENGTH) return text
  const cut = text.slice(0, DESCRIPTION_LENGTH - 1)
  return `${cut.slice(0, Math.max(cut.lastIndexOf(' '), 1))}…`
}

/** `###` headings as questions, what follows each as its answer, for FAQ structured data. */
function questionsAndAnswers(body: string): QuestionAnswer[] {
  const pairs: QuestionAnswer[] = []
  let question: string | null = null
  let answer: Tokens.Generic[] = []
  const close = (): void => {
    if (question === null) return
    const text = plainText(markdown.parser(answer as Parameters<typeof markdown.parser>[0]))
    if (text.length > 0) pairs.push({ question, answer: text })
    question = null
    answer = []
  }
  for (const token of markdown.lexer(body)) {
    if (token.type === 'heading') {
      close()
      if (token.depth === 3) question = plainText(markdown.parser([token]))
      continue
    }
    if (question !== null) answer.push(token)
  }
  close()
  return pairs
}

function fill(source: string, values: Record<string, string>, file: string): string {
  return source.replace(/\{\{\s*([a-zA-Z]+)\s*\}\}/g, (_match, key: string) => {
    const value = values[key]
    if (value === undefined) throw new Error(`${file}: no value for {{${key}}} in publisher.json`)
    return value
  })
}

function formatDate(iso: string, lang: string): string {
  return new Intl.DateTimeFormat(lang, { dateStyle: 'long', timeZone: 'UTC' }).format(
    new Date(`${iso}T00:00:00Z`),
  )
}

/** The standalone file of a page; `id` null is the list of pages in that language. */
export function pageHref(lang: string, id: string | null): string {
  return id === null ? `${URL_PREFIX}${lang}/` : `${URL_PREFIX}${lang}/${id}.html`
}

/** The Markdown copy of a page: the page's URL with `.md` appended, as llms.txt recommends. */
export function markdownHref(lang: string, id: string): string {
  return `${pageHref(lang, id)}.md`
}

/** Where the Vue view of a page lives: `/legal/terms`, `/fr/legal/terms`, `/support`. */
export function appPath(lang: string, id: string): string {
  const path = id === 'support' ? '/support' : `/legal/${id}`
  return lang === DEFAULT_LANG ? path : `/${lang}${path}`
}

/** Rewrites the `/legal/<id>` links between pages with the address each copy needs. */
function relink(
  text: string,
  pattern: RegExp,
  meta: Meta,
  to: (id: string) => string,
): string {
  return text.replace(pattern, (match, target: string) =>
    meta.pages.includes(target) ? to(target) : match,
  )
}

/**
 * The page as plain Markdown: the title, the policy date, then the source with links to the
 * other pages made absolute and pointed at their own Markdown copies.
 */
function markdownCopy(
  siteUrl: string,
  meta: Meta,
  lang: string,
  title: string,
  body: string,
  updated: string,
): string {
  const text = relink(
    body,
    /\]\(\/legal\/([a-z-]+)\)/g,
    meta,
    (target) => `](${siteUrl}${markdownHref(lang, target)})`,
  )
  const dateLine = `${meta.ui[lang]?.updated ?? ''} ${updated}`.trim()
  return `# ${title}\n\n_${dateLine}_\n\n${text.trim()}\n`
}

export function readSite(dir: string): Site {
  const meta = JSON.parse(readFileSync(join(dir, 'meta.json'), 'utf8')) as Meta
  const publisher = JSON.parse(readFileSync(join(dir, 'publisher.json'), 'utf8')) as Record<
    string,
    string
  >
  const siteUrl = (process.env.VITE_SITE_URL ?? publisher.siteUrl ?? '').replace(/\/+$/, '')
  if (siteUrl === '') throw new Error('publisher.json needs a siteUrl')
  const pages: Site['pages'] = {}

  for (const lang of meta.langs) {
    pages[lang] = {}
    for (const id of meta.pages) {
      const file = join(dir, `${id}.${lang}.md`)
      const updatedIso = meta.updated[id]
      if (updatedIso === undefined) throw new Error(`meta.json: no "updated" date for ${id}`)
      const updated = formatDate(updatedIso, lang)
      const source = fill(readFileSync(file, 'utf8'), publisher, file)
      const match = /^#\s+(.+)$/m.exec(source)
      if (match === null) throw new Error(`${file}: the page needs a "# Title" heading`)
      const title = (match[1] ?? '').trim()
      const body = source.replace(match[0], '')
      const html = markdown.parse(body, { async: false })
      pages[lang][id] = {
        id,
        lang,
        title,
        label: meta.labels[lang]?.[id] ?? title,
        description: describe(html),
        updated,
        updatedIso,
        html,
        markdown: markdownCopy(siteUrl, meta, lang, title, body, updated),
        qa: FAQ_PAGES.has(id) ? questionsAndAnswers(body) : [],
      }
    }
  }
  return { meta, publisher, pages, siteUrl, noindex: process.env.VITE_NOINDEX === 'true' }
}

function contentFiles(dir: string, site: Site): string[] {
  const files = [join(dir, 'meta.json'), join(dir, 'publisher.json')]
  for (const lang of site.meta.langs) {
    for (const id of site.meta.pages) files.push(join(dir, `${id}.${lang}.md`))
  }
  return files
}

/** The site's paper and ink, without its web font: these pages load nothing but themselves. */
const STYLES = `
:root {
  --paper: #f8f4e8; --card: #fffdf7; --ink: #243128; --ink-soft: #5c6a5c; --sage: #7c9082;
  --sage-ink: #4d6153; --leaf: #2c6a30; --line: #dfdccb;
  --sans: Nunito, ui-rounded, 'SF Pro Rounded', system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  color-scheme: light;
}
* { box-sizing: border-box; }
html { -webkit-text-size-adjust: 100%; }
body {
  margin: 0; background: var(--paper); color: var(--ink); font-family: var(--sans); line-height: 1.65;
  background-image: radial-gradient(60rem 34rem at 50% -10%, rgba(124, 144, 130, .22), transparent 70%);
  background-repeat: no-repeat;
}
a { color: var(--leaf); text-decoration: underline; text-underline-offset: 3px; }
a:hover { color: var(--ink); }
.wrap { max-width: 46rem; margin: 0 auto; padding: 0 1.25rem; }
header.top { display: flex; align-items: center; gap: .75rem; padding: 1.25rem 0; }
header.top .brand { display: flex; align-items: center; gap: .6rem; color: inherit; text-decoration: none; }
header.top .brand img { width: 2.5rem; height: 2.5rem; }
header.top .brand span { font-weight: 800; font-size: 1.4rem; letter-spacing: -.02em; }
header.top .back { margin-left: auto; font-size: .9rem; font-weight: 700; }
nav.pages { display: flex; flex-wrap: wrap; gap: .4rem; margin: .5rem 0 2rem; }
nav.pages a {
  font-size: .9rem; font-weight: 700; text-decoration: none; color: var(--ink-soft);
  border: 1px solid var(--line); border-radius: 999px; padding: .3rem .9rem; background: var(--card);
}
nav.pages a:hover { color: var(--ink); }
nav.pages a[aria-current] { color: #fff; border-color: var(--sage-ink); background: var(--sage-ink); }
main { padding-bottom: 3rem; }
h1 { font-weight: 800; font-size: 2.5rem; line-height: 1.05; letter-spacing: -.03em; margin: 0 0 .5rem; }
p.updated { color: var(--ink-soft); font-size: .9rem; margin: 0 0 .5rem; }
p.languages { color: var(--ink-soft); font-size: .9rem; margin: 0 0 2rem; }
p.languages a { margin-right: .6rem; }
article h2 { font-weight: 800; font-size: 1.55rem; line-height: 1.15; letter-spacing: -.02em; margin: 2.5rem 0 .75rem; }
article h3 { font-weight: 800; font-size: 1.15rem; line-height: 1.25; margin: 1.75rem 0 .4rem; }
article h4 { font-weight: 800; font-size: 1rem; margin: 1.5rem 0 .4rem; }
article p, article li { font-size: 1.02rem; }
article ul { padding-left: 1.25rem; }
article li { margin: .35rem 0; }
article blockquote { margin: 1rem 0; padding: .6rem 1rem; border-left: 3px solid var(--sage); background: var(--card); border-radius: 0 .75rem .75rem 0; }
article blockquote p { margin: 0; }
article hr { border: 0; border-top: 1px solid var(--line); margin: 2rem 0; }
ul.index { list-style: none; padding: 0; margin: 0; display: grid; gap: .75rem; }
ul.index a { display: block; padding: 1rem 1.15rem; border: 1px solid var(--line); border-radius: 1rem; background: var(--card); text-decoration: none; color: inherit; }
ul.index a:hover { border-color: var(--sage); }
ul.index strong { display: block; font-size: 1.25rem; font-weight: 800; letter-spacing: -.01em; }
ul.index span { color: var(--ink-soft); font-size: .92rem; }
footer.bottom { border-top: 1px solid var(--line); padding: 1.5rem 0 2.5rem; color: var(--ink-soft); font-size: .85rem; text-align: center; }
footer.bottom .tagline { font-weight: 800; font-size: 1.05rem; color: var(--ink); margin: 0 0 .25rem; }
footer.bottom p { margin: 0; }
@media print { body { background: #fff; } nav.pages, header.top .back, p.languages { display: none; } }
`

interface ShellHead {
  /** One or two sentences for the result snippet and the share card. */
  description: string
  /** The site path search engines should keep for this content. */
  canonical: string
  /** The same page in every language, by language code, when it exists in all of them. */
  alternates: Record<string, string> | null
  /** Keep the page out of results even on production (the language chooser). */
  noindex?: boolean
  /** Schema.org objects, one script each. */
  jsonLd?: Record<string, unknown>[]
  /** The site path of this page's Markdown copy, when it has one. */
  markdown?: string
}

function headTags(site: Site, lang: string, title: string, head: ShellHead): string {
  const url = site.siteUrl + head.canonical
  const image = `${site.siteUrl}/media/${lang}/og-image.jpg`
  const robots = site.noindex || head.noindex === true ? 'noindex, nofollow' : 'index, follow'
  const tags = [
    `<meta name="description" content="${escapeHtml(head.description)}" />`,
    `<meta name="robots" content="${robots}" />`,
    `<link rel="canonical" href="${url}" />`,
  ]
  if (head.markdown !== undefined) {
    tags.push(
      `<link rel="alternate" type="text/markdown" href="${site.siteUrl}${head.markdown}" />`,
    )
  }
  if (head.alternates !== null) {
    for (const [code, path] of Object.entries(head.alternates)) {
      tags.push(`<link rel="alternate" hreflang="${code}" href="${site.siteUrl}${path}" />`)
    }
    const fallback = head.alternates[DEFAULT_LANG]
    if (fallback !== undefined) {
      tags.push(`<link rel="alternate" hreflang="x-default" href="${site.siteUrl}${fallback}" />`)
    }
  }
  tags.push(
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escapeHtml(site.publisher.brand ?? '')}" />`,
    `<meta property="og:locale" content="${OG_LOCALES[lang] ?? lang}" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(head.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(head.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
  )
  for (const data of head.jsonLd ?? []) {
    // `<` is escaped so no content can close the script element early.
    const json = JSON.stringify(data).replace(/</g, '\\u003c')
    tags.push(`<script type="application/ld+json">${json}</script>`)
  }
  return tags.map((tag) => `    ${tag}`).join('\n')
}

function shell(
  site: Site,
  lang: string,
  title: string,
  ui: UiStrings,
  body: string,
  head: ShellHead,
): string {
  const brand = escapeHtml(site.publisher.brand ?? '')
  const home = lang === DEFAULT_LANG ? '/' : `/${lang}`
  const year = new Date().getUTCFullYear()
  const owner = escapeHtml(`${site.publisher.company} ${site.publisher.legalForm}`)
  return `<!DOCTYPE html>
<html lang="${lang}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#f8f4e8" />
    <link rel="icon" href="/favicon.ico" sizes="16x16 32x32 48x48" />
    <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
    <title>${escapeHtml(title)} · ${brand}</title>
${headTags(site, lang, title, head)}
    <style>${STYLES}</style>
  </head>
  <body>
    <div class="wrap">
      <header class="top">
        <a class="brand" href="${home}">
          <img src="/media/brand/icon.webp" alt="" width="40" height="40" />
          <span>${brand}</span>
        </a>
        <a class="back" href="${home}">${escapeHtml(ui.backToSite)}</a>
      </header>
      <main>
${body}
      </main>
      <footer class="bottom">
        <p class="tagline">${escapeHtml(ui.tagline)}</p>
        <p>© ${year} ${brand} · ${owner}. ${escapeHtml(ui.rights)}</p>
      </footer>
    </div>
  </body>
</html>
`
}

function languageLinks(site: Site, lang: string, id: string | null): string {
  const ui = site.meta.ui[lang]
  const links = site.meta.langs
    .filter((other) => other !== lang)
    .map(
      (other) =>
        `<a href="${pageHref(other, id)}" lang="${other}" hreflang="${other}">${LANGUAGE_NAMES[other] ?? other}</a>`,
    )
  return `<p class="languages">${escapeHtml(ui?.languages ?? '')} ${links.join('')}</p>`
}

function pagesNav(site: Site, lang: string, current: string | null): string {
  const items = site.meta.pages.map((id) => {
    const page = site.pages[lang]?.[id]
    const aria = id === current ? ' aria-current="page"' : ''
    return `<a href="${pageHref(lang, id)}"${aria}>${escapeHtml(page?.label ?? id)}</a>`
  })
  return `<nav class="pages" aria-label="${escapeHtml(site.meta.ui[lang]?.pages ?? 'Pages')}">${items.join('')}</nav>`
}

/** The same page in every language, by language code. */
function alternates(site: Site, id: string | null): Record<string, string> {
  return Object.fromEntries(site.meta.langs.map((lang) => [lang, pageHref(lang, id)]))
}

export function faqJsonLd(page: { lang: string; qa: QuestionAnswer[] }): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: page.lang,
    mainEntity: page.qa.map((pair) => ({
      '@type': 'Question',
      name: pair.question,
      acceptedAnswer: { '@type': 'Answer', text: pair.answer },
    })),
  }
}

function renderPage(site: Site, lang: string, id: string): string {
  const page = site.pages[lang]?.[id]
  const ui = site.meta.ui[lang]
  if (page === undefined || ui === undefined) throw new Error(`No legal page ${id} in ${lang}`)
  const html = relink(
    page.html,
    /href="\/legal\/([a-z-]+)"/g,
    site.meta,
    (target) => `href="${pageHref(lang, target)}"`,
  )
  const body = `${pagesNav(site, lang, id)}
<h1>${escapeHtml(page.title)}</h1>
<p class="updated">${escapeHtml(ui.updated)} <time datetime="${page.updatedIso}">${escapeHtml(page.updated)}</time></p>
${languageLinks(site, lang, id)}
<article>
${html}
</article>`
  return shell(site, lang, page.title, ui, body, {
    description: page.description,
    canonical: pageHref(lang, id),
    alternates: alternates(site, id),
    jsonLd: page.qa.length > 0 ? [faqJsonLd(page)] : [],
    markdown: markdownHref(lang, id),
  })
}

function renderLangIndex(site: Site, lang: string): string {
  const ui = site.meta.ui[lang]
  if (ui === undefined) throw new Error(`No ui strings for ${lang}`)
  const items = site.meta.pages.map((id) => {
    const page = site.pages[lang]?.[id]
    return `<li><a href="${pageHref(lang, id)}"><strong>${escapeHtml(page?.title ?? id)}</strong><span>${escapeHtml(page?.description ?? '')}</span></a></li>`
  })
  const body = `<h1>${escapeHtml(ui.index)}</h1>
<p class="updated">${escapeHtml(ui.indexIntro)}</p>
${languageLinks(site, lang, null)}
<ul class="index">${items.join('\n')}</ul>`
  return shell(site, lang, ui.index, ui, body, {
    description: ui.indexIntro,
    canonical: pageHref(lang, null),
    alternates: alternates(site, null),
  })
}

function renderRootIndex(site: Site): string {
  const en = site.meta.ui.en ?? site.meta.ui[site.meta.langs[0] ?? 'en']
  if (en === undefined) throw new Error('No ui strings')
  const items = site.meta.langs.map(
    (lang) =>
      `<li><a href="${pageHref(lang, null)}" lang="${lang}" hreflang="${lang}"><strong>${LANGUAGE_NAMES[lang] ?? lang}</strong><span>${escapeHtml(site.meta.ui[lang]?.index ?? '')}</span></a></li>`,
  )
  const redirect = `(function(){var l=(navigator.language||'').slice(0,2).toLowerCase();if(${JSON.stringify(site.meta.langs)}.indexOf(l)>=0&&l!=='en')location.replace('${URL_PREFIX}'+l+'/')})()`
  const body = `<h1>${escapeHtml(en.chooseLanguage)}</h1>
<ul class="index">${items.join('\n')}</ul>
<script>${redirect}</script>`
  // A chooser with a redirect is nobody's search result; the language indexes are.
  return shell(site, DEFAULT_LANG, en.index, en, body, {
    description: en.indexIntro,
    canonical: URL_PREFIX,
    alternates: null,
    noindex: true,
  })
}

/** Every standalone file, by path under the site root, for the build and for tests. */
export function renderStaticFiles(dir: string): Map<string, string> {
  return staticFiles(readSite(resolve(dir)))
}

function staticFiles(site: Site): Map<string, string> {
  const files = new Map<string, string>()
  files.set('legal/index.html', renderRootIndex(site))
  for (const lang of site.meta.langs) {
    files.set(`legal/${lang}/index.html`, renderLangIndex(site, lang))
    for (const id of site.meta.pages) {
      files.set(`legal/${lang}/${id}.html`, renderPage(site, lang, id))
      files.set(`legal/${lang}/${id}.html.md`, site.pages[lang]?.[id]?.markdown ?? '')
    }
  }
  // The same English page under a second name; its canonical link still names the first.
  for (const [fileName, id] of Object.entries(site.meta.aliases ?? {})) {
    files.set(fileName, renderPage(site, DEFAULT_LANG, id))
  }
  return files
}

function virtualModule(site: Site, full: boolean): string {
  const pages = Object.fromEntries(
    Object.entries(site.pages).map(([lang, byId]) => [
      lang,
      Object.fromEntries(
        Object.entries(byId).map(([id, page]) => [
          id,
          {
            id: page.id,
            lang: page.lang,
            title: page.title,
            label: page.label,
            description: page.description,
            updated: page.updated,
            updatedIso: page.updatedIso,
            // In the site, a link to another page stays inside the site, in the same language.
            ...(full
              ? {
                  html: relink(
                    page.html,
                    /href="\/legal\/([a-z-]+)"/g,
                    site.meta,
                    (target) => `href="${appPath(lang, target)}"`,
                  ),
                }
              : {}),
            qa: page.qa,
            path: appPath(lang, id),
            staticPath: pageHref(lang, id),
            markdownPath: markdownHref(lang, id),
          },
        ]),
      ),
    ]),
  )
  return [
    `export const langs = ${JSON.stringify(site.meta.langs)};`,
    `export const pageIds = ${JSON.stringify(site.meta.pages)};`,
    `export const pages = ${JSON.stringify(pages)};`,
  ].join('\n')
}

export default function legalPages(options: LegalPagesOptions): Plugin {
  const dir = resolve(options.dir)
  let server: ViteDevServer | null = null

  return {
    name: 'jeannot:legal-pages',

    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID
      if (id === INDEX_ID) return RESOLVED_INDEX_ID
      return null
    },

    load(id) {
      if (id !== RESOLVED_ID && id !== RESOLVED_INDEX_ID) return null
      const site = readSite(dir)
      for (const file of contentFiles(dir, site)) this.addWatchFile(file)
      return virtualModule(site, id === RESOLVED_ID)
    },

    configureServer(devServer) {
      server = devServer
      devServer.watcher.add(dir)
      devServer.middlewares.use((req, res, next) => {
        const url = (req.url ?? '').split('?')[0] ?? ''
        let path = url.replace(/^\//, '')
        if (url === URL_PREFIX.slice(0, -1) || (url.startsWith(URL_PREFIX) && url.endsWith('/'))) {
          path = `${path.replace(/\/$/, '')}/index.html`
        }
        if (!path.endsWith('.html') && !path.endsWith('.html.md')) return next()
        try {
          const file = staticFiles(readSite(dir)).get(path)
          if (file === undefined) return next()
          const type = path.endsWith('.md') ? 'text/markdown' : 'text/html'
          res.setHeader('Content-Type', `${type}; charset=utf-8`)
          res.end(file)
        } catch (error) {
          next(error)
        }
      })
    },

    handleHotUpdate({ file }) {
      if (server === null || !file.startsWith(dir)) return
      for (const id of [RESOLVED_ID, RESOLVED_INDEX_ID]) {
        const mod = server.moduleGraph.getModuleById(id)
        if (mod !== undefined) server.moduleGraph.invalidateModule(mod)
      }
      server.ws.send({ type: 'full-reload' })
      return []
    },

    generateBundle() {
      for (const [fileName, source] of staticFiles(readSite(dir))) {
        this.emitFile({ type: 'asset', fileName, source })
      }
    },
  }
}
