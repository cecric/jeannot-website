import { computed, inject, ref, type App, type ComputedRef, type InjectionKey, type Ref } from 'vue'
import { DEFAULT_LANG, type Lang } from '@/lib/site'
import { en } from './en'
import { fr } from './fr'
import type { Messages } from './lang'

/**
 * The texts of the site, in `en.ts` and `fr.ts`, and the language of the page. The language
 * comes from the address (`/fr/...`): the router sets it, the views read it.
 */
export const messages: Record<Lang, Messages> = { en, fr }

const LANG: InjectionKey<Ref<Lang>> = Symbol('lang')

export interface AppI18n {
  lang: Ref<Lang>
  install: (app: App) => void
}

export function createAppI18n(): AppI18n {
  const lang = ref<Lang>(DEFAULT_LANG)
  return {
    lang,
    install(app) {
      app.provide(LANG, lang)
    },
  }
}

/** The language of the page. */
export function useLang(): Ref<Lang> {
  const lang = inject(LANG)
  if (lang === undefined) throw new Error('useLang() needs the app created by createJeannotApp()')
  return lang
}

/** The texts of the site in the language of the page, typed as written in `en.ts` and `fr.ts`. */
export function useMessages(): ComputedRef<Messages> {
  const lang = useLang()
  return computed(() => messages[lang.value])
}
