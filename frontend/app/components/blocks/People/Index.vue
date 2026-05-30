<template>
    <!-- Staff Block -->
    <section class="my-triple-space">
        <div class="container--lg flex flex-col gap-triple-space">
            <div class="title-block">
                <h2 class="text-highlight uppercase font-bold" v-html="data.title"></h2>
            </div>
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-x-double-space gap-y-triple-space">
                <div v-for="item in data.items" class="flex flex-col gap-3">
                    <div class="flex flex-col gap-3">
                        <figure class="w-full aspect-3/4 overflow-hidden">
                            <ElementsImage :width="'400'" :height="'300'" :url="item.image?.url" :alt="item.image?.alt"></ElementsImage>
                        </figure>
                    </div>
                    <div class="flex flex-col gap-2">
                        <small class="uppercase text-highlight font-bold" v-html="item.function"></small>
                        <h3 class="leading-none" v-html="item.name"></h3>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
    const props = withDefaults(defineProps<{
        data: any;
        context?: string,
    }>(), {
        context: 'default'
    })
</script>