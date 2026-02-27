<template>
  <div class="grid md:grid-cols-12 gap-x-12 lg:gap-y-24">
    <div
      v-for="(item, i) in layout"
      :key="item.image.id"
      class="relative transition-all duration-700"
      :class="[
        `col-span-${item.span}`,
        `col-start-${item.col}`,
        visible ? 'opacity-100' : 'opacity-0'
      ]"
      :style="{
        transform: `translateY(${item.yJitter}px)`,
        transitionDelay: `${i * 100}ms`
      }"
    >
      <figure class="bg-black">
        <ElementsImage :url="item.image.url" :alt="item.image.alt"/>
      </figure>
    </div>
  </div>
</template>

<script setup lang="ts">
import { mulberry32 } from '~/utils/seededRandom'
import { GRID_PATTERNS } from '~/constants/gridPatterns'

type ImageItem = {
  id: string | number
  src: string
  alt?: string
}

const props = defineProps<{
  images: ImageItem[]
  seed?: number | string
}>()

const TOTAL_COLS = 12
const visible = ref(false)

function clampSlot(slot: { col: number; span: number }) {
  const maxStart = TOTAL_COLS - slot.span + 1

  return {
    ...slot,
    col: Math.min(slot.col, maxStart)
  }
}

/**
 * Convert any seed into a number
 */
const seedValue = computed(() => {
  if (typeof props.seed === 'string') {
    return Array.from(props.seed).reduce((acc, c) => acc + c.charCodeAt(0), 0)
  }
  return props.seed ?? 1
})

const rand = mulberry32(Number(seedValue))

function pickPattern() {
  return GRID_PATTERNS[Math.floor(rand() * GRID_PATTERNS.length)]
}

/**
 * Precompute layout on setup (SSR-safe)
 */
const layout = [] as any[]

let index = 0

while (index < props.images.length) {
  const pattern = pickPattern()
  const slots = pattern?.slots || []

  slots.forEach(rawSlot => {
    if (!props.images[index]) return

    const slot = clampSlot(rawSlot)
    layout.push({
      image: props.images[index],
      col: slot.col,
      span: slot.span,
      yJitter: Math.floor(slot.col * 10),
      xJitter: Math.floor(slot.span * -10)
    })

    index++
  })
}

function initAnimation() {
  setTimeout(() => {
    visible.value = true
  }, 100)
}

onMounted(() => {
  initAnimation()
})

</script>