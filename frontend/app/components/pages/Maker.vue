<template>
     <main class="flex flex-col gap-triple-space">
        <HeroMaker :title="data.title" :function="data.function" :image="data.image"></HeroMaker>
        <div class="relative z-20 min-h-dvh">

            <!-- Blocks -->
            <div v-if="data.blocks" class="relative z-20 flex flex-col gap-triple-space">
                <Blocks :data="data.blocks" />
            </div>

            <!-- Projects-->
            <BlocksProjects :maker="data" :showArchive="true"/>

            <!-- Updates Block -->
            <BlocksUpdates :maker="data"></BlocksUpdates>

            <!-- Breadcrumnb -->
            <section class="last:pb-triple-space mt-triple-space">
                <div class="container--lg flex items-center gap-2">
                    <p class="font-bold text-theme-lime hover:underline underline-offset-4">
                        <nuxt-link to="/makers">Makers</nuxt-link>
                    </p>
                    <span class="material-symbols-outlined">chevron_right</span>
                    <p class="font-bold text-theme-lime">{{ data.title }}</p>
                </div>
            </section>
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
    // console.log(props.data.blocks)
</script>