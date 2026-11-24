import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import legalPages from './scripts/legal-pages.ts'
import sitemap from './scripts/sitemap.ts'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    vue(),
    // The devtools inspector tags every element; keep it out of the prerendered HTML.
    mode === 'development' && vueDevTools(),
    tailwindcss(),
    legalPages({ dir: 'src/content/legal' }),
    sitemap({ dir: 'src/content/legal' }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
}))
