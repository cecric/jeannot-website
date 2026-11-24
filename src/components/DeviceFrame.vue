<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * A phone drawn in CSS around a screenshot of the app, or around a video with that screenshot
 * as its poster. The video only plays while it is on screen, and never by itself for someone
 * who asked their system for less motion.
 */
defineProps<{
  /** The screenshot, also the poster of the video. */
  src: string
  alt: string
  video?: string
  /** Above the fold: load at once instead of when it scrolls near. */
  eager?: boolean
}>()

const player = ref<HTMLVideoElement | null>(null)
let observer: IntersectionObserver | null = null

onMounted(() => {
  const element = player.value
  if (element === null) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    element.controls = true
    return
  }
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting === true) void element.play().catch(() => undefined)
      else element.pause()
    },
    { threshold: 0.3 },
  )
  observer.observe(element)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div class="device">
    <div class="device-screen">
      <video
        v-if="video"
        ref="player"
        :poster="src"
        :aria-label="alt"
        width="660"
        height="1430"
        muted
        loop
        playsinline
        preload="none"
      >
        <source :src="video" type="video/mp4" />
      </video>
      <img
        v-else
        :src="src"
        :alt="alt"
        width="660"
        height="1430"
        :loading="eager ? 'eager' : 'lazy'"
        decoding="async"
      />
    </div>
    <span class="device-island" aria-hidden="true"></span>
  </div>
</template>

<style scoped>
.device {
  position: relative;
  aspect-ratio: 1290 / 2796;
  padding: 3.4%;
  border-radius: 17% / 7.9%;
  background: linear-gradient(150deg, #585d6d 0%, #3a3f4f 22%, #1b1e28 60%, #30343f 100%);
  box-shadow:
    inset 0 0 0 1px rgb(255 255 255 / 0.12),
    0 2px 4px rgb(36 49 40 / 0.1),
    0 30px 60px -18px rgb(36 49 40 / 0.45);
}

.device-screen {
  position: relative;
  height: 100%;
  overflow: hidden;
  border-radius: 14.5% / 6.6%;
  background: #0b0c10;
  /* Safari clips a video to rounded corners only inside its own compositing layer. */
  transform: translateZ(0);
}

.device-screen img,
.device-screen video {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
}

.device-island {
  position: absolute;
  top: 2.5%;
  left: 50%;
  width: 27%;
  aspect-ratio: 3.4;
  transform: translateX(-50%);
  border-radius: 999px;
  background: #0b0c10;
}
</style>
