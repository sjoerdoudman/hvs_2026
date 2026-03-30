<template>
    <main>
        <Hero :title="data.title"  :skew="5" :shift="5" :image="data.image"></Hero>
        <div class="relative z-20 flex flex-col gap-quadruple-space">

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
</script>