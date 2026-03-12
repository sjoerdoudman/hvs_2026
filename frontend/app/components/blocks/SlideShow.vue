<template>
    <section ref="containerRef" class="relative bg-black py-double-space w-full overflow-x-hidden">
        <div class="relative container--lg">
            <button ref="navPrevRef" class="swiper-button-prev !hidden !md:flex custom-prev !left-triple-space bg-lime hover:scale-105 focus:scale-105 duration-100" aria-label="Previous slide">
              <span class="material-symbols-outlined">arrow_back</span>
            </button>
            <div ref="swiperRef" class="slider aspect-video">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="slide in data.slides">
                        <figure class="h-full flex justify-center align-items-center">
                            <ElementsImage class="h-full" :url="slide.image?.url" :alt="slide.image?.alt" :w="`${slide.image?.original?.width}`" :h="`${slide.image?.original?.height}`"></ElementsImage>
                        </figure>
                    </div>
                </div>
            </div>
            <div ref="navigationRef" class="swiper-pagination"></div>
            <button ref="navNextRef" class="swiper-button-next !hidden !md:flex custom-next !right-triple-space bg-lime hover:scale-105 focus:scale-105 duration-100" aria-label="Next slide">
              <span class="material-symbols-outlined">arrow_forward</span>
            </button>
        </div>
        <transition
            :css="false"
            @before-enter="beforeEnter"
            @enter="enter"
            @leave="leave"
        >
            <p v-if="ifHasCaption" class="text-[#b6b6b6] text-center mt-single-space">
                <small v-text="data.slides[activeSlide]?.caption || '&nbsp;'"></small>
            </p>
        </transition>
    </section>
</template>
<script setup lang="ts">
    import Swiper from 'swiper';
    import { Navigation, Pagination } from 'swiper/modules';
    import 'swiper/css';
    import 'swiper/css/navigation';
    import 'swiper/css/pagination';

    type Slide = {
        image: any
        caption?: string
    }
    type SliderData = {
        slides: Slide[]
    }

    const swiperRef = ref(null);
    const navigationRef = ref(null);
    const navPrevRef = ref(null);
    const navNextRef = ref(null);
    const activeSlide = ref(0)

    const props = defineProps<{
        data: SliderData
    }>();

    const ifHasCaption = computed(() => {
        return props.data.slides.some(slide => slide.caption);
    })

    const initSlider = () => {
        const container = swiperRef.value;

        if (!container) return;

        const slidesPerViewMobile = 1.2;
        const paginationEl = navigationRef.value;
        const navPrevEl = navPrevRef.value;
        const navNextEl = navNextRef.value;

        const swiper = new Swiper(container, {
            modules: [Navigation, Pagination],
            loop: false,
            spaceBetween: 24,
            slidesPerView: slidesPerViewMobile,
            speed: 700,
            pagination: {
                el: paginationEl,
                clickable: true,
            },
            navigation: {
                nextEl: navNextEl,
                prevEl: navPrevEl,
                addIcons: false
            },
            breakpoints: {
                768: {
                    slidesPerView: 1.2,
                },
            },
            watchSlidesProgress: true,
            on: {
                init(swiper) {
                    activeSlide.value = swiper.activeIndex
                },
                slideChange(swiper) {
                    activeSlide.value = swiper.activeIndex
                },
            },
        });
    }

     const beforeEnter = (el: Element) => {
        gsap.set(el, {
            opacity: 0,
            y: 8
        })
    }

    const enter = (el: Element, done: () => void) => {
        gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: 'power2.out',
            onComplete: done
        })
    }

    const leave = (el: Element, done: () => void) => {
        gsap.to(el, {
            opacity: 0,
            y: 8,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: done
        })
    }

    onMounted(async () => {
        initSlider();
    });
</script>

<style scoped>
    :deep(.swiper-pagination-bullet) {
        width: 50px;
        height: 5px;
        margin: 0 8px !important;
        border-radius: 0px;
        opacity: 1;
        transition: all 0.3s ease-in-out;
    }
</style>