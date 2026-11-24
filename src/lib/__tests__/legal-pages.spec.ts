import { describe, expect, it } from 'vitest'
import { langs, pageIds, pages } from 'virtual:legal-pages'
import { readSite, renderStaticFiles } from '../../../scripts/legal-pages'
import { prerenderPaths, seoFiles } from '../../../scripts/sitemap'

const DIR = 'src/content/legal'

describe('help and legal pages', () => {
  it('renders every page in every language for the site', () => {
    for (const lang of langs) {
      for (const id of pageIds) {
        const page = pages[lang][id]
        expect(page.title, `${id}.${lang}`).not.toBe('')
        expect(page.description.length, `${id}.${lang}`).toBeGreaterThan(40)
        expect(page.html, `${id}.${lang}`).toContain('<h2')
        // Every {{placeholder}} of publisher.json is filled.
        expect(page.html, `${id}.${lang}`).not.toMatch(/\{\{\s*[a-zA-Z]+\s*\}\}/)
      }
    }
  })

  it('keeps links between pages inside the site, in the language of the page', () => {
    expect(pages.en.terms.html).toContain('href="/legal/privacy"')
    expect(pages.en.terms.html).toContain('href="/support"')
    expect(pages.fr.terms.html).toContain('href="/fr/legal/privacy"')
    expect(pages.fr.terms.html).toContain('href="/fr/support"')
  })

  it('reads the help page as questions and answers', () => {
    expect(pages.en.support.qa.length).toBeGreaterThan(10)
    expect(pages.fr.support.qa).toHaveLength(pages.en.support.qa.length)
    expect(pages.en.terms.qa).toHaveLength(0)
  })

  it('writes each page as standalone HTML and as Markdown', () => {
    const files = renderStaticFiles(DIR)
    for (const lang of langs) {
      for (const id of pageIds) {
        const html = files.get(`legal/${lang}/${id}.html`) ?? ''
        expect(html).toContain(`<html lang="${lang}">`)
        expect(html).toContain(`<link rel="canonical" href="https://jeannot.app/legal/${lang}/${id}.html" />`)
        expect(html).toContain(`href="/legal/${lang}/privacy.html"`)
        expect(html).not.toMatch(/\{\{\s*[a-zA-Z]+\s*\}\}/)
        const markdown = files.get(`legal/${lang}/${id}.html.md`) ?? ''
        expect(markdown.startsWith(`# ${pages[lang][id].title}\n`)).toBe(true)
      }
    }
    expect(files.get('legal/en/support.html')).toContain('"@type":"FAQPage"')
  })

  it('keeps the short and historical addresses of the English pages', () => {
    const files = renderStaticFiles(DIR)
    for (const name of ['terms-of-use.html', 'privacy-policies.html']) {
      expect(files.get(name)).toContain('<article>')
    }
    expect(files.get('terms-of-use.html')).toContain(
      '<link rel="canonical" href="https://jeannot.app/legal/en/terms.html" />',
    )
  })
})

describe('files for crawlers', () => {
  const site = readSite(DIR)

  it('prerenders the home page and each content page in every language', () => {
    expect(prerenderPaths(site)).toEqual([
      '/',
      '/legal/terms',
      '/legal/privacy',
      '/support',
      '/fr',
      '/fr/legal/terms',
      '/fr/legal/privacy',
      '/fr/support',
    ])
  })

  it('lists every public page in the sitemap, with its other languages', () => {
    const sitemap = seoFiles(site).get('sitemap.xml') ?? ''
    expect(sitemap).toContain('<loc>https://jeannot.app/</loc>')
    expect(sitemap).toContain('<loc>https://jeannot.app/fr</loc>')
    expect(sitemap).toContain('<loc>https://jeannot.app/legal/fr/terms.html</loc>')
    expect(sitemap).toContain('hreflang="x-default" href="https://jeannot.app/"')
  })

  it('opens the site to crawlers, except on a preview build', () => {
    expect(seoFiles(site).get('robots.txt')).toContain('Sitemap: https://jeannot.app/sitemap.xml')
    expect(seoFiles({ ...site, noindex: true }).get('robots.txt')).toBe('User-agent: *\nDisallow: /\n')
  })

  it('describes the app and links the Markdown pages in llms.txt', () => {
    const llms = seoFiles(site).get('llms.txt') ?? ''
    expect(llms.startsWith('# Jeannot\n')).toBe(true)
    expect(llms).toContain('https://my.jeannot.app')
    expect(llms).toContain('https://jeannot.app/legal/en/terms.html.md')
  })
})
