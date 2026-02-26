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

    watchEffect(() => {
        if (homePage.value) {
            updateTheme(homePage.value?.color?.value || 'darkblue');
            useMetaData({
                title: homePage.value?.seo_title || homePage.value?.title,
                description: homePage.value?.seo_description || homePage.value?.description,
                noIndex: homePage.value?.seo_no_index,
                noFollow: homePage.value?.seo_no_follow,
                socialImage: homePage.value?.social_image,
                socialTitle: homePage.value?.social_title,
                socialDescription: homePage.value?.social_description,
            });
        }
    });

    onMounted(() => {
        updateTheme('darkblue');
        toggleHome(true);
    });

    onUnmounted(() => {
        toggleHome(false);
    });
</script>