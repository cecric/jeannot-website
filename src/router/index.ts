import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      },
      {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/AboutView.vue'),
      },
      {
        path: '/privacy-policies',
        name: 'privacy-policies',
        component: () => import('../views/PrivacyPolicies.vue'),
      },
      {
        path: '/ios/terms-of-use',
        name: 'terms-of-use',
        component: () => import('../views/TermsOfUse.vue'),
      },
      {
        path: '/support',
        name: 'support',
        component: () => import('../views/SupportView.vue'),
      },
      {
        path: '/fr/support',
        name: 'fr-support',
        component: () => import('../views/SupportFRView.vue'),
      },
  ],
})

export default router
