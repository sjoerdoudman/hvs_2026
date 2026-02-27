<template>
    <PagesMaker v-if="maker" :data="maker"></PagesMaker>
</template>

<script setup lang="ts">
    import { useUIStore } from '@/stores/ui'
    import { useStatamicStore } from '@/stores/statamic'

    const route = useRoute();
    const store = useStatamicStore();
    const { makers } = storeToRefs(store);

    // Find the maker
    const maker = computed(() => makers.value?.find((maker: any) => maker.slug === route.params.slug))

    const ui = useUIStore();
    const { updateTheme } = ui;

    watchEffect(() => {
        if (maker.value) {
            useMetaData({
                title: maker.value?.seo_title || maker.value?.title,
                description: maker.value?.seo_description || maker.value?.description,
                noIndex: maker.value?.seo_no_index,
                noFollow: maker.value?.seo_no_follow,
                socialImage: maker.value?.social_image,
                socialTitle: maker.value?.social_title,
                socialDescription: maker.value?.social_description,
            });
        }
    });

    onMounted(() => {
        updateTheme('darkgreen');
    });
</script>