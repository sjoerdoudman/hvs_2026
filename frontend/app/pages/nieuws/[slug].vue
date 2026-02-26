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

    watchEffect(() => {
        if (post.value) {
            useMetaData({
                title: post.value?.seo_title || post.value?.title,
                description: post.value?.seo_description || post.value?.description,
                noIndex: post.value?.seo_no_index,
                noFollow: post.value?.seo_no_follow,
                socialImage: post.value?.social_image,
                socialTitle: post.value?.social_title,
                socialDescription: post.value?.social_description,
            });
        }
    });

    onMounted(() => {
        updateTheme('darkpurple');
    });
</script>