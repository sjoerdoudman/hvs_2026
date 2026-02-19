<template>
    <PagesProject v-if="project" :data="project"></PagesProject>
</template>

<script setup lang="ts">
    import { useUIStore } from '@/stores/ui'
    import { useStatamicStore } from '@/stores/statamic'

    const route = useRoute();
    const store = useStatamicStore();
    const { projects } = storeToRefs(store);

    // Find the post
    const project = computed(() => projects.value?.find((project: any) => project.slug === route.params.slug))

    const ui = useUIStore();
    const { updateTheme } = ui;

    onMounted(() => {
        updateTheme('darkgreen');
    });
</script>