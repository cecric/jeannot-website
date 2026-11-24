# jeannot-website

The public site of [Jeannot](https://jeannot.app), the garden assistant: the home page, the help
page and the legal pages (terms of use, privacy policy), in English and French. Vue 3, Vite and
Tailwind CSS, prerendered to static HTML at build time and served by nginx.

## Commands

```sh
npm install
npm run dev          # http://localhost:5173, with hot reload
npm run build        # type-check, build, then prerender every page into dist/
npm run preview      # serve dist/ locally
npm run test:unit    # Vitest
npm run lint
npm run media        # refresh screenshots and videos from ../jeannot-app (see below)
```

Pushing to `main` builds the site and deploys it (`.github/workflows/deployment-production.yml`).

## Addresses

Every page exists once per language: English at the bare path, French under `/fr`. The address
decides the language; a French browser arriving on a bare address is moved to the French page.

| Page | Vue page (prerendered) | Plain HTML | Markdown |
| --- | --- | --- | --- |
| Home | `/`, `/fr` | | |
| Help and FAQ | `/support`, `/fr/support` | `/legal/<lang>/support.html` | `…/support.html.md` |
| Terms of use | `/legal/terms`, `/fr/legal/terms` | `/legal/<lang>/terms.html`, `/terms-of-use.html` | `…/terms.html.md` |
| Privacy policy | `/legal/privacy`, `/fr/legal/privacy` | `/legal/<lang>/privacy.html`, `/privacy-policies.html` | `…/privacy.html.md` |

`/legal/<lang>/` lists the pages of a language. The former addresses `/privacy-policies`,
`/terms-of-use` and `/ios/terms-of-use` redirect to the new pages. The plain HTML files are the
ones to give to the app stores and to link from the apps: they load nothing but themselves.

## Help and legal pages

The pages are written once, as Markdown, in `src/content/legal/<page>.<lang>.md`:

- `{{key}}` is replaced with the value of `key` in `publisher.json` (company, addresses, emails,
  store links).
- `meta.json` lists the languages and the pages, the date each page last changed (`updated`,
  shown at the top of the page: change it whenever you change a page), the short labels and the
  extra addresses of the English copy (`aliases`).
- A link to another page is written `/legal/<page>`; each copy gets the right address.
- In `support.<lang>.md`, every `###` heading is a question and what follows is its answer: they
  become the `FAQPage` structured data, and the home page shows a few of them.

`scripts/legal-pages.ts` (a Vite plugin) turns them into the Vue page, the plain HTML page and the
Markdown copy. `scripts/sitemap.ts` writes `robots.txt`, `sitemap.xml` and `llms.txt` from the same
files. To add a page, add its id to `meta.json`, its Markdown in every language, its route in
`src/router/index.ts` and its path in `CONTENT_PATHS` (`scripts/sitemap.ts`).

## Prerendering and SEO

`npm run build` ends with `scripts/prerender.ts`, which renders each public page with Vue on the
server and writes it to `dist/<path>/index.html`. The untouched build is kept as `dist/app.html`,
which nginx serves for any other address (it shows the not-found page).

Each view declares its title, description, canonical link, hreflang alternates, share card and
structured data with `usePageSeo()` (`src/lib/seo.ts`). Site-wide values (store links, the web
version, company details) come from `src/content/legal/publisher.json` through `src/lib/site.ts`.

Set `VITE_NOINDEX=true` on a preview build to keep it out of search engines, and `VITE_SITE_URL`
to build for another origin.

## Texts

The texts of the site are in `src/i18n/en.ts` and `src/i18n/fr.ts`, typed by `src/i18n/lang.ts`.

## Screenshots and videos

`public/media/` holds the screenshots, videos, engravings and share cards, copied from the app
repository and compressed for the web. After regenerating them in the app (`npm run screenshots`,
`npm run videos`, `npm run screenshots:creative`), run:

```sh
npm run media                    # reads ../jeannot-app
npm run media -- /path/to/app    # or another checkout
```

It needs `ffmpeg` and `cwebp` (`brew install ffmpeg webp`).
