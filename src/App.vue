<script setup lang="ts">
import { ref } from 'vue';

const mobileMenuOpen = ref(false);
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
        <a href="#features" class="text-slate-700 hover:text-olive-600">Features</a>
        <!-- <a href="#how-it-works" class="text-slate-700 hover:text-olive-600">How It Works</a> -->
        <!-- <a href="#testimonials" class="text-slate-700 hover:text-olive-600">Testimonials</a> -->
        <a href="#download" class="text-slate-700 hover:text-olive-600">Download</a>
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
        <a href="#features" class="text-slate-700 hover:text-olive-600 py-2"
          @click="mobileMenuOpen = false">Features</a>
        <a href="#how-it-works" class="text-slate-700 hover:text-olive-600 py-2" @click="mobileMenuOpen = false">How It
          Works</a>
        <!-- <a href="#testimonials" class="text-slate-700 hover:text-olive-600 py-2"
          @click="mobileMenuOpen = false">Testimonials</a> -->
        <a href="#download" class="text-slate-700 hover:text-olive-600 py-2"
          @click="mobileMenuOpen = false">Download</a>
      </div>
    </div>

    <!-- Hero Section -->
    <section class="mx-auto px-4 py-12 md:py-20 flex flex-col md:flex-row items-center w-full">
      <div class="md:w-1/2 mb-10 md:mb-0">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight mb-6">
          Garden in Harmony with Nature
        </h1>
        <p class="text-xl text-slate-600 mb-8 leading-relaxed">
          Jeannot guides you to cultivate in harmony with the moon cycles, helping you grow healthier plants and harvest
          better yields.
        </p>
        <div class="flex flex-col sm:flex-row gap-4">
          <a href="#download"
            class="bg-[#7c8c64] hover:bg-[#6a7854] text-white font-medium py-3 px-6 rounded-md text-center flex items-center justify-center">
            Download Now
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="lucide lucide-arrow-right ml-2">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
          <a href="#learn-more"
            class="border border-[#7c8c64] text-[#7c8c64] font-medium py-3 px-6 rounded-md text-center">
            Learn More
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
          <h2 class="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Grow Better with Jeannot</h2>
          <p class="text-xl text-slate-600 max-w-3xl mx-auto">
            Discover how Jeannot helps you garden in harmony with nature's cycles
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
            <h3 class="text-xl font-bold text-slate-800 mb-2">Moon Phase Gardening</h3>
            <p class="text-slate-600">
              Get personalized gardening advice based on the current moon phase to optimize your planting, pruning, and
              harvesting.
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
            <h3 class="text-xl font-bold text-slate-800 mb-2">Daily Garden Tasks</h3>
            <p class="text-slate-600">
              Receive daily recommendations for garden activities based on the season, weather, and celestial
              influences.
            </p>
          </div>

          <!-- Feature 3 -->
          <!-- <div class="bg-[#f8f5ed] p-6 rounded-lg">
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
            <h3 class="text-xl font-bold text-slate-800 mb-2">Plant Encyclopedia</h3>
            <p class="text-slate-600">
              Access a comprehensive database of plants with detailed growing instructions and optimal planting times.
            </p>
          </div> -->

          <!-- Feature 4 -->
          <div class="bg-[#f8f5ed] p-6 rounded-lg">
            <div class="w-14 h-14 bg-[#7c8c64] rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-message-circle">
                <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-slate-800 mb-2">Ask Jeannot</h3>
            <p class="text-slate-600">
              Get answers to your gardening questions with our intelligent assistant that provides personalized advice.
            </p>
          </div>

          <!-- Feature 5 -->
          <!-- <div class="bg-[#f8f5ed] p-6 rounded-lg">
            <div class="w-14 h-14 bg-[#7c8c64] rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-bell">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-slate-800 mb-2">Gardening Reminders</h3>
            <p class="text-slate-600">
              Never miss the optimal time for planting or harvesting with customized notifications and reminders.
            </p>
          </div> -->

          <!-- Feature 6 -->
          <!-- <div class="bg-[#f8f5ed] p-6 rounded-lg">
            <div class="w-14 h-14 bg-[#7c8c64] rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-clipboard-list">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                <path d="M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z" />
                <path d="M12 11h4" />
                <path d="M12 16h4" />
                <path d="M8 11h.01" />
                <path d="M8 16h.01" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-slate-800 mb-2">Garden Journal</h3>
            <p class="text-slate-600">
              Track your garden's progress, record harvests, and learn from past seasons with the digital garden
              journal.
            </p>
          </div> -->
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
          <h2 class="text-3xl md:text-4xl font-bold text-slate-800 mb-4">See Jeannot in Action</h2>
          <p class="text-xl text-slate-600 max-w-3xl mx-auto">
            Explore the intuitive interface that makes gardening with lunar cycles simple
          </p>
        </div>

        <div class="flex overflow-x-auto pb-8 gap-6 snap-x">
          <div class="min-w-[280px] md:min-w-[320px] snap-center">
            <img src="/assets/jeannot-screen-1.jpg" alt="Welcome Screen" class="rounded-xl shadow-lg" />
            <!-- <p class="mt-4 text-center text-slate-700 font-medium">Jeannot</p> -->
          </div>
          <div class="min-w-[280px] md:min-w-[320px] snap-center">
            <img src="/assets/jeannot-screen-2.jpg" alt="Daily View" class="rounded-xl shadow-lg" />
            <!-- <p class="mt-4 text-center text-slate-700 font-medium">Daily Garden Tasks</p> -->
          </div>
          <div class="min-w-[280px] md:min-w-[320px] snap-center">
            <img src="/assets/jeannot-screen-3.jpg" alt="Moon Phase" class="rounded-xl shadow-lg" />
            <p class="mt-4 text-center text-slate-700 font-medium">Talk with Jeannot</p>
          </div>
          <div class="min-w-[280px] md:min-w-[320px] snap-center">
            <img src="/assets/jeannot-screen-4.jpg" alt="Plant Guide" class="rounded-xl shadow-lg" />
            <p class="mt-4 text-center text-slate-700 font-medium">Daily garden info</p>
          </div>
          <div class="min-w-[280px] md:min-w-[320px] snap-center">
            <img src="/assets/jeannot-screen-5.jpg" alt="Plant Guide" class="rounded-xl shadow-lg" />
            <p class="mt-4 text-center text-slate-700 font-medium">Schedule garden tasks</p>
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
          <h2 class="text-3xl md:text-4xl font-bold mb-4">Download Jeannot Today</h2>
          <p class="text-xl max-w-3xl mx-auto opacity-90">
            Start gardening in harmony with nature and see the difference in your garden
          </p>
        </div>

        <div class="flex flex-col sm:flex-row justify-center gap-6 max-w-md mx-auto">
          <!-- <a href="#"
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
            App Store
          </a> -->
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
            Google Play
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
              Gardening in harmony with nature and lunar cycles.
            </p>
          </div>

          <!-- Quick Links -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
            <ul class="space-y-2">
              <li><a href="#features" class="text-slate-300 hover:text-white text-sm">Features</a></li>
              <!-- <li><a href="#how-it-works" class="text-slate-300 hover:text-white text-sm">How It Works</a></li>
              <li><a href="#testimonials" class="text-slate-300 hover:text-white text-sm">Testimonials</a></li> -->
              <li><a href="#download" class="text-slate-300 hover:text-white text-sm">Download</a></li>
            </ul>
          </div>

          <!-- Legal -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Legal</h3>
            <ul class="space-y-2">
              <li><a href="#" class="text-slate-300 hover:text-white text-sm">Privacy Policy</a></li>
              <li><a href="#" class="text-slate-300 hover:text-white text-sm">Terms of Service</a></li>
              <li><a href="#" class="text-slate-300 hover:text-white text-sm">Cookie Policy</a></li>
            </ul>
          </div>

          <!-- Contact -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Contact</h3>
            <ul class="space-y-2">
              <li class="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="lucide lucide-mail mr-2 mt-0.5">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <a href="mailto:cedric.lesec+jeannot@gmail.com"
                  class="text-slate-300 hover:text-white text-sm">cedric.lesec+jeannot@gmail.com</a>
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
            &copy; {{ new Date().getFullYear() }} Jeannot. Cedric LESEC All rights reserved.
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
