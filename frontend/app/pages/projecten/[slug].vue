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

    watchEffect(() => {
        if (project.value) {
            useMetaData({
                title: project.value?.seo_title || project.value?.title,
                description: project.value?.seo_description || project.value?.description,
                noIndex: project.value?.seo_no_index,
                noFollow: project.value?.seo_no_follow,
                socialImage: project.value?.social_image,
                socialTitle: project.value?.social_title,
                socialDescription: project.value?.social_description,
            });
        }
    });

    onMounted(() => {
        updateTheme('darkgreen');
    });
</script>