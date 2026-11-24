<script setup lang="ts">
/** A browser window drawn in CSS around a wide screenshot of the web version. */
defineProps<{ src: string; alt: string; address: string }>()
</script>

<template>
  <div class="overflow-hidden rounded-2xl bg-card shadow-lift ring-1 ring-ink/10">
    <div class="flex items-center gap-3 border-b border-line bg-paper-deep px-4 py-2.5">
      <span class="flex gap-1.5" aria-hidden="true">
        <span class="size-2.5 rounded-full bg-root/70"></span>
        <span class="size-2.5 rounded-full bg-[#e2b93b]/80"></span>
        <span class="size-2.5 rounded-full bg-leaf/60"></span>
      </span>
      <span
        class="mx-auto flex min-w-0 max-w-xs flex-1 items-center justify-center gap-1.5 rounded-full bg-card px-3 py-1 text-xs font-bold text-ink-soft ring-1 ring-line"
      >
        <svg width="11" height="11" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
          <path
            d="M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM96,56a32,32,0,0,1,64,0V80H96ZM208,208H48V96H208V208Z"
          />
        </svg>
        <span class="truncate">{{ address }}</span>
      </span>
      <span class="w-10" aria-hidden="true"></span>
    </div>
    <img
      :src="src"
      :alt="alt"
      width="1600"
      height="1000"
      loading="lazy"
      decoding="async"
      class="block h-auto w-full"
    />
  </div>
</template>
