<script setup lang="ts">
import { PhAppleLogo, PhGooglePlayLogo, PhDesktop } from '@phosphor-icons/vue'
import { useLang, useMessages } from '@/i18n'
import { APP_STORE_URL, WEB_APP_LABEL, WEB_APP_URL, playStoreUrl } from '@/lib/site'

/**
 * The three ways into Jeannot: the App Store, Google Play and the web version. `tone` picks the
 * colours for a light or a dark background.
 */
withDefaults(defineProps<{ tone?: 'light' | 'dark' }>(), { tone: 'light' })

const lang = useLang()
const m = useMessages()
</script>

<template>
  <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
    <a
      :href="APP_STORE_URL"
      target="_blank"
      rel="noopener"
      class="store"
      :class="tone === 'dark' ? 'store-paper' : 'store-ink'"
    >
      <PhAppleLogo :size="28" weight="fill" aria-hidden="true" />
      <span>
        <small>{{ m.cta.appStoreSmall }}</small>
        {{ m.cta.appStore }}
      </span>
    </a>
    <a
      :href="playStoreUrl(lang)"
      target="_blank"
      rel="noopener"
      class="store"
      :class="tone === 'dark' ? 'store-paper' : 'store-ink'"
    >
      <PhGooglePlayLogo :size="28" weight="fill" aria-hidden="true" />
      <span>
        <small>{{ m.cta.playSmall }}</small>
        {{ m.cta.play }}
      </span>
    </a>
    <a
      :href="WEB_APP_URL"
      target="_blank"
      rel="noopener"
      class="store"
      :class="tone === 'dark' ? 'store-line-dark' : 'store-line'"
    >
      <PhDesktop :size="28" weight="duotone" aria-hidden="true" />
      <span>
        <small>{{ m.cta.webSmall }}</small>
        {{ WEB_APP_LABEL }}
      </span>
    </a>
  </div>
</template>

<style scoped>
.store {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.6rem 1.25rem 0.65rem 1rem;
  border-radius: 1rem;
  font-weight: 800;
  font-size: 1.1rem;
  line-height: 1.15;
  letter-spacing: -0.01em;
  border: 1.5px solid transparent;
  transition:
    transform 0.3s var(--ease-fluid),
    box-shadow 0.3s var(--ease-fluid),
    background-color 0.2s,
    color 0.2s;
}
.store:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lift);
}
.store small {
  display: block;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.01em;
  opacity: 0.8;
}
.store-ink {
  background: var(--color-ink);
  color: var(--color-paper);
}
.store-paper {
  background: var(--color-paper);
  color: var(--color-ink);
}
.store-line {
  border-color: var(--color-ink);
  color: var(--color-ink);
  background: rgb(255 253 247 / 0.6);
}
.store-line:hover {
  background: var(--color-card);
}
.store-line-dark {
  border-color: rgb(248 244 232 / 0.7);
  color: var(--color-paper);
}
.store-line-dark:hover {
  background: rgb(248 244 232 / 0.12);
}
</style>
