<template>
    <div ref="container">
        <svg
            width="100"
            height="100"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            class="absolute inset-0 pointer-events-none"
            aria-hidden="true"
        >
            <defs>
                <clipPath id="quote-clip" clipPathUnits="objectBoundingBox">
                    <polygon
                        ref="firstTriangleRef"
                        :points="firsPointsOrigin"
                    />
                    <!-- Bottom colored section -->
                    <polygon
                        ref="secondTriangleRef"
                        :points="secondPointsOrigin"
                    />
                </clipPath>
            </defs>
        </svg>
        <div class="container--lg relative z-2 h-dvh flex items-center justify-center">
            <blockquote class="sticky top-1/2 -translate-y-1/2 z-2">
                <div class="content-column text-center">
                    <p class="h2 text-theme-darkblue" v-html="data?.quote"></p>
                </div>
            </blockquote>
        </div>
        <figure class="fixed pointer-events-none left-0 top-0 w-screen h-screen z-1 maskedImg bg-theme-lightpink w-full aspect-video flex items-center justify-center"></figure>
    </div>
</template>

<script setup lang="ts">
    import gsap from 'gsap';
    import { ScrollTrigger } from "gsap/ScrollTrigger";
    gsap.registerPlugin(ScrollTrigger);
    const firstTriangleRef = ref(null);
    const secondTriangleRef = ref(null);
    const container = ref(null);
    const origin = 0.5

    const props = withDefaults(defineProps<{
        data?: any;
        skew?: number}>(),
    {
        data: null,
        skew: 4
    })

    const firsPointsOrigin = computed(() => {
        const topAnchorX = origin + props.skew
        return `
            ${topAnchorX},-10
            ${topAnchorX},-10
            ${topAnchorX},-10
            0.5,0.5
            ${topAnchorX},-10
        `;
    })
    const secondPointsOrigin = computed(() => {
        const bottomAnchorX = origin - props.skew
        return `
            ${bottomAnchorX},10
            ${bottomAnchorX},10
            0.5,0.5
            ${bottomAnchorX},10
            ${bottomAnchorX},10
        `;
    })

    const firstPointStepTwo = `
        -10,0
        1,-10
        10,5.5
        0.5,0.5
        -10,-5.5
    `
    const secondPointStepTwo = `
        -10,1
        -10,-5.5
        0.5,0.5
        10,5.5
        1,1
    `

    const initTransition = () => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!prefersReducedMotion) {
            if (!container.value && !firstTriangleRef.value && secondTriangleRef.value) return;
            // animate first triangle
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container.value,
                    scrub: 0.5,
                    start: 'top 50%',
                    end: 'bottom 40%', // controls how long the full cycle lasts
                }
            })

            // ORIGIN → STEP TWO
            tl.to(firstTriangleRef.value, {
                attr: { points: firstPointStepTwo },
            }, 0)

            tl.to(secondTriangleRef.value, {
                attr: { points: secondPointStepTwo },
            }, 0)

            // STEP TWO → ORIGIN
            tl.to(firstTriangleRef.value, {
                attr: { points: firsPointsOrigin.value },
            }, 1)

            tl.to(secondTriangleRef.value, {
                attr: { points: secondPointsOrigin.value },
            }, 1)
        }
    }

    onMounted(() => {
        initTransition()
    })
</script>

<style>
    .maskedImg {
        clip-path: url(#quote-clip);
        mask-repeat: no-repeat;
        mask-position: center;
        mask-size: 100%;
    }
</style>