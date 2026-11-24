import { createHead, transformHtmlTemplate } from '@unhead/vue/server'
import { renderToString } from 'vue/server-renderer'
import { createMemoryHistory } from 'vue-router'
import { createJeannotApp } from './app'

/**
 * Renders one page to HTML at build time, for `scripts/prerender.ts`. The result is what
 * crawlers and link previews read; in the browser the app mounts over it as usual.
 */
export async function render(url: string, template: string): Promise<string> {
  const head = createHead()
  const { app, router } = createJeannotApp(createMemoryHistory(), head)
  await router.push(url)
  await router.isReady()
  const resolved = router.currentRoute.value.fullPath
  if (resolved !== url) throw new Error(`${url} rendered as ${resolved}: not a page of the site`)
  const body = await renderToString(app)
  const html = template.replace('<div id="app"></div>', `<div id="app">${body}</div>`)
  return transformHtmlTemplate(head, html)
}
