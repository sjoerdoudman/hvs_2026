<template>
    <section class="w-full">
        <div class="container--lg w-full flex flex-col gap-triple-space">
            <div :class="`lg:grid-cols-${data.cols}`" class="grid gap-triple-space">
                <div v-for="item in data.items" class="col-span-1 flex flex-col gap-single-space">
                    <div class="flex-1 flex flex-col gap-2">
                        <h3 class="text-highlight text-[2.25rem]" v-html="item.title"></h3>
                        <p v-html="item.text"></p>
                    </div>
                    <div class="mt-auto" v-if="item.expanded_text">
                        <ElementsReadMore :data="{ text: item.expanded_text }" />
                    </div>
                </div>
            </div>
            <div v-if="data.buttons?.length > 0" class="w-full">
                <div class="flex gap-6 mt-single-space">
                    <ElementsButton v-for="button in data.buttons" :data="button"></ElementsButton>
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
    // console.log('Multi column', props.data)
</script>