<template>
     <nuxt-link :to="data.url" class="block hover:-translate-y-1 focus:-translate-y-1 transition-all duration-300">
        <span class="sr-only" v-text="data.title"></span>
        <div class="grid md:grid-cols-2 gap-double-space" aria-hidden>
            <figure class="aspect-square">
                <ElementsImage :width="'600'" :height="'600'" :url="data.image.url" :alt="data.image.alt"></ElementsImage>
            </figure>
            <div class="flex flex-col gap-double-space">
                <div>
                    <small class="meta uppercase font-semibold" v-text="data.year"></small>
                    <h3 class="uppercase leading-none h1" v-html="$softHyphen(data.title)"></h3>
                </div>
                <div class="flex flex-col gap-single-space">
                    <p v-html="data.description"></p>
                    <p class="flex items-center gap-2">
                        <span>Lees meer</span>
                        <span class="material-symbols-outlined">arrow_forward</span>
                    </p>
                </div>
            </div>
        </div>
    </nuxt-link>
</template>

<script setup lang="ts">
    const props = withDefaults(defineProps<{
        size?: string
        data: any
    }>(), {
        size: 'small'
    })
</script>