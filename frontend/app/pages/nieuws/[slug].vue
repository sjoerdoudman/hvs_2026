<template>
    <PagesNews :data="post" />
</template>

<script setup lang="ts">
    import { useUIStore } from '@/stores/ui'
    import { useStatamicStore } from '@/stores/statamic'

    const route = useRoute();
    const store = useStatamicStore();
    const { news } = storeToRefs(store);

    // Find the post
    const post = computed(() => news.value?.find((news: any) => news.slug === route.params.slug))

    const ui = useUIStore();
    const { updateTheme } = ui;

    onMounted(() => {
        updateTheme('darkpurple');
    });
</script>