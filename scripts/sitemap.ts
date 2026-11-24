import { resolve } from 'node:path'
import type { Plugin } from 'vite'
import { markdownHref, pageHref, readSite, type Site } from './legal-pages.ts'

/**
 * The files crawlers and agents read first, from the same `meta.json` and `publisher.json` as
 * the legal pages:
 *
 * - `robots.txt` and `sitemap.xml`. The sitemap lists the home page in every language, with
 *   hreflang alternates, and the standalone help and legal pages, which are the canonical copy
 *   of that content. On a build flagged `VITE_NOINDEX=true` robots.txt bars every crawler.
 * - `llms.txt` (https://llmstxt.org): a Markdown overview of the site for language models, with
 *   links to the Markdown copies of the help and legal pages.
 */

export interface SitemapEntry {
  /** Site path, `/fr`. */
  path: string
  /** The same page in every language, by language code, plus `x-default`. */
  alternates?: Record<string, string>
  /** `YYYY-MM-DD`. */
  lastmod?: string
}

const DEFAULT_LANG = 'en'
const LANGUAGE_NAMES: Record<string, string> = { en: 'English', fr: 'French' }

/** The pages search engines should index from the Vue site, as language-neutral paths. */
export const PUBLIC_PATHS = ['/'] as const

/** The pages whose content lives in Markdown: prerendered, but canonical in their plain copy. */
const CONTENT_PATHS: Record<string, string> = {
  terms: '/legal/terms',
  privacy: '/legal/privacy',
  support: '/support',
}

/** `/support` in French is `/fr/support`; English carries no prefix. */
export function localizedPath(path: string, lang: string): string {
  if (lang === DEFAULT_LANG) return path
  return path === '/' ? `/${lang}` : `/${lang}${path}`
}

function alternates(site: Site, path: string): Record<string, string> {
  const urls = Object.fromEntries(site.meta.langs.map((lang) => [lang, localizedPath(path, lang)]))
  urls['x-default'] = localizedPath(path, DEFAULT_LANG)
  return urls
}

export function sitemapEntries(site: Site): SitemapEntry[] {
  const entries: SitemapEntry[] = []
  for (const path of PUBLIC_PATHS) {
    for (const lang of site.meta.langs) {
      entries.push({ path: localizedPath(path, lang), alternates: alternates(site, path) })
    }
  }
  const latest = Object.values(site.meta.updated).sort().at(-1)
  for (const lang of site.meta.langs) {
    const index = Object.fromEntries(site.meta.langs.map((other) => [other, pageHref(other, null)]))
    index['x-default'] = pageHref(DEFAULT_LANG, null)
    entries.push({ path: pageHref(lang, null), alternates: index, lastmod: latest })
    for (const id of site.meta.pages) {
      const pages = Object.fromEntries(
        site.meta.langs.map((other) => [other, pageHref(other, id)]),
      )
      pages['x-default'] = pageHref(DEFAULT_LANG, id)
      entries.push({ path: pageHref(lang, id), alternates: pages, lastmod: site.meta.updated[id] })
    }
  }
  return entries
}

/** The pages `scripts/prerender.ts` renders: the home page and the Vue view of each content page. */
export function prerenderPaths(site: Site): string[] {
  const paths: string[] = []
  for (const lang of site.meta.langs) {
    for (const path of PUBLIC_PATHS) paths.push(localizedPath(path, lang))
    for (const id of site.meta.pages) {
      const path = CONTENT_PATHS[id]
      if (path === undefined) throw new Error(`scripts/sitemap.ts: no route known for ${id}`)
      paths.push(localizedPath(path, lang))
    }
  }
  return paths
}

function escapeXml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;')
}

export function renderSitemap(siteUrl: string, entries: SitemapEntry[]): string {
  const urls = entries.map((entry) => {
    const lines = [`    <loc>${escapeXml(siteUrl + entry.path)}</loc>`]
    if (entry.lastmod !== undefined) lines.push(`    <lastmod>${entry.lastmod}</lastmod>`)
    for (const [code, path] of Object.entries(entry.alternates ?? {})) {
      lines.push(
        `    <xhtml:link rel="alternate" hreflang="${code}" href="${escapeXml(siteUrl + path)}" />`,
      )
    }
    return `  <url>\n${lines.join('\n')}\n  </url>`
  })
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`
}

export function renderRobots(siteUrl: string, noindex: boolean): string {
  if (noindex) return 'User-agent: *\nDisallow: /\n'
  return `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`
}

/** What the product is, in one paragraph: the help page's answer to "What is Jeannot?". */
function productSummary(site: Site): string {
  const help = site.pages[DEFAULT_LANG]?.support
  const answer = help?.qa.find((pair) => /^what is /i.test(pair.question))?.answer
  if (answer === undefined) throw new Error('llms.txt needs a "What is …?" answer in support.en.md')
  return answer
}

function contentPages(site: Site, lang: string): string[] {
  return site.meta.pages.map((id) => {
    const page = site.pages[lang]?.[id]
    if (page === undefined) throw new Error(`No legal page ${id} in ${lang}`)
    const name =
      lang === DEFAULT_LANG ? page.title : `${page.title} (${LANGUAGE_NAMES[lang] ?? lang})`
    return `- [${name}](${site.siteUrl}${markdownHref(lang, id)}): ${page.description}`
  })
}

/**
 * The site for a language model: what Jeannot is, where to get it, who to write to, and the
 * help and legal pages as Markdown. English first; the other languages are optional reading.
 */
export function renderLlmsTxt(site: Site): string {
  const { siteUrl, publisher } = site
  const brand = publisher.brand ?? 'Jeannot'
  const others = site.meta.langs.filter((lang) => lang !== DEFAULT_LANG)
  const optional = others.flatMap((lang) => contentPages(site, lang))
  const prefixes = others.map((lang) => `\`/${lang}\` for ${LANGUAGE_NAMES[lang] ?? lang}`)
  return `# ${brand}

> ${productSummary(site)} ${brand} is published by ${publisher.company} ${publisher.legalForm} (France), in English and French.

Where to get ${brand}:

- [Web version](${publisher.webAppUrl}): ${brand} in the browser, with the same account as the apps
- [iPhone and iPad](${publisher.appStoreUrl}): the app on the Apple App Store
- [Android](${publisher.playStoreUrl}): the app on Google Play

Notes for agents:

- This site (${siteUrl}) presents the app. English lives at the bare path, the other languages under a prefix (${prefixes.join(', ')}). The app itself needs an account.
- Part of ${brand} is free; the rest needs a Premium subscription, sold in the mobile apps through the App Store and Google Play.
- Every help and legal page exists as HTML and, at the same URL with \`.md\` appended, as Markdown. The links below point at the Markdown.
- Contact: ${publisher.supportEmail} (help with the app), ${publisher.email} (everything else).

## Help and legal

${contentPages(site, DEFAULT_LANG).join('\n')}

## Optional

${optional.join('\n')}
- [Sitemap](${siteUrl}/sitemap.xml): every public page in every language
`
}

/** The generated files by their path in `dist/`, for the build and for tests. */
export function seoFiles(site: Site): Map<string, string> {
  return new Map([
    ['robots.txt', renderRobots(site.siteUrl, site.noindex)],
    ['sitemap.xml', renderSitemap(site.siteUrl, sitemapEntries(site))],
    ['llms.txt', renderLlmsTxt(site)],
  ])
}

function contentType(fileName: string): string {
  return fileName.endsWith('.xml') ? 'application/xml' : 'text/plain'
}

export default function sitemap(options: { dir: string }): Plugin {
  const dir = resolve(options.dir)
  return {
    name: 'jeannot:sitemap',

    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const name = ((req.url ?? '').split('?')[0] ?? '').replace(/^\//, '')
        if (!['robots.txt', 'sitemap.xml', 'llms.txt'].includes(name)) return next()
        try {
          const file = seoFiles(readSite(dir)).get(name)
          if (file === undefined) return next()
          res.setHeader('Content-Type', `${contentType(name)}; charset=utf-8`)
          res.end(file)
        } catch (error) {
          next(error)
        }
      })
    },

    generateBundle() {
      for (const [fileName, source] of seoFiles(readSite(dir))) {
        this.emitFile({ type: 'asset', fileName, source })
      }
    },
  }
}
