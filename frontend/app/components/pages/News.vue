<template>
    <main v-if="data" class="pt-35 flex flex-col gap-quadruple-space min-h-[200vh]">
        <!-- Title Block -->
        <section class="container--lg w-full">
            <div class="border-t border-white"></div>
            <div class="flex flex-col items-center pt-triple-space">
                <div class="flex gap-4">
                    <span v-if="categories" class="meta uppercase font-semibold text-theme-lime">{{ categories }}</span>
                    <span class="meta uppercase font-semibold text-highlight">{{ month }} {{ year }}</span>
                </div>
                <h1 class="soehne !normal-case" v-html="data.title"></h1>
            </div>
        </section>

        <!-- Text & media Block -->
        <BlocksTextImage :data="{ image: data.image, text: data.text }"></BlocksTextImage>

        <!-- Blocks -->
        <div v-if="data.blocks" class="relative z-20 flex flex-col gap-triple-space">
            <Blocks :data="data.blocks" />
        </div>

        <section class="container--lg w-full">
            <div class="border-t border-white"></div>
        </section>

        <!-- Breadcrumnb -->
        <section class="last:pb-triple-space">
            <div class="container--lg flex items-center gap-2">
                <p class="font-bold text-theme-lime">
                    <nuxt-link to="/nieuws">Nieuws</nuxt-link>
                </p>
                <span class="material-symbols-outlined">chevron_right</span>
                <p class="font-bold text-theme-lime" v-text="data.title"></p>
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
    const props = withDefaults(defineProps<{
        data: any;
    }>(), {
    })

    // get the Dutch month name
    const month = computed(() => new Date(props.data.date).toLocaleString('nl', { month: 'long' }))
    // get the year as a computed property
    const year = computed(() => new Date(props.data.date).getFullYear())
    // get the categories as a comma seperated list
    const categories = computed(() => props.data.categories.map((category: any) => category.title).join(', '))
</script>