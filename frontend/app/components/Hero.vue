<template>
    <div ref="heroRef" class="w-full h-[120vh] flex relative mb-[25vh] md:mb-sextuple-space">
        <div class="fixed w-screen h-auto top-[90vh] flex justify-center z-40">
            <button v-if="!animationComplete" @click="scrollDown()" aria-label="Scroll naar de inhoud" :class="[ `bg-theme-${theme}` ]" class="flex items-center justify-center size-12 rounded-full cursor-pointer">
                <span class="material-symbols-outlined text-3xl text-highlight">
                    arrow_downward
                </span>
            </button>
        </div>
        <div ref="canvasRef" class="fixed z-30 left-0 top-0 w-screen h-dvh flex items-center justify-center overflow-hidden pointer-events-none">
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
                        <polygon
                            ref="secondTriangleRef"
                            :points="secondPointsOrigin"
                        />
                    </clipPath>
                </defs>
            </svg>
            <figure :class="[ reverse ? 'rotate-x-180' : '' ]" ref="image" class="maskedImg absolute pointer-events-none left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-[105vw] min-h-[105vh] aspect-square flex items-center justify-center bg-highlight">
                <ElementsImage v-if="image" :width="'300'" :height="'400'" :url="image.url" :alt="image.alt"></ElementsImage>
                <div v-else class="absolute z-10 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
                    <div class="container--sm text-center">
                        <h1 aria-hidden :class="[`text-theme-${theme}`, reverse ? 'rotate-x-180' : '']" class="display text-current uppercase" v-html="$softHyphen(title)"></h1>
                    </div>
                </div>
            </figure>
        </div>
        <div class="container--sm text-center relative">
            <div class="sticky top-[50vh]">
                <h1 :style="{ transform: `translateY(${-titleShift}px)` }" ref="titleRef" :class="[ animationComplete ? '' : 'opacity-0' ]" class="display text-highlight uppercase duration-300" v-html="$softHyphen(title)"></h1>
                <Intro :style="{ transform: `translateY(${-titleShift}px)` }" class="mt-triple-space" :description="description"/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import gsap from 'gsap';
    import { ScrollTrigger } from "gsap/ScrollTrigger";
    gsap.registerPlugin(ScrollTrigger);

    const ui = useUIStore();
    const { theme } = storeToRefs(ui)
    const show = ref<boolean>(false)
    const animationComplete = ref<boolean>(false)

    const props = withDefaults(defineProps<{
        title: string;
        image?: any;
        skew?: number;
        shift?: number
        description?: string,
        reverse?: boolean
    }>(), {
        skew: 0,
        shift: 0,
        description: '',
        reverse: false
    })

    // const heroHeight = ref(0);
    // const scrolled = ref(false);
    const heroRef = ref(null);
    const firstTriangleRef = ref(null);
    const secondTriangleRef = ref(null);
    const titleRef = ref(null);
    const titleShift = ref(0);

    const firsPointsOrigin = computed(() => {
        return `
            -10,0
            1,-10
            10,${props.skew * 1.75}
            0.5,0.5
            -10,${-props.skew * 2.5}
        `;
    })
    const secondPointsOrigin = computed(() => {
        return `
            -10,1
            -10,${-props.skew * 1.5}
            0.5,0.5
            10,${props.skew * 2.5 }
            1,1
        `;
    })

    const initTransition = async () => {
        const wh = window.innerHeight;
        // const sh = document.documentElement.scrollHeight;
        show.value = true;
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const topAnchorX = 0.5 + props.shift
        const bottomAnchorX = 0.5 - props.shift

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

            gsap.to(firstTriangleRef.value, {
                attr: { points: firstPointStepTwo },
                scrollTrigger: {
                    trigger: heroRef.value,
                    scrub: true,
                    start: 'top 10px',
                    end: `+=${wh/2}`, // 👈 200px scroll distance
                    once: true,
                },
            });
            gsap.to(secondTriangleRef.value, {
                attr: { points: secondPointStepTwo },
                scrollTrigger: {
                    trigger: heroRef.value,
                    scrub: true,
                    start: 'top 10px',
                    end: `+=${wh/2}`, // 👈 200px scroll distance
                    once: true
                },
                onComplete: () => {
                    animationComplete.value = true
                }
            });
        }
    }

    const scrollDown = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth"
        });
    }

    onMounted(() => {
        titleShift.value = (titleRef.value?.offsetHeight || 0) / 2;
        nextTick(() => {
            setTimeout(() => {
                initTransition()
            }, 50)
        })
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