<template>
    <!-- <PagesDefault v-if="page && template" :data="page"/> -->
    <component :is="getComponentName()" :data="page"></component>
</template>

<script setup lang="ts">
    import { useUIStore } from '@/stores/ui'
    import { useStatamicStore } from '@/stores/statamic'
    import PagesDefault from '~/components/pages/Default.vue'
    import PagesNewsOverview from '~/components/pages/NewsOverview.vue';

    const ui = useUIStore();
    const { updateTheme } = ui;
    // get the current page slug
    const route = useRoute();

    const componentMap = {
        default: PagesDefault,
        news_overview: PagesNewsOverview
    };

    // Use the composable to fetch data
    const store = useStatamicStore();
    const { pages } = storeToRefs(store);

    // Find the home page and update current page - reactive
    const page = computed(() => pages.value?.find((page: any) => page.slug === route.params.slug))

    const getComponentName = () => {
        switch (page.value?.blueprint?.handle) {
            case 'news_overview':
                return componentMap['news_overview'];
            default:
                return componentMap['default'];
        }
    }

    // Watch for page data and update theme when available
    watchEffect(() => {
        if (page.value) {
            updateTheme(page.value?.color?.value || 'darkblue');
        }
    });
</script>