<template>
    <main v-if="data">
        <Hero :title="data.title" :skew="2" :shift="-2"></Hero>
        <div class="mt-40 relative z-20 flex flex-col gap-sextuple-space">
            <!-- Intro Block -->
            <Intro :description="data.description"/>

            <div v-if="data.blocks" class="relative z-20 flex flex-col gap-triple-space">
                <Blocks :data="data.blocks" />
            </div>
        </div>
    </main>
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