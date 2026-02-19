<template>
    <main id="content" class="relative" :class="[ !homePage ? 'bg-black min-h-screen' : '' ]">
        <HeroHome v-if="homePage" :images="homePage?.images" :description="homePage?.description"/>
        <div v-if="homePage" class="relative z-20 flex flex-col gap-triple-space">
            <Blocks :data="homePage.blocks" />
        </div>
    </main>
</template>

<script setup lang="ts">
    import { useUIStore } from '@/stores/ui'
    import { useStatamicStore } from '@/stores/statamic'

    // Use the composable to fetch data
    const store = useStatamicStore();
    const { pages } = storeToRefs(store);
    const ui = useUIStore();
    const { updateTheme, toggleHome } = ui;

    // Find the home page and update current page - reactive
    const homePage = computed(() => pages.value?.find((page: any) => page.slug === 'home'))
    // console.log('homepage',homePage.value);

    onMounted(() => {
        updateTheme('darkblue');
        toggleHome(true);
    });

    onUnmounted(() => {
        toggleHome(false);
    });
</script>