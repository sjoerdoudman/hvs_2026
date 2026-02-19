<template>
    <main>
        <NewsOverview 
            :data="{
                title: 'Nieuws', 
                description: 'Hier delen we de laatste ontwikkelingen, projectupdates en inspirerende verhalen van Huis Salomon.'
            }"
        />
    </main>
</template>

<script setup lang="ts">
    import { useStatamicPages } from "~/composables/useStatamic";
    import NewsOverview from '@/components/pages/NewsOverview.vue'
    
    // Ensure news data is loaded
    const { loading } = useStatamicPages();

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