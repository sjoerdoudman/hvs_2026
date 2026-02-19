<template>
    <section class="flex flex-col gap-quadruple-space last:mb-sextuple-space">
        <div class="container--lg flex flex-col gap-triple-space">
            <div class="grid grid-cols-2 gap-double-space">
                <figure class="flex flex-col gap-single-space">
                    <ElementsImage v-if="data.image" :width="'600'" :height="'600'" :url="data.image.url" :alt="data.image.alt"></ElementsImage>
                </figure>
                <div class="col-span-1 flex flex-col gap-double-space">
                    <div class="flex flex-col gap-2">
                        <h3 class="text-highlight text-[2.25rem]" v-html="data.title"></h3>
                        <p v-html="data.text"></p>
                    </div>
                    <div v-if="data.buttons?.length" class="flex gap-6 mt-single-space">
                        <ElementsButton v-for="button in data.buttons" :data="button"></ElementsButton>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
    const props = withDefaults(defineProps<{
        data?: any;
    }>(),{
        data: null,
    })

    // console.log('Text image component buttons', props.data.buttons)
</script>