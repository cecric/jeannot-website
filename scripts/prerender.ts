import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { createServer } from 'vite'
import { readSite } from './legal-pages.ts'
import { prerenderPaths } from './sitemap.ts'

/**
 * After `vite build`, renders every public page of the site to HTML inside `dist/`, so search
 * engines, link previews and store reviewers that run no JavaScript still read the page. Each
 * path becomes `<path>/index.html`; the untouched build goes to `app.html`, which nginx serves
 * for every other URL (old links, unknown links). Run with `npm run prerender`.
 */

const DIST = resolve('dist')
const CONTENT_DIR = resolve('src/content/legal')

interface ServerEntry {
  render: (url: string, template: string) => Promise<string>
}

async function main(): Promise<void> {
  const index = join(DIST, 'index.html')
  const fallback = join(DIST, 'app.html')
  if (!existsSync(index)) throw new Error('dist/index.html is missing: run `vite build` first')
  // A second run starts from the clean build, not from the prerendered home page.
  if (!existsSync(fallback)) copyFileSync(index, fallback)
  const template = readFileSync(fallback, 'utf8')

  const server = await createServer({
    configFile: resolve('vite.config.ts'),
    mode: 'production',
    appType: 'custom',
    logLevel: 'warn',
    server: { middlewareMode: true, hmr: false, watch: null },
  })
  try {
    const entry = (await server.ssrLoadModule('/src/entry-server.ts')) as ServerEntry
    const paths = prerenderPaths(readSite(CONTENT_DIR))
    for (const path of paths) {
      const html = await entry.render(path, template)
      const file = path === '/' ? index : join(DIST, path.slice(1), 'index.html')
      mkdirSync(dirname(file), { recursive: true })
      writeFileSync(file, html)
    }
    console.log(`Prerendered ${paths.length} pages into dist/`)
  } finally {
    await server.close()
  }
}

main().catch((error: unknown) => {
  console.error(error)
  process.exit(1)
})
