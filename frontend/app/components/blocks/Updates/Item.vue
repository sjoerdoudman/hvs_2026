<template>
    <nuxt-link :to="data.url">
        <span class="sr-only">{{ data.title }}</span>
        <div aria-hidden class="grid md:grid-cols-12 gap-single-space md:gap-double-space pb-single-space">
            <div class="col-span-3">
                <small class="meta uppercase font-semibold text-theme-lime">{{ date }}</small>
            </div>
            <div class="col-span-7 flex flex-col md:gap-single-space group" @mouseenter="openItem = !openItem" @mouseleave="openItem = !openItem">
                <h3 class="leading-none">{{ data.title }}</h3>
                <div :class="[ openItem ? 'max-h-screen lg:max-h-125 duration-700 delay-200' : 'max-h-0 duration-200' ]" class="overflow-hidden">
                    <p v-text="data.description"></p>
                </div>
            </div>
            <div class="col-span-2 text-right">
                <small class="meta uppercase font-semibold">{{ categories }}</small>
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
    const openItem = ref(false);
    //get the date in Dutch format
    const date = computed(() => new Date(props.data.date).toLocaleString('nl', { month: 'long', day: 'numeric', year: 'numeric' }))
    const categories = computed(() => props.data.categories.map((category: any) => category.title).join(', '))

</script>