<template>
    <main>
        <Hero :title="data.title"  :skew="skew" :shift="shift" :image="data.image"></Hero>
        <div class="relative z-20 flex flex-col gap-quadruple-space mt-quadruple-space">

            <!-- Blocks -->
            <div v-if="data.blocks" class="relative z-20 flex flex-col gap-quadruple-space">
                <Blocks :data="data.blocks" />
                <!-- PLayList Block -->
                <BlocksPlayList :project="data"></BlocksPlayList>
            </div>


            <!-- Breadcrumnb -->
            <!-- <section class="last:pb-triple-space">
                <div class="container--lg flex items-center gap-2">
                    <p class="font-bold text-theme-lime"><nuxt-link to="/">Makers</nuxt-link></p>
                    <span class="material-symbols-outlined">chevron_right</span>
                    <p class="font-bold text-theme-lime">Ilay den Boer</p>
                </div>
            </section> -->
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

    // create random shift and skew from 1 to 3
    const shift = Math.floor(Math.random() * 6) + 3
    // create random skew from -5 to 5 but no 0
    const skew = Math.floor(Math.random() * 6) + 3
</script>