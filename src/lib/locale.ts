import { DEFAULT_LANG, isLang, type Lang } from '@/lib/site'

/**
 * The language a visitor wants when the address does not say: the one they picked with the
 * language switch on an earlier visit, otherwise the language of their browser. Only read in
 * the browser; the prerender always follows the address.
 */
const STORAGE_KEY = 'jeannot:lang'

export function preferredLang(): Lang {
  if (typeof window === 'undefined') return DEFAULT_LANG
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (isLang(stored)) return stored
  } catch {
    // Storage can be blocked (private mode, embedded views): fall back to the browser language.
  }
  const browser = (window.navigator.language ?? '').slice(0, 2).toLowerCase()
  return isLang(browser) ? browser : DEFAULT_LANG
}

/** Remembers a language picked on purpose, so the next visit to a bare address opens in it. */
export function rememberLang(lang: Lang): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, lang)
  } catch {
    // Nothing to remember it in: the address still carries the language.
  }
}
