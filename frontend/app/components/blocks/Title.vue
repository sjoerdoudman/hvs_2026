<template>
    <section class="mt-triple-space flex flex-col w-full last:mb-sextuple-space">
        <div class="container--lg w-full">
            <div class="content-column">
                <div class="col-span-2 title-block flex flex-col gap-4">
                    <h2 v-if="data.title" class="text-highlight uppercase font-bold" v-html="$softHyphen(data.title)"></h2>
                    <div v-if="data.description" class="intro" v-html="data.description"></div>
                    <div v-if="data.buttons && data.buttons.length" class="flex flex-col md:flex-row gap-6 mt-single-space">
                        <ElementsButton v-for="button in data.buttons" :data="button"></ElementsButton>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
    const props = withDefaults(defineProps<{
       data: any;
    }>(), {
    })
</script>