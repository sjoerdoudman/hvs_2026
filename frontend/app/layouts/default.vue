<template>
    <div>
        <div class="w-full relative z-10" :class="[footerIsFocusable ? 'pointer-events-none' : '']" :style="{ marginBottom: footerRef ? fh + 'px' : '0px' }">
            <div :class="[ `theme bg-theme-${theme}` ]" class=" text-white">
                <Header class="duration-300" :class="[ showHeader ? 'opacity-100' : 'opacity-0 pointer-events-none' ]" />
                <NavigationMain></NavigationMain>
                <div class="min-h-dvh" :class="[`bg-theme-${theme}`]">
                    <NuxtPage />
                </div>
                <div ref="pageRef"></div>
            </div>
        </div>
        <Footer ref="footerRef" class="lg:fixed w-full left-0 bottom-0" />
    </div>
</template>

<script setup lang="ts">
    import gsap from 'gsap';
    import { useUIStore } from '@/stores/ui';
    import { ScrollTrigger } from "gsap/ScrollTrigger";
    gsap.registerPlugin(ScrollTrigger);

    const { pages, news, makers, events, mainMenu, globals, loading } = useStatamic()
    const ui = useUIStore();
    const { toggleHideFooter, toggleFooterIsFocusable } = ui;
    const { theme } = storeToRefs(ui);

    const pageRef = ref<HTMLDivElement | null>(null);
    const footerRef = ref<{$el: HTMLElement} | null>(null);
    const footerIsFocusable = ref(false);
    const fh = ref<number>(0);
    const showHeader = ref(true);

    const onScroll = () => {
        // document height minus scroll height
        const sh = document.documentElement?.scrollHeight || 0;
        const sy = window.scrollY || 0;
        const wh = window.innerHeight || 0;
        const ww = window.innerWidth || 0;
        const ph = pageRef.value?.$el?.offsetHeight || 0

        // console.log(sy, sh - wh - ph)

        if (ww < 1024) {
            const f = footerRef.value?.$el?.offsetHeight || 0
            if (sh < sy + f + 70) {
                footerIsFocusable.value = true
                showHeader.value = false
            } else {
                footerIsFocusable.value = false
                showHeader.value = true
            }
            return
        }

        // when pageRef is in bottom of viewport
        if (sy > sh - wh - ph) {
            footerIsFocusable.value = true
            showHeader.value = false
        }

        if (sy > sh - wh) {
            toggleFooterIsFocusable(true)
            footerIsFocusable.value = true
        } else {
            toggleFooterIsFocusable(false)
            footerIsFocusable.value = false
        }
        if (sy > wh) {
            document.body.classList.add('!bg-theme-lime')
            toggleHideFooter(false)
        } else {
            document.body.classList.remove('!bg-theme-lime')
            toggleHideFooter(true)
        }
        if ((sh - sy - 100) <= fh.value) {
            if (!showHeader.value) return
            showHeader.value = false
        } else {
            if (showHeader.value) return
            showHeader.value = true
        }
    };

    let debounceTimer: ReturnType<typeof setTimeout> | null = null;

    const onResize = () => {
        if (debounceTimer) clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            setFooterHeight();
        }, 300);
    }

    const setFooterHeight = () => {
        if (!footerRef.value) return
        if (window.innerWidth < 1024) {
            fh.value = 0;
            return
        };
        fh.value = footerRef.value?.$el.offsetHeight || 0;
    }

    onMounted(async () => {
        window.addEventListener('scroll', onScroll);
        window.addEventListener('resize', onResize);
        setFooterHeight();

        // TODO: implement scroll trigger
        // if (pageRef.value) {
        //     ScrollTrigger.create({
        //         trigger: pageRef.value,
        //         // when the bottom of the trigger hits the bottom of the viewport
        //         start: 'bottom bottom',
        //         immediateRender: false,

        //         onEnter: () => {
        //             console.log('onEnter');
        //         },
        //         onLeaveBack: () => {
        //             console.log('onLeave');
        //         }
        //     });
        //     ScrollTrigger.refresh();
        // }

        // add lime color to body
        document.body.classList.add(`bg-theme-${theme.value}`)
    })
    onUnmounted(() => {
        window.removeEventListener('scroll', onScroll);
    })
</script>

<style>
    .page-enter-active,
    .page-leave-active {
        transition: opacity 0.5s ease;
    }
    .page-enter-from,
    .page-leave-to {
        opacity: 0;
    }
</style>