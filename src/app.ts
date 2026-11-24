import { createApp, type App as VueApp } from 'vue'
import { createPinia } from 'pinia'
import type { Router, RouterHistory } from 'vue-router'
import type { VueHeadClient } from '@unhead/vue'

import App from './App.vue'
import { createAppI18n, type AppI18n } from './i18n'
import { createAppRouter } from './router'

/**
 * The site, built the same way in the browser (`main.ts`) and at build time for the prerender
 * (`entry-server.ts`): only the history and the head manager differ.
 */
export function createJeannotApp(
  history: RouterHistory,
  head: VueHeadClient,
): { app: VueApp; router: Router; i18n: AppI18n } {
  const app = createApp(App)
  const i18n = createAppI18n()
  const router = createAppRouter(i18n, history)

  app.use(createPinia())
  app.use(i18n)
  app.use(router)
  app.use(head)

  return { app, router, i18n }
}
