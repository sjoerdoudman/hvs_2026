<template>
    <PagesMaker v-if="maker" :data="maker"></PagesMaker>
</template>

<script setup lang="ts">
    import { useUIStore } from '@/stores/ui'
    import { useStatamicStore } from '@/stores/statamic'

    const route = useRoute();
    const store = useStatamicStore();
    const { makers } = storeToRefs(store);

    // Find the maker
    const maker = computed(() => makers.value?.find((maker: any) => maker.slug === route.params.slug))

    const ui = useUIStore();
    const { updateTheme } = ui;
    const { theme } = storeToRefs(ui)

    onMounted(() => {
        updateTheme('darkgreen');
    });
</script>