<template>
    <nuxt-link v-if="data" :to="data.url" class="block hover:-translate-y-1 focus:-translate-y-1 transition-all duration-300">
        <span class="sr-only" v-text="`Meer over ${data.title}`"></span>

        <!-- Small Teaser -->
        <div v-if="size === 'small'" class="flex flex-col gap-single-space">
            <figure v-if="data.image" class="w-full aspect-3/4 overflow-hidden">
                <!-- <img class="object-cover w-full h-full scale-105" :src="data.image" alt=""> -->
                <ElementsImage :width="'600'" :height="'600'" :url="data.image.url" :alt="data.image.alt"></ElementsImage>
            </figure>
            <div class="flex flex-col gap-0.5 md:gap-2">
                <h3 class="breit text-highlight text-[2.25rem] uppercase leading-none" v-html="data.title"></h3>
                <p class="meta uppercase" v-html="data.function"></p>
            </div>
        </div>

        <!-- Large Teaser -->
        <div v-else class="w-full grid md:grid-cols-2 gap-triple-space">
            <figure v-if="data.image" class="w-full aspect-4/3 overflow-hidden md:order-last">
                <ElementsImage :width="'600'" :height="'600'" :url="data.image.url" :alt="data.image.alt"></ElementsImage>
            </figure>
            <div class="flex flex-col gap-double-space">
                <div class="flex flex-col gap-0.5 md:gap-2">
                    <h3 class="text-highlight uppercase leading-none h2" v-html="data.title"></h3>
                    <p class="meta uppercase" v-html="data.function"></p>
                </div>
                <div class="flex flex-col gap-double-space">
                    <p class="h3" v-html="data.description"></p>
                    <div>
                        <ElementsButton></ElementsButton>
                    </div>
                </div>
            </div>
        </div>
    </nuxt-link>
</template>

<script setup lang="ts">
    const props = withDefaults(defineProps<{
        size?: string
        data: {
            title: string,
            slug: string,
            function: string,
            description: string,
            url: string,
            image?: {
                url: string,
                alt: string,
                width?: string,
                height?: string
            }
        }
    }>(), {
        size: 'small',
        data: () => ({
            title: '',
            slug: '',
            function: '',
            description: '',
            url: ''
        })
    })
    // console.log('Maker data',props.data)
</script>