<template>
  <div class="grid grid-cols-6 lg:grid-cols-12 gap-x-12 gap-y-12 lg:gap-y-24">
    <div
      v-for="(item, i) in layout"
      :key="item.image.id"
      class="relative transition-all duration-700 [transform:translateY(var(--y-jitter))] lg:[transform:translateY(var(--y-jitter-lg))]"
      :class="[
        `col-span-${item.span}`,
        `col-start-${item.col}`,
        visible ? 'opacity-100' : 'opacity-0'
      ]"
      :style="{
        '--y-jitter': `${item.yJitter}px`,
        '--y-jitter-lg': `${item.yJitter * 2}px`,
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
import type { Image } from '~/types/image';

const props = defineProps<{
  images: Image[]
  seed?: number | string
}>()

const visible = ref(false)
const isLarge = ref(true)

function clampSlot(slot: { col: number; span: number }) {
  console.log('large', isLarge.value);
  const maxStart = (isLarge.value ? 12 : 6) - slot.span + 1

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

const layout = ref<any[]>([])

function initAnimation() {
  setTimeout(() => {
    visible.value = true
  }, 100)
}

const updateLayoutSize = () => {
  isLarge.value = window.innerWidth >= 1024

  let index = 0

  while (index < props.images.length) {
    const pattern = pickPattern()
    const slots = pattern?.slots || []

    slots.forEach(rawSlot => {
      if (!props.images[index]) return

      const slot = clampSlot(rawSlot)
      layout.value.push({
        image: props.images[index],
        col: slot.col,
        span: slot.span,
        yJitter: Math.floor(slot.col * 5),
        xJitter: Math.floor(slot.span * -5)
      })

      index++
    })
  }

}

onMounted(() => {
  initAnimation()
  updateLayoutSize()
  // window.addEventListener('resize', updateLayoutSize)
})

onUnmounted(() => {
  // window.removeEventListener('resize', updateLayoutSize)
})

</script>