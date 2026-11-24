import '@fontsource-variable/nunito'
import './assets/main.css'

import { createHead } from '@unhead/vue/client'
import { createWebHistory } from 'vue-router'

import { createJeannotApp } from './app'

const { app, router } = createJeannotApp(createWebHistory(import.meta.env.BASE_URL), createHead())

// Every page ships prerendered: keep that HTML on screen until the first view is loaded.
void router.isReady().then(() => app.mount('#app'))
