<script setup lang="ts">
import { ref } from 'vue';

const mobileMenuOpen = ref(false);

const toUppercase = (locale: string) => {
  return locale.toUpperCase();
}
</script>

<template>
  <div class="font-sans min-h-screen bg-[#f8f5ed] w-full items-center container mx-auto">
    <!-- Navigation -->
    <nav class="mx-auto px-4 py-6 flex justify-between items-center w-full">
      <div class="flex items-center">
        <img src="/assets/icon-only.png" alt="Jeannot Logo" class="h-12 w-auto" />
        <span class="ml-3 text-2xl font-semibold text-slate-700">Jeannot</span>
      </div>
      <div class="hidden md:flex space-x-8">
        <a href="/#features" class="text-slate-700 hover:text-olive-600">{{ $t('nav.features') }}</a>
        <!-- <a href="#how-it-works" class="text-slate-700 hover:text-olive-600">How It Works</a> -->
        <!-- <a href="#testimonials" class="text-slate-700 hover:text-olive-600">Testimonials</a> -->
        <a href="/#download" class="text-slate-700 hover:text-olive-600">{{ $t('nav.download') }}</a>
        <a href="/support" class="text-slate-700 hover:text-olive-600" v-if="$i18n.locale === 'en'">{{ $t('nav.support')
        }}</a>
        <a href="/fr/support" class="text-slate-700 hover:text-olive-600" v-if="$i18n.locale === 'fr'">{{
          $t('nav.support')
          }} (fr)</a>

        <div class="locale-changer">
          <select v-model="$i18n.locale">
            <option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">{{
              toUppercase(locale) }}
            </option>
          </select>
        </div>
      </div>
      <div class="md:hidden">
        <button @click="mobileMenuOpen = !mobileMenuOpen" class="text-slate-700">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-menu">
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </button>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <div v-if="mobileMenuOpen" class="md:hidden bg-[#f8f5ed] px-4 py-2 shadow-lg absolute w-full z-10">
      <div class="flex flex-col space-y-3 pb-3">
        <a href="#features" class="text-slate-700 hover:text-olive-600 py-2" @click="mobileMenuOpen = false">{{
          $t('nav.features') }}</a>
        <a href="#how-it-works" class="text-slate-700 hover:text-olive-600 py-2" @click="mobileMenuOpen = false">{{
          $t('nav.howItWorks') }}</a>
        <!-- <a href="#testimonials" class="text-slate-700 hover:text-olive-600 py-2"
          @click="mobileMenuOpen = false">Testimonials</a> -->
        <a href="#download" class="text-slate-700 hover:text-olive-600 py-2" @click="mobileMenuOpen = false">{{
          $t('nav.download') }}</a>
      </div>
    </div>

    <router-view />

    <!-- Footer -->
    <footer class="bg-slate-800 text-white py-12 w-full">
      <div class=" mx-auto px-4">
        <div class="grid md:grid-cols-4 gap-8">
          <!-- Logo and About -->
          <div class="md:col-span-1">
            <div class="flex items-center mb-4">
              <img src="/assets/logo-jeannot.png" alt="Jeannot Logo" class="h-10 w-auto" />
              <span class="ml-3 text-xl font-semibold">Jeannot</span>
            </div>
            <p class="text-slate-300 text-sm">
              {{ $t('footer.description') }}
            </p>
          </div>

          <!-- Quick Links -->
          <div>
            <h3 class="text-lg font-semibold mb-4">{{ $t('footer.quickLinks') }}</h3>
            <ul class="space-y-2">
              <li><a href="/#features" class="text-slate-300 hover:text-white text-sm">{{ $t('footer.features') }}</a>
              </li>
              <!-- <li><a href="#how-it-works" class="text-slate-300 hover:text-white text-sm">How It Works</a></li>
              <li><a href="#testimonials" class="text-slate-300 hover:text-white text-sm">Testimonials</a></li> -->
              <li><a href="/#download" class="text-slate-300 hover:text-white text-sm">{{ $t('footer.download') }}</a>
              </li>
              <li><a href="/support" class="text-slate-300 hover:text-white text-sm">{{ $t('footer.support') }}</a></li>
            </ul>
          </div>

          <!-- Legal -->
          <div>
            <h3 class="text-lg font-semibold mb-4">{{ $t('footer.legal') }}</h3>
            <ul class="space-y-2">
              <li><a href="privacy-policies.html" class="text-slate-300 hover:text-white text-sm">{{
                $t('footer.privacyPolicies') }}</a>
              </li>
              <li><a href="/support" class="text-slate-300 hover:text-white text-sm" v-if="$i18n.locale === 'en'">{{
                $t('footer.support') }}</a></li>
              <li><a href="/fr/support" class="text-slate-300 hover:text-white text-sm" v-if="$i18n.locale === 'fr'">{{
                $t('footer.support') }}
                  (fr)</a></li>
              <!-- <li><a href="#" class="text-slate-300 hover:text-white text-sm">Terms of Service</a></li> -->
              <!-- <li><a href="#" class="text-slate-300 hover:text-white text-sm">Cookie Policy</a></li> -->
            </ul>
          </div>

          <!-- Contact -->
          <div>
            <h3 class="text-lg font-semibold mb-4">{{ $t('footer.contact') }}</h3>
            <ul class="space-y-2">
              <li class="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="lucide lucide-mail mr-2 mt-0.5">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <a href="mailto:contact@jeannot.app"
                  class="text-slate-300 hover:text-white text-sm">contact@jeannot.app</a>
              </li>
              <!-- <li class="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="lucide lucide-instagram mr-2 mt-0.5">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <a href="#" class="text-slate-300 hover:text-white text-sm">@jeannotapp</a>
              </li>
              <li class="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="lucide lucide-twitter mr-2 mt-0.5">
                  <path
                    d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
                <a href="#" class="text-slate-300 hover:text-white text-sm">@jeannotapp</a>
              </li> -->
            </ul>
          </div>
        </div>

        <div class="border-t border-slate-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p class="text-sm text-slate-400">
            &copy; {{ new Date().getFullYear() }} Jeannot. Gaiadet SAS {{ $t('footer.allRightsReserved') }}.
          </p>
          <!-- <div class="flex space-x-4 mt-4 md:mt-0">
            <a href="#" class="text-slate-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-facebook">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a href="#" class="text-slate-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-twitter">
                <path
                  d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </a>
            <a href="#" class="text-slate-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-instagram">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            <a href="#" class="text-slate-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-youtube">
                <path
                  d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                <path d="m10 15 5-3-5-3z" />
              </svg>
            </a>
          </div> -->
        </div>
      </div>
    </footer>
  </div>
</template>
<style scoped></style>
