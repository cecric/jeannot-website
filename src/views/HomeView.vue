<script setup lang="ts">
</script>

<template>
  <main><!-- Hero Section -->
    <section class="mx-auto px-4 py-12 md:py-20 flex flex-col md:flex-row items-center w-full">
      <div class="md:w-1/2 mb-10 md:mb-0">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight mb-6">
          {{ $t('home.title') }}
        </h1>
        <p class="text-xl text-slate-600 mb-8 leading-relaxed">
          {{ $t('home.description') }}
        </p>
        <div class="flex flex-col sm:flex-row gap-4">
          <a target="_blank" href="https://apps.apple.com/us/app/jeannot/id6749574145"
            class="bg-black hover:bg-gray-900 text-white font-medium py-3 px-6 rounded-md text-center flex items-center justify-center transition-colors duration-200">
            {{ $t('home.downloadSection.store.ios') }}
            <svg viewBox="0 0 24 24" style="height: 24px; width: 24px;" class="ml-2">
              <path fill="currentColor"
                d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z">
              </path>
            </svg>
          </a>
          <a target="_blank" href="https://play.google.com/store/apps/details?id=com.jeannot.app"
            class="bg-[#3ddc84] hover:bg-[#25c06d] text-white font-medium py-3 px-6 rounded-md text-center flex items-center justify-center transition-colors duration-200">
            {{ $t('home.downloadSection.store.android') }}
            <svg viewBox="0 0 24 24" style="height: 24px; width: 24px;" class="ml-2">
              <path fill="currentColor"
                d="M16.61 15.15C16.15 15.15 15.77 14.78 15.77 14.32S16.15 13.5 16.61 13.5H16.61C17.07 13.5 17.45 13.86 17.45 14.32C17.45 14.78 17.07 15.15 16.61 15.15M7.41 15.15C6.95 15.15 6.57 14.78 6.57 14.32C6.57 13.86 6.95 13.5 7.41 13.5H7.41C7.87 13.5 8.24 13.86 8.24 14.32C8.24 14.78 7.87 15.15 7.41 15.15M16.91 10.14L18.58 7.26C18.67 7.09 18.61 6.88 18.45 6.79C18.28 6.69 18.07 6.75 18 6.92L16.29 9.83C14.95 9.22 13.5 8.9 12 8.91C10.47 8.91 9 9.24 7.73 9.82L6.04 6.91C5.95 6.74 5.74 6.68 5.57 6.78C5.4 6.87 5.35 7.08 5.44 7.25L7.1 10.13C4.25 11.69 2.29 14.58 2 18H22C21.72 14.59 19.77 11.7 16.91 10.14H16.91Z">
              </path>
            </svg>
          </a>
          <!-- <a target="_blank" href="https://apps.apple.com/us/app/jeannot/id6749574145"
            class="bg-[#7c8c64] hover:bg-[#6a7854] text-white font-medium py-3 px-6 rounded-md text-center flex items-center justify-center">
            {{ $t('home.downloadSection.store.ios') }}
            <svg viewBox="0 0 24 24" style="height: 24px; width: 24px;" class="ml-2">
              <path fill="currentColor"
                d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z">
              </path>
            </svg>
          </a>
          <a target="_blank" href="https://play.google.com/store/apps/details?id=com.jeannot.app"
            class="bg-[#7c8c64] hover:bg-[#6a7854] text-white font-medium py-3 px-6 rounded-md text-center flex items-center justify-center">
            {{ $t('home.downloadSection.store.android') }}
            <svg viewBox="0 0 24 24" style="height: 24px; width: 24px;" class="ml-2">
              <path fill="currentColor"
                d="M16.61 15.15C16.15 15.15 15.77 14.78 15.77 14.32S16.15 13.5 16.61 13.5H16.61C17.07 13.5 17.45 13.86 17.45 14.32C17.45 14.78 17.07 15.15 16.61 15.15M7.41 15.15C6.95 15.15 6.57 14.78 6.57 14.32C6.57 13.86 6.95 13.5 7.41 13.5H7.41C7.87 13.5 8.24 13.86 8.24 14.32C8.24 14.78 7.87 15.15 7.41 15.15M16.91 10.14L18.58 7.26C18.67 7.09 18.61 6.88 18.45 6.79C18.28 6.69 18.07 6.75 18 6.92L16.29 9.83C14.95 9.22 13.5 8.9 12 8.91C10.47 8.91 9 9.24 7.73 9.82L6.04 6.91C5.95 6.74 5.74 6.68 5.57 6.78C5.4 6.87 5.35 7.08 5.44 7.25L7.1 10.13C4.25 11.69 2.29 14.58 2 18H22C21.72 14.59 19.77 11.7 16.91 10.14H16.91Z">
              </path>
            </svg>
          </a> -->
          <a href="#features"
            class="border border-[#7c8c64] text-[#7c8c64] font-medium py-3 px-6 rounded-md text-center">
            {{ $t('home.learnMore') }}
          </a>
        </div>
      </div>
      <div class="md:w-1/2 flex justify-center">
        <!-- /assets/app-screen.png -->
        <img src="/assets/jeannot-banner-illus2.webp" alt="Jeannot App"
          class="max-w-full h-auto rounded-xl shadow-lg" />
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="bg-white py-16 md:py-24">
      <div class=" mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-slate-800 mb-4">{{ $t('home.features.title') }}</h2>
          <p class="text-xl text-slate-600 max-w-3xl mx-auto">
            {{ $t('home.features.description') }}
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div class="bg-[#f8f5ed] p-6 rounded-lg">
            <div class="w-14 h-14 bg-[#7c8c64] rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-moon">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-slate-800 mb-2">{{ $t('home.features.list[0].title') }}</h3>
            <p class="text-slate-600">
              {{ $t('home.features.list[0].description') }}
            </p>
          </div>

          <!-- Feature 2 -->
          <div class="bg-[#f8f5ed] p-6 rounded-lg">
            <div class="w-14 h-14 bg-[#7c8c64] rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-calendar">
                <path d="M8 2v4" />
                <path d="M16 2v4" />
                <rect width="18" height="18" x="3" y="4" rx="2" />
                <path d="M3 10h18" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-slate-800 mb-2">{{ $t('home.features.list[1].title') }}</h3>
            <p class="text-slate-600">
              {{ $t('home.features.list[1].description') }}
            </p>
          </div>

          <!-- Feature 3 -->
          <div class="bg-[#f8f5ed] p-6 rounded-lg">
            <div class="w-14 h-14 bg-[#7c8c64] rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-sprout">
                <path d="M7 20h10" />
                <path d="M10 20c5.5-2.5.8-6.4 3-10" />
                <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
                <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-slate-800 mb-2">{{ $t('home.features.list[2].title') }}</h3>
            <p class="text-slate-600">
              {{ $t('home.features.list[2].description') }}
            </p>
          </div>

          <!-- Feature 4 -->
          <div class="bg-[#f8f5ed] p-6 rounded-lg">
            <div class="w-14 h-14 bg-[#7c8c64] rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-message-circle">
                <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-slate-800 mb-2">{{ $t('home.features.list[3].title') }}</h3>
            <p class="text-slate-600">
              {{ $t('home.features.list[3].description') }}
            </p>
          </div>

          <!-- Feature 5 -->
          <div class="bg-[#f8f5ed] p-6 rounded-lg">
            <div class="w-14 h-14 bg-[#7c8c64] rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-bell">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-slate-800 mb-2">{{ $t('home.features.list[4].title') }}</h3>
            <p class="text-slate-600">
              {{ $t('home.features.list[4].description') }}
            </p>
          </div>

          <!-- Feature 6 -->
          <div class="bg-[#f8f5ed] p-6 rounded-lg">
            <div class="w-14 h-14 bg-[#7c8c64] rounded-full flex items-center justify-center mb-4">
              <svg viewBox="0 0 24 24" height="24" width="24">
                <path fill="white"
                  d="M12.75,4.47C15.1,5.5 16.35,8.03 15.92,10.46C17.19,11.56 18,13.19 18,15V15.17C18.31,15.06 18.65,15 19,15A3,3 0 0,1 22,18A3,3 0 0,1 19,21H17C17,21 16,21 16,20C16,19 17,19 17,19H19A1,1 0 0,0 20,18A1,1 0 0,0 19,17H16V15A4,4 0 0,0 12,11A4,4 0 0,0 8,15H6A2,2 0 0,0 4,17A2,2 0 0,0 6,19H7C7,19 8,19 8,20C8,21 7,21 7,21H6A4,4 0 0,1 2,17A4,4 0 0,1 6,13H6.27C5,11.45 4.6,9.24 5.5,7.25C6.72,4.5 9.97,3.24 12.75,4.47M11.93,6.3C10.16,5.5 8.09,6.31 7.31,8.07C6.85,9.09 6.93,10.22 7.41,11.13C8.5,9.83 10.16,9 12,9C12.7,9 13.38,9.12 14,9.34C13.94,8.06 13.18,6.86 11.93,6.3M13.55,2.63C13,2.4 12.45,2.23 11.88,2.12L14.37,0.82L15.27,3.71C14.76,3.29 14.19,2.93 13.55,2.63M6.09,3.44C5.6,3.79 5.17,4.19 4.8,4.63L4.91,1.82L7.87,2.5C7.25,2.71 6.65,3.03 6.09,3.44M18,8.71C17.91,8.12 17.78,7.55 17.59,7L19.97,8.5L17.92,10.73C18.03,10.08 18.05,9.4 18,8.71M3.04,10.3C3.11,10.9 3.25,11.47 3.43,12L1.06,10.5L3.1,8.28C3,8.93 2.97,9.61 3.04,10.3M12,18.91C12.59,19.82 13,20.63 13,21A1,1 0 0,1 12,22A1,1 0 0,1 11,21C11,20.63 11.41,19.82 12,18.91M12,15.62C12,15.62 9,19 9,21A3,3 0 0,0 12,24A3,3 0 0,0 15,21C15,19 12,15.62 12,15.62Z">
                </path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-slate-800 mb-2">{{ $t('home.features.list[5].title') }}</h3>
            <p class="text-slate-600">
              {{ $t('home.features.list[5].description') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <!-- <section id="how-it-works" class="py-16 md:py-24">
      <div class=" mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-slate-800 mb-4">How Jeannot Works</h2>
          <p class="text-xl text-slate-600 max-w-3xl mx-auto">
            Discover the science behind gardening with lunar cycles
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div class="text-center">
            <div
              class="w-20 h-20 bg-[#7c8c64] rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
              1</div>
            <h3 class="text-xl font-bold text-slate-800 mb-3">Track Moon Phases</h3>
            <p class="text-slate-600">
              Jeannot tracks the current moon phase and provides gardening recommendations based on lunar influence.
            </p>
          </div>

          <div class="text-center">
            <div
              class="w-20 h-20 bg-[#7c8c64] rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
              2</div>
            <h3 class="text-xl font-bold text-slate-800 mb-3">Get Daily Tasks</h3>
            <p class="text-slate-600">
              Receive personalized daily gardening tasks optimized for the current day's celestial influences.
            </p>
          </div>

          <div class="text-center">
            <div
              class="w-20 h-20 bg-[#7c8c64] rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
              3</div>
            <h3 class="text-xl font-bold text-slate-800 mb-3">Grow Successfully</h3>
            <p class="text-slate-600">
              Follow Jeannot's guidance to grow healthier plants and achieve better harvests in harmony with nature.
            </p>
          </div>
        </div>
      </div>
    </section> -->

    <!-- App Screenshots -->
    <section class="bg-white py-16 md:py-24">
      <div class=" mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-slate-800 mb-4">{{ $t('home.seeJeannotInAction.title') }}</h2>
          <p class="text-xl text-slate-600 max-w-3xl mx-auto">
            {{ $t('home.seeJeannotInAction.description') }}
          </p>
        </div>

        <div class="flex overflow-x-auto pb-8 gap-6 snap-x">
          <div class="min-w-[280px] md:min-w-[320px] snap-center">
            <img :src="`/assets/${$i18n.locale}/preview-0.png`" alt="Welcome Screen" class="rounded-xl shadow-lg" />
            <!-- <p class="mt-4 text-center text-slate-700 font-medium">Jeannot</p> -->
          </div>
          <div class="min-w-[280px] md:min-w-[320px] snap-center">
            <img :src="`/assets/${$i18n.locale}/preview-1.png`" alt="Daily View" class="rounded-xl shadow-lg" />
            <!-- <p class="mt-4 text-center text-slate-700 font-medium">Daily Garden Tasks</p> -->
          </div>
          <div class="min-w-[280px] md:min-w-[320px] snap-center">
            <img :src="`/assets/${$i18n.locale}/preview-2.png`" alt="Moon Phase" class="rounded-xl shadow-lg" />
          </div>
          <div class="min-w-[280px] md:min-w-[320px] snap-center">
            <img :src="`/assets/${$i18n.locale}/preview-3.png`" alt="Plant Guide" class="rounded-xl shadow-lg" />
          </div>
          <div class="min-w-[280px] md:min-w-[320px] snap-center">
            <img :src="`/assets/${$i18n.locale}/preview-4.png`" alt="Plant Guide" class="rounded-xl shadow-lg" />
          </div>
          <div class="min-w-[280px] md:min-w-[320px] snap-center">
            <img :src="`/assets/${$i18n.locale}/preview-5.png`" alt="Plant Guide" class="rounded-xl shadow-lg" />
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <!-- <section id="testimonials" class="py-16 md:py-24 bg-[#f8f5ed]">
      <div class=" mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-slate-800 mb-4">What Gardeners Say</h2>
          <p class="text-xl text-slate-600 max-w-3xl mx-auto">
            Join thousands of gardeners who have transformed their gardens with Jeannot
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div class="bg-white p-6 rounded-lg shadow-sm">
            <div class="flex items-center mb-4">
              <div class="text-[#7c8c64]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"
                  class="inline-block">
                  <path
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"
                  class="inline-block">
                  <path
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"
                  class="inline-block">
                  <path
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"
                  class="inline-block">
                  <path
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"
                  class="inline-block">
                  <path
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                </svg>
              </div>
            </div>
            <p class="text-slate-700 mb-4">
              "Since I started using Jeannot, my vegetable garden has been thriving. The moon phase gardening advice has
              made a noticeable difference in my harvests!"
            </p>
            <p class="font-medium text-slate-800">Sarah T., Urban Gardener</p>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-sm">
            <div class="flex items-center mb-4">
              <div class="text-[#7c8c64]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"
                  class="inline-block">
                  <path
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"
                  class="inline-block">
                  <path
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"
                  class="inline-block">
                  <path
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"
                  class="inline-block">
                  <path
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"
                  class="inline-block">
                  <path
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                </svg>
              </div>
            </div>
            <p class="text-slate-700 mb-4">
              "I was skeptical about moon phase gardening at first, but Jeannot has made me a believer. The daily task
              recommendations are spot on!"
            </p>
            <p class="font-medium text-slate-800">Michael R., Hobby Gardener</p>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-sm">
            <div class="flex items-center mb-4">
              <div class="text-[#7c8c64]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"
                  class="inline-block">
                  <path
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"
                  class="inline-block">
                  <path
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"
                  class="inline-block">
                  <path
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"
                  class="inline-block">
                  <path
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"
                  class="inline-block">
                  <path
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                </svg>
              </div>
            </div>
            <p class="text-slate-700 mb-4">
              "The 'Ask Jeannot' feature has been a game-changer for me. It's like having a master gardener in my pocket
              at all times!"
            </p>
            <p class="font-medium text-slate-800">Emma L., Beginner Gardener</p>
          </div>
        </div>
      </div>
    </section> -->

    <!-- Download Section -->
    <section id="download" class="py-16 md:py-24 bg-[#7c8c64] text-white w-full">
      <div class=" mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">{{ $t('home.downloadSection.title') }}</h2>
          <p class="text-xl max-w-3xl mx-auto opacity-90">
            {{ $t('home.downloadSection.description') }}
          </p>
        </div>

        <div class="flex flex-col sm:flex-row justify-center gap-6 max-w-md mx-auto">
          <a href="https://apps.apple.com/us/app/jeannot/id6749574145" target="_blank"
            class="bg-white text-[#7c8c64] hover:bg-opacity-90 py-3 px-6 rounded-md text-center flex items-center justify-center">
            <svg class="mr-2" width="20px" height="20px" viewBox="-1.5 0 20 20" version="1.1"
              xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="Dribbble-Light-Preview" transform="translate(-102.000000, -7439.000000)" fill="#000000">
                  <g id="icons" transform="translate(56.000000, 160.000000)">
                    <path
                      d="M57.5708873,7282.19296 C58.2999598,7281.34797 58.7914012,7280.17098 58.6569121,7279 C57.6062792,7279.04 56.3352055,7279.67099 55.5818643,7280.51498 C54.905374,7281.26397 54.3148354,7282.46095 54.4735932,7283.60894 C55.6455696,7283.69593 56.8418148,7283.03894 57.5708873,7282.19296 M60.1989864,7289.62485 C60.2283111,7292.65181 62.9696641,7293.65879 63,7293.67179 C62.9777537,7293.74279 62.562152,7295.10677 61.5560117,7296.51675 C60.6853718,7297.73474 59.7823735,7298.94772 58.3596204,7298.97372 C56.9621472,7298.99872 56.5121648,7298.17973 54.9134635,7298.17973 C53.3157735,7298.17973 52.8162425,7298.94772 51.4935978,7298.99872 C50.1203933,7299.04772 49.0738052,7297.68074 48.197098,7296.46676 C46.4032359,7293.98379 45.0330649,7289.44985 46.8734421,7286.3899 C47.7875635,7284.87092 49.4206455,7283.90793 51.1942837,7283.88393 C52.5422083,7283.85893 53.8153044,7284.75292 54.6394294,7284.75292 C55.4635543,7284.75292 57.0106846,7283.67793 58.6366882,7283.83593 C59.3172232,7283.86293 61.2283842,7284.09893 62.4549652,7285.8199 C62.355868,7285.8789 60.1747177,7287.09489 60.1989864,7289.62485"
                      id="apple-[#173]">

                    </path>
                  </g>
                </g>
              </g>
            </svg>
            {{ $t('home.downloadSection.store.ios') }}
          </a>
          <a href="https://play.google.com/store/apps/details?id=com.jeannot.app" target="_blank"
            class="bg-white text-[#7c8c64] hover:bg-opacity-90 py-3 px-6 rounded-md text-center flex items-center justify-center">
            <svg fill="#000000" class="mr-2" version="1.1" xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink" width="20px" height="20px" viewBox="0 0 512 512"
              enable-background="new 0 0 512 512" xml:space="preserve">
              <g id="b75708d097f2188dff6617b0f00f7c43">
                <path display="inline" d="M120.606,169h270.788v220.663c0,13.109-10.628,23.737-23.721,23.737h-27.123v67.203
		c0,17.066-13.612,30.897-30.415,30.897c-16.846,0-30.438-13.831-30.438-30.897v-67.203h-47.371v67.203
		c0,17.066-13.639,30.897-30.441,30.897c-16.799,0-30.437-13.831-30.437-30.897v-67.203h-27.099
		c-13.096,0-23.744-10.628-23.744-23.737V169z M67.541,167.199c-16.974,0-30.723,13.963-30.723,31.2v121.937
		c0,17.217,13.749,31.204,30.723,31.204c16.977,0,30.723-13.987,30.723-31.204V198.399
		C98.264,181.162,84.518,167.199,67.541,167.199z M391.395,146.764H120.606c3.342-38.578,28.367-71.776,64.392-90.998
		l-25.746-37.804c-3.472-5.098-2.162-12.054,2.946-15.525c5.102-3.471,12.044-2.151,15.533,2.943l28.061,41.232
		c15.558-5.38,32.446-8.469,50.208-8.469c17.783,0,34.672,3.089,50.229,8.476L334.29,5.395c3.446-5.108,10.41-6.428,15.512-2.957
		c5.108,3.471,6.418,10.427,2.946,15.525l-25.725,37.804C363.047,74.977,388.055,108.175,391.395,146.764z M213.865,94.345
		c0-8.273-6.699-14.983-14.969-14.983c-8.291,0-14.99,6.71-14.99,14.983c0,8.269,6.721,14.976,14.99,14.976
		S213.865,102.614,213.865,94.345z M329.992,94.345c0-8.273-6.722-14.983-14.99-14.983c-8.291,0-14.97,6.71-14.97,14.983
		c0,8.269,6.679,14.976,14.97,14.976C323.271,109.321,329.992,102.614,329.992,94.345z M444.48,167.156
		c-16.956,0-30.744,13.984-30.744,31.222v121.98c0,17.238,13.788,31.226,30.744,31.226c16.978,0,30.701-13.987,30.701-31.226
		v-121.98C475.182,181.14,461.458,167.156,444.48,167.156z">

                </path>

              </g>

            </svg>
            {{ $t('home.downloadSection.store.android') }}
          </a>
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <!-- <section class="py-16 md:py-24 w-full">
      <div class=" mx-auto px-4">
        <div class="max-w-3xl mx-auto bg-[#f8f5ed] p-8 md:p-12 rounded-xl">
          <div class="text-center mb-8">
            <h2 class="text-2xl md:text-3xl font-bold text-slate-800 mb-4">Join Our Gardening Community</h2>
            <p class="text-slate-600">
              Subscribe to receive gardening tips, seasonal guides, and exclusive offers
            </p>
          </div>

          <form class="max-w-md mx-auto">
            <div class="flex flex-col sm:flex-row gap-3">
              <input type="email" placeholder="Enter your email"
                class="flex-1 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7c8c64] focus:border-transparent"
                required />
              <button type="submit" class="bg-[#7c8c64] hover:bg-[#6a7854] text-white font-medium py-3 px-6 rounded-md">
                Subscribe
              </button>
            </div>
            <p class="text-xs text-slate-500 mt-3 text-center sm:text-left">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </form>
        </div>
      </div>
    </section> -->
  </main>
</template>
