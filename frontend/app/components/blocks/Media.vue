<template>
    <section class="flex flex-col gap-triple-space w-full">
        <figure class="w-full">
            <!-- <img src="/img/media-1.jpg" class="w-full h-auto" alt=""> -->
            <ElementsImage :width="'1600'" :height="'900'" :url="data.image.url" :alt="data.image.alt"></ElementsImage>
        </figure>
    </section>
</template>

<script setup lang="ts">
    const props = withDefaults(defineProps<{
        data?: any;
    }>(),{
        data: null,
    })

    // console.log('Media component', props.data)
</script>