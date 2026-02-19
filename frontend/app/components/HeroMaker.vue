<template>
    <div class="w-full pt-25 flex relative">
        <div ref="canvasRef" class="absolute z-1 top-0 w-full h-full flex items-center justify-center pointer-events-none">
            <svg
                width="100"
                height="100"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                class="absolute inset-0 pointer-events-none"
                aria-hidden="true"
            >
                <defs>
                    <clipPath id="hero-clip" clipPathUnits="objectBoundingBox">
                        <polygon
                            ref="firstTriangleRef"
                            :points="firsPointsOrigin"
                            class="fill-highlight"
                        />
                        <!-- Bottom colored section -->
                        <polygon
                            ref="secondTriangleRef"
                            :points="secondPointsOrigin"
                            class="fill-highlight"
                        />
                    </clipPath>
                </defs>
            </svg>
            <figure ref="image" class="maskedImg absolute pointer-events-none top-0 left-0 w-screen h-full flex items-center justify-center bg-highlight">
            </figure>
        </div>
        <div class="container--lg relative text-center pt-double-space flex flex-col gap-double-space min-h-screen">
            <div>
                <small class="uppercase font-bold" v-html="function"></small>
                <h1 class="text-highlight display uppercase">{{ title }}</h1>
            </div>
            <div class="flex justify-center">
                <figure class="aspect-3/4 min-w-[40vw]">
                    <ElementsImage :width="'300'" :height="'400'" :url="image.url" :alt="image.alt"></ElementsImage>
                </figure>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import gsap from 'gsap';
    const props = defineProps<{
        title: string;
        function: string;
        image: any
    }>()

    const firstTriangleRef = ref(null);
    const secondTriangleRef = ref(null);
    const firsPointsOrigin = computed(() => {
        return `
            -10,0
            1,-10
            10,0.5
            0.5,0.5
            -10,0.5
        `;
    })
    const secondPointsOrigin = computed(() => {
        return `
            -10,1
            -10,0.5
            0.5,0.5
            10,0.5
            1,1
        `;
    })

    const initTransition = async () => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const topAnchorX = 0.5 + 4
        const bottomAnchorX = 0.5 - 4

        const firstPointStepTwo = `
            ${topAnchorX},-10
            ${topAnchorX},-10
            ${topAnchorX},-10
            0.5,0.5
            ${topAnchorX},-10
        `
        const secondPointStepTwo = `
            ${bottomAnchorX},10
            ${bottomAnchorX},10
            0.5,0.5
            ${bottomAnchorX},10
            ${bottomAnchorX},10
        `

        if (!prefersReducedMotion) {
            if (!firstTriangleRef.value && secondTriangleRef.value) return;
            // animate first triangle
            gsap.to(firstTriangleRef.value, {
                ease: 'power2.inOut',
                duration: 1.5,
                attr: { points: firstPointStepTwo },
            });
            // animate second triangle
            gsap.to(secondTriangleRef.value, {
                ease: 'power2.inOut',
                duration: 1.5,
                attr: { points: secondPointStepTwo },
            });
        }
    }

    onMounted(() => {
        initTransition()
    })
</script>

<style scoped>
    .maskedImg {
        clip-path: url(#hero-clip);
        mask-repeat: no-repeat;
        mask-position: center;
        mask-size: 100%;
    }
</style>