<template>
    <NuxtImg
        :src="src"
        :alt="alt"
        :width="w"
        :height="h"
        loading="lazy"
        class="w-full h-full object-cover object-center"
    />
</template>

<script setup lang="ts">
    const config = useRuntimeConfig();
    const baseURL = (config.public.BASE_URL as string);
    const props = withDefaults(defineProps<{
        url: string,
        alt?: string,
        w?: string,
        h?: string
    }>(), {
        url: '',
        alt: 'Image',
        w: '600',
        h: '600'
    })

    const src = computed(() => {
        // console.log('+url',props.url);
        if (props.url.includes(baseURL)) return props.url
        // console.log('+base',baseURL);
        return `${baseURL}${props.url}`
    })
</script>