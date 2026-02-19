<template>
    <main>
        <Hero :title="'Privacy'"></Hero>
        <div class="pt-quadruple-space relative z-20 flex flex-col gap-quadruple-space">
            <!-- Intro Block -->
            <section class="container--lg">
                <div class="title-block">
                    <p>
                        Deze pagina heeft nog geen inhoud
                    </p>
                </div>
            </section>

            <!-- Media Block -->
            <figure class="w-full">
                <img src="/img/media-1.jpg" class="w-full h-auto" alt="">
            </figure>

        </div>
    </main>
</template>

<script setup lang="ts">
    import { useUIStore } from '@/stores/ui'
    const ui = useUIStore();
    const { updateTheme } = ui;
    const { theme } = storeToRefs(ui)

    onMounted(() => {
        updateTheme('darkblue');
    });
</script>