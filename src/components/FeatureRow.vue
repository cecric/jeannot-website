<script setup lang="ts">
import type { Component } from 'vue'
import { PhCheck } from '@phosphor-icons/vue'
import DeviceFrame from '@/components/DeviceFrame.vue'
import type { FeatureCopy } from '@/i18n/lang'

/**
 * One feature of the app: its text on one side, and on the other a small stage with two phone
 * screens, pieces of interface and labels floating around them, over an engraving.
 */
defineProps<{
  id: string
  copy: FeatureCopy
  accent: 'sage' | 'leaf' | 'root' | 'fruit' | 'flower'
  icon: Component
  /** The front and back screens, and the video played in the front one when there is one. */
  screens: [string, string]
  video?: string
  /** Pieces of interface floated over the stage: the first over the back screen, the second over the front one. */
  snippets: string[]
  /** The icons of the two floating labels, matching `copy.chips`. */
  chipIcons: [Component, Component]
  engraving: string
  /** Put the stage on the left on wide screens. */
  flip?: boolean
}>()
</script>

<template>
  <article
    :id="id"
    class="grid scroll-mt-24 items-center gap-10 lg:grid-cols-2 lg:gap-16"
    :class="`accent-${accent}`"
  >
    <div :class="flip ? 'lg:order-2' : ''">
      <p class="eyebrow">
        <span class="dot"><component :is="icon" :size="14" weight="bold" aria-hidden="true" /></span>
        {{ copy.eyebrow }}
      </p>
      <h3 class="mt-5 text-3xl leading-[1.08] sm:text-4xl lg:text-[2.75rem]">
        {{ copy.title[0] }}<em class="hl">{{ copy.title[1] }}</em>
      </h3>
      <p class="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">{{ copy.text }}</p>
      <ul class="mt-6 space-y-3">
        <li v-for="point in copy.points" :key="point" class="flex gap-3 font-semibold">
          <span
            class="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-(--accent-light) text-(--accent-ink)"
          >
            <PhCheck :size="14" weight="bold" aria-hidden="true" />
          </span>
          <span>{{ point }}</span>
        </li>
      </ul>
    </div>

    <div class="stage" :class="flip ? 'lg:order-1' : ''">
      <span class="stage-wash" aria-hidden="true"></span>
      <img
        :src="engraving"
        alt=""
        aria-hidden="true"
        width="560"
        height="560"
        loading="lazy"
        decoding="async"
        class="engraving stage-engraving"
      />
      <DeviceFrame class="stage-back" :src="screens[1]" :alt="copy.alts[1]" />
      <DeviceFrame class="stage-front" :src="screens[0]" :alt="copy.alts[0]" :video="video" />
      <img
        v-for="(snippet, index) in snippets"
        :key="snippet"
        :src="snippet"
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        class="stage-snippet"
        :class="`stage-snippet-${index + 1}`"
      />
      <span class="float-chip stage-chip stage-chip-1" aria-hidden="true">
        <span class="dot"><component :is="chipIcons[0]" :size="16" weight="bold" /></span>
        {{ copy.chips[0] }}
      </span>
      <span class="float-chip stage-chip stage-chip-2" aria-hidden="true">
        <span class="dot"><component :is="chipIcons[1]" :size="16" weight="bold" /></span>
        {{ copy.chips[1] }}
      </span>
    </div>
  </article>
</template>

<style scoped>
.stage {
  position: relative;
  width: 100%;
  max-width: 33rem;
  aspect-ratio: 1 / 1.02;
  margin-inline: auto;
}

.stage-wash {
  position: absolute;
  inset: 6% 2% 4%;
  border-radius: 2.5rem;
  background: radial-gradient(
    closest-side,
    color-mix(in oklab, var(--accent-light) 85%, transparent),
    transparent
  );
}

.stage-engraving {
  position: absolute;
  right: -6%;
  bottom: -4%;
  width: 58%;
  height: auto;
  opacity: 0.2;
}

.stage-back {
  position: absolute;
  left: 5%;
  top: 9%;
  width: 39%;
  transform: rotate(-5deg);
}

.stage-front {
  position: absolute;
  right: 9%;
  top: 0;
  width: 45.5%;
  transform: rotate(3deg);
}

.stage-snippet {
  position: absolute;
  width: 54%;
  height: auto;
  border-radius: 0.9rem;
  background: #fff;
  box-shadow: var(--shadow-lift);
}
.stage-snippet-1 {
  left: -1%;
  bottom: 9%;
  transform: rotate(-3deg);
}
.stage-snippet-2 {
  right: -2%;
  top: 19%;
  width: 46%;
  transform: rotate(4deg);
}

.stage-chip {
  position: absolute;
}
.stage-chip-1 {
  left: 0;
  top: 3%;
  transform: rotate(-4deg);
}
.stage-chip-2 {
  right: 0;
  bottom: 4%;
  transform: rotate(3deg);
}

@media (max-width: 30rem) {
  .stage-chip {
    font-size: 0.78rem;
    padding: 0.3rem 0.7rem 0.3rem 0.3rem;
    gap: 0.4rem;
  }
  .stage-chip :deep(.dot),
  .stage-chip > .dot {
    width: 1.5rem;
    height: 1.5rem;
  }
}
</style>
