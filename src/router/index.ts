import {
  createRouter,
  createWebHistory,
  START_LOCATION,
  type RouteRecordRaw,
  type Router,
  type RouterHistory,
} from 'vue-router'
import type { AppI18n } from '@/i18n'
import { preferredLang } from '@/lib/locale'
import { DEFAULT_LANG, LOCALE_PREFIX, isLang, localizedPath } from '@/lib/site'

// Every page exists once per language: English at the bare path, French under `/fr`. The
// prefix is what search engines index, and what decides the language of the page.

const pages: RouteRecordRaw[] = [
  {
    path: '',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    // Terms of use and privacy policy, rendered from the Markdown in `src/content/legal`. The
    // same pages are served as plain HTML at /legal/<lang>/<page>.html by
    // scripts/legal-pages.ts, and that copy is the canonical one.
    path: 'legal/:page(terms|privacy)',
    name: 'legal',
    component: () => import('@/views/LegalView.vue'),
  },
  {
    path: 'support',
    name: 'support',
    component: () => import('@/views/LegalView.vue'),
    props: { support: true },
  },
  // The addresses these pages had before, still linked from the apps and the stores.
  { path: 'privacy-policies', redirect: (to) => legal(to.params.locale, 'privacy') },
  { path: 'terms-of-use', redirect: (to) => legal(to.params.locale, 'terms') },
  { path: 'ios/terms-of-use', redirect: (to) => legal(to.params.locale, 'terms') },
  { path: 'legal', redirect: (to) => legal(to.params.locale, 'terms') },
]

function legal(locale: unknown, page: string) {
  return { name: 'legal', params: { locale: isLang(locale) ? locale : '', page } }
}

const routes: RouteRecordRaw[] = [
  { path: LOCALE_PREFIX, children: pages },
  {
    // A real not-found page rather than a redirect home, so dead links read as dead.
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
  },
]

export function createAppRouter(
  i18n: AppI18n,
  history: RouterHistory = createWebHistory(import.meta.env.BASE_URL),
): Router {
  const router = createRouter({
    history,
    routes,
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition !== null) return savedPosition
      // The sticky header covers the top of the page: stop a little above the section.
      if (to.hash !== '') return { el: to.hash, top: 88, behavior: 'smooth' }
      if (to.path === from.path) return false
      return { top: 0 }
    },
  })

  router.beforeEach((to, from) => {
    const urlLang = typeof to.params.locale === 'string' ? to.params.locale : ''
    const localized = to.matched.some((record) => record.path.startsWith(LOCALE_PREFIX))

    // Arriving on an address without a language, a French reader moves to the French page,
    // so every language has one address and the address says which. In the browser only:
    // the prerender and the crawlers always get the page the address names.
    if (!import.meta.env.SSR && from === START_LOCATION && localized && urlLang === '') {
      const preferred = preferredLang()
      if (preferred !== DEFAULT_LANG) {
        return {
          path: localizedPath(to.path, preferred),
          query: to.query,
          hash: to.hash,
          replace: true,
        }
      }
    }

    if (localized) {
      i18n.lang.value = isLang(urlLang) ? urlLang : DEFAULT_LANG
    } else {
      // An unknown address: read the language from its first segment, then from the visitor.
      const first = to.path.split('/')[1]
      i18n.lang.value = isLang(first) ? first : preferredLang()
    }
    return true
  })

  return router
}
