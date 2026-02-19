<template>
    <nuxt-link v-if="data" :to="data.url" class="inline-block duration-200 hover:-translate-y-1 focus:-translate-y-1">
        <span class="sr-only" v-text="data.title"></span>
        <div aria-hidden class="flex flex-col gap-double-space">
            <div class="flex flex-col gap-single-space">
                <div class="flex gap-4">
                    <span v-if="categories" class="meta uppercase font-semibold text-theme-lime">{{ categories }}</span>
                    <span class="meta uppercase font-semibold text-highlight">{{ month }} {{ year }}</span>
                </div>
                <figure v-if="data.image" class="w-full aspect-4/3 overflow-hidden">
                    <ElementsImage :width="'400'" :height="'300'" :url="data.image?.url" :alt="data.image?.alt"></ElementsImage>
                </figure>
            </div>
            <div class="flex flex-col gap-2">
                <h3 class="text-highlight leading-none" v-html="data.title"></h3>
                <p v-text="data.description"></p>
            </div>
        </div>
    </nuxt-link>
</template>

<script setup lang="ts">
    const props = withDefaults(defineProps<{
        data?: any;
    }>(),{
        data: null,
    })
    // get the Dutch month name
    const month = computed(() => new Date(props.data.date).toLocaleString('nl', { month: 'long' }))
    // get the year as a computed property
    const year = computed(() => new Date(props.data.date).getFullYear())
    // get the categories as a comma seperated list
    const categories = computed(() => props.data.categories.map((category: any) => category.title).join(', '))

    // console.log('news teaser data', props.data)
</script>