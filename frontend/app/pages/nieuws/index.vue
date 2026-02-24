<template>
    <main>
        <NewsOverview
            v-if="!loading"
            :data="{
                title: 'Nieuws',
                description: 'Hier delen we de laatste ontwikkelingen, projectupdates en inspirerende verhalen van Huis Salomon.'
            }"
        />
    </main>
</template>

<script setup lang="ts">
    import { useStatamic } from "~/composables/useStatamic";
    import NewsOverview from '@/components/pages/NewsOverview.vue'

    // Ensure news data is loaded
    const { mainMenu,loading } = useStatamic();

    // SEO
    useHead({
        title: 'Nieuws - Huis Salomon',
        meta: [
            {
                name: 'description',
                content: 'Hier delen we de laatste ontwikkelingen, projectupdates en inspirerende verhalen van Huis Salomon.'
            }
        ]
    });
</script>