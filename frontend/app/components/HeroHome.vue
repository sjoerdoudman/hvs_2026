<template>
    <div ref="heroRef" class="relative w-full min-h-[250dvh] md:min-h-[250dvh] overflow-hidden mb-sextuple-space">
        <div ref="canvasRef" class="absolute z-10 w-full h-full flex items-end justify-center bg-black">
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
                            class="fill-theme-lightpink"
                        />
                        <!-- Bottom colored section -->
                        <polygon
                            ref="secondTriangleRef"
                            :points="secondPointsOrigin"
                            class="fill-theme-lightpink"
                        />
                    </clipPath>
                </defs>
            </svg>
            <figure :class="[ isCompleted ? 'opacity-0' : 'opacity-100' ]" ref="image" class="maskedImg fixed z-10 pointer-events-none top-0 left-0 w-screen h-screen flex items-center justify-center">
                <div class="absolute left-0 top-0 w-full h-[200vh] bg-theme-darkblue"></div>
            </figure>
            <div ref="randomGridRef" class="absolute left-0 top-0 w-full h-full images p-triple-space">
                <RandomGrid v-if="images" :images="images" :seed="'homepage'"></RandomGrid>
            </div>
            <div ref="titleRef" class="relative z-20 container--md w-full text-center title-block flex justify-center">
                <p class="h3" v-text="description"></p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import gsap from 'gsap';
    import { ScrollTrigger } from "gsap/ScrollTrigger";
    import { useUIStore } from '~/stores/ui';

    const props = defineProps({
        images: {
            type: Array,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    })

    const ui = useUIStore();
    const { toggleIsEndHeroHome } = ui
    gsap.registerPlugin(ScrollTrigger);
    const heroRef = ref<HTMLDivElement | null>(null);
    const titleRef = ref<HTMLDivElement | null>(null);
    const firstTriangleRef = ref(null);
    const secondTriangleRef = ref(null);
    const randomGridRef = ref(null);
    const logoVisible = ref(false);
    const isCompleted = ref(false);
    const screenHeight = ref(0);

    const topAnchorX = 0.5 - 6
    const bottomAnchorX = 0.5 + 6
    const firsPointsOrigin = computed(() => {
        return `
            ${topAnchorX},-10
            ${topAnchorX},-10
            ${topAnchorX},-10
            0.5,0.5
            ${topAnchorX},-10
        `;
    })
    const secondPointsOrigin = computed(() => {
        return `
            ${bottomAnchorX},10
            ${bottomAnchorX},10
            0.5,0.5
            ${bottomAnchorX},10
            ${bottomAnchorX},10
        `;
    })

    const initTransition = async () => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const firstPointStepTwo = `
            -10,0
            1,-10
            10,0.5
            0.5,0.5
            -10,0.5
        `
        const secondPointStepTwo = `
            -10,1
            -10,0.5
            0.5,0.5
            10,0.5
            1,1
        `

        if (!prefersReducedMotion) {
            if (!firstTriangleRef.value && secondTriangleRef.value) return;
            screenHeight.value = window.innerHeight
            // animate first triangle
            logoVisible.value = true;
            const ftl = gsap.timeline({
                defaults: { ease: 'power2.inOut' }
            })
            gsap.to(firstTriangleRef.value, {
                attr: { points: firstPointStepTwo },
                scrollTrigger: {
                    trigger: heroRef.value,
                    scrub: true,
                    start: 'top top',
                    end: screenHeight.value * 2, // 👈 200px scroll distance
                },
            });
            // animate second triangle
            gsap.to(secondTriangleRef.value, {
                attr: { points: secondPointStepTwo },
                scrollTrigger: {
                    trigger: heroRef.value,
                    scrub: true,
                    start: 'top top',
                    end: screenHeight.value * 2, // 👈 200px scroll distance
                }
            });
            gsap.to(randomGridRef.value, {
                opacity: 0,
                scrollTrigger: {
                    trigger: heroRef.value,
                    scrub: true,
                    start: 'top -250%',
                    end: '+=50%', // 👈 200px scroll distance
                }
            });
            // add a trigger on 1000px scroll distance
            ScrollTrigger.create({
                trigger: titleRef.value,
                start: 'top 80%',
                onEnter: () => {
                    toggleIsEndHeroHome(true)
                },
                onLeaveBack: () => {
                    toggleIsEndHeroHome(false)
                }
            });

            ScrollTrigger.create({
                trigger: heroRef.value,
                start: 'bottom top',
                onEnter: () => {
                    isCompleted.value = true
                },
                onLeaveBack: () => {
                    isCompleted.value = false
                }
            });
        }
    }

    onMounted(() => {
        initTransition()
        toggleIsEndHeroHome(false)
        // if the scroll is past the heroRef element, set toggleIsEndHeroHome to true
        if (!heroRef.value) return
        toggleIsEndHeroHome(window.scrollY > heroRef.value?.offsetTop)
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