<template>
    <div ref="heroRef" class="w-full h-screen">
        <div ref="canvasRef" class="fixed z-30 left-0 top-0 w-screen h-dvh flex items-center justify-center overflow-hidden" :class="[ scrolled ? 'pointer-events-none' : '' ]">
            <svg
                width="100"
                height="100"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                class="absolute inset-0 pointer-events-none rotate-45"
                aria-hidden="true"
            >
                <defs>
                    <clipPath id="hero-clip" clipPathUnits="objectBoundingBox">
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
            <figure ref="image" class="maskedImg absolute top-0 left-0 w-screen h-screen flex items-center justify-center bg-highlight">
                <ElementsImage v-if="image" :width="'300'" :height="'400'" :url="image.url" :alt="image.alt"></ElementsImage>
                <div class="absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div class="container--sm text-center flex flex-col gap-single-space" :class="[`text-theme-${theme}`]">
                        <h1 class="display text-[calc(1.5rem+2.5vw+2.5vh)] text-current uppercase" v-html="$softHyphen(title)"></h1>
                    </div>
                </div>
                <div class="absolute w-full h-auto bottom-double-space flex justify-center">
                    <button @click="scrollDown()" aria-label="Scroll naar de inhoud" :class="[ `bg-theme-${theme}` ]" class="flex items-center justify-center size-12 rounded-full cursor-pointer">
                        <span class="material-symbols-outlined text-3xl text-highlight">
                            arrow_downward
                        </span>
                    </button>
                </div>
            </figure>
        </div>
    </div>
</template>

<script setup lang="ts">
    import gsap from 'gsap';
    import { ScrollTrigger } from "gsap/ScrollTrigger";
    gsap.registerPlugin(ScrollTrigger);
    const ui = useUIStore();
    const { theme } = storeToRefs(ui)

    const props = withDefaults(defineProps<{
        title: string;
        image?: any;
        skew?: number;
        shift?: number
    }>(), {
        skew: 3,
        shift: 3
    })

    const heroRef = ref(null);
    const heroHeight = ref(0);
    const firstTriangleRef = ref(null);
    const secondTriangleRef = ref(null);
    const scrolled = ref(false)

    const firsPointsOrigin = computed(() => {
        return `
            -10,0
            1,-10
            10,${props.skew * 2.85}
            0.5,0.5
            -10,${-props.skew * 4}.5
        `;
    })
    const secondPointsOrigin = computed(() => {
        return `
            -10,1
            -10,${-props.skew * 2.85}
            0.5,0.5
            10,${props.skew * 4}.5
            1,1
        `;
    })

    const initTransition = async () => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const topAnchorX = 0.5 + props.shift
        const bottomAnchorX = 0.5 - props.shift

        const firstPointStepOne = `
            -10,0
            1,-10
            10,${props.skew * 2.5}
            0.5,0.5
            -10,${-props.skew * 3}.5
        `
        const secondPointStepOne = `
            -10,1
            -10,${-props.skew * 2.5}
            0.5,0.5
            10,${props.skew * 3}.5
            1,1
        `

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

            // only if on top of viewport
            if (window.scrollY < 10) {
                // animate first triangle
                gsap.fromTo(firstTriangleRef.value, {
                    attr: { points: firstPointStepOne },
                },{
                    duration: .5,
                    ease: 'power2.inOut',
                    attr: { points: firsPointsOrigin.value },
                });
                // animate second triangle
                gsap.fromTo(secondTriangleRef.value, {
                    attr: { points: secondPointStepOne },
                }, {
                    duration: .5,
                    ease: 'power2.inOut',
                    attr: { points: secondPointsOrigin.value },
                });
            }

            gsap.to(firstTriangleRef.value, {
                attr: { points: firstPointStepTwo },
                scrollTrigger: {
                    trigger: heroRef.value,
                    scrub: true,
                    start: 'top 10px',
                    end: '+=500', // 👈 200px scroll distance
                },
            });
            gsap.to(secondTriangleRef.value, {
                attr: { points: secondPointStepTwo },
                scrollTrigger: {
                    trigger: heroRef.value,
                    scrub: true,
                    start: 'top 10px',
                    end: '+=500', // 👈 200px scroll distance
                },
            });
        }
    }

    const scrollDown = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth"
        });
    }

    const initScrollListeners = () => {
        scrolled.value = window.scrollY > (heroHeight.value / 2)
    }

    onMounted(() => {
        initTransition()
        heroHeight.value = heroRef.value?.clientHeight
        window.addEventListener('scroll', initScrollListeners);
    })
    onUnmounted(() => {
        window.removeEventListener('scroll', initScrollListeners);
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