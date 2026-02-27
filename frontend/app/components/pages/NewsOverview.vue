<template>
    <main v-if="data">
        <Hero :title="data.title" :skew="3" :shift="-5"></Hero>
        <div class="py-quadruple-space relative z-10 flex flex-col gap-quadruple-space min-h-screen">
            <!-- Intro Block -->
            <Intro :description="data.description"></Intro>
            <!-- News Block -->
            <BlocksNews :data="{ title: 'Het laatste nieuws', maxItems: 6, pagination: true }"/>
        </div>
    </main>
</template>

<script setup lang="ts">
    import { useUIStore } from '@/stores/ui';
    const ui = useUIStore();
    const { updateTheme } = ui;
    const props = withDefaults(defineProps<{
        data: any;
        context?: string,
    }>(), {
        context: 'default'
    })

    // SEO for pagination
    const route = useRoute();
    const currentPage = computed(() => parseInt(route.query.page as string) || 1);

    onMounted(() => {
        updateTheme('darkpurple');
    });

    useHead(() => ({
        title: currentPage.value > 1
            ? `${props.data?.title || ''} - Pagina ${currentPage.value}`
            : props.data?.title || '',
        meta: [
            {
                name: 'description',
                content: currentPage.value > 1
                    ? `Bekijk pagina ${currentPage.value} van ${props.data?.title || ''}`
                    : props.data?.description || ''
            }
        ]
    }));
</script>