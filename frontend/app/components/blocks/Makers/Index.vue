<template>
    <section class="flex flex-col gap-quadruple-space w-full last:mb-sextuple-space">
        <div class="container--lg w-full">
            <div :class="[ data.size.value == 'small' ? 'md:grid-cols-2 lg:grid-cols-4 gap-double-space' : 'grid-cols-1 gap-triple-space' ]" class="grid">
                <TeaserMaker
                    v-for="(item) in data.items"
                    :size="data.size.value"
                    :data="item"
                />
            </div>
        </div>
        <div v-if="data.buttons.length > 0" class="container--lg w-full">
            <div class="flex flex-col md:flex-row gap-6">
                <ElementsButton v-for="button in data.buttons" :data="button"></ElementsButton>
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

    // console.log('Makers data', props.data)
</script>