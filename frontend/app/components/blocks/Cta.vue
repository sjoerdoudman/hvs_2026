<template>
    <section class="flex flex-col w-full last:mb-sextuple-space mt-single-space">
        <div class="container--lg w-full">
            <div class="max-w-[600px]">
                <div class="col-span-2 flex flex-col gap-4">
                    <div v-html="data.text"></div>
                    <div v-if="data.buttons" class="flex gap-6">
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