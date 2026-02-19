<template>
    <div class="w-full relative z-10" :style="{ marginBottom: footer ? fh + 'px' : '0px' }">
        <div :class="[ `theme bg-theme-${theme}` ]" class=" text-white">
            <Header class="duration-300" :class="[ showHeader ? 'opacity-100' : 'opacity-0 pointer-events-none' ]" />
            <NavigationMain></NavigationMain>
            <div class="min-h-screen" :class="`bg-theme-${theme}`">
                <NuxtPage />
            </div>
        </div>
    </div>
    <Footer ref="footer" class="fixed w-full left-0 bottom-0" />
</template>

<script setup lang="ts">
    import { useUIStore } from '@/stores/ui';
    const { pages, news, makers, events, loading } = useStatamicPages()
    const ui = useUIStore();
    const { toggleHideFooter, toggleFooterIsFocusable } = ui;
    const { theme } = storeToRefs(ui);

    const footer = ref<{$el: HTMLElement} | null>(null);
    const fh = ref<number>(0);
    const showHeader = ref(true);

    const onScroll = () => {
        // document height minus scroll height
        const sh = document.documentElement?.scrollHeight || 0;
        const sy = window.scrollY || 0;
        const wh = window.innerHeight || 0;

        if (sy > sh - wh) {
            toggleFooterIsFocusable(true)
        } else {
            toggleFooterIsFocusable(false)
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

    onMounted(() => {
        if (!footer.value) return
        fh.value = footer.value?.$el.offsetHeight || 0;
        // add lime color to body
        document.body.classList.add(`bg-theme-${theme.value}`)
        window.addEventListener('scroll', onScroll);
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