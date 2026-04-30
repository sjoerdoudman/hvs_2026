<template>
    <main v-if="data">
        <Hero :title="data.title" :skew="shift" :shift="skew"></Hero>
        <div class="relative z-20 flex flex-col gap-sextuple-space">
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

    // create random shift and skew from 3 to 6
    const shift = Math.floor(Math.random() * 4) + 3
    // create random skew from -5 to 5
    const skew = Math.floor(Math.random() * 11) - 5

    // console.log('Makers data', props.data)
</script>