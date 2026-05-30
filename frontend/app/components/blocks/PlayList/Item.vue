<template>
    <div>
        <div class="grid md:grid-cols-12 gap-single-space md:gap-double-space pb-double-space md:pb-single-space">
            <div class="md:col-span-3">
                <small class="meta uppercase font-semibold text-theme-lime">{{ date }} - {{ time }}</small>
            </div>
            <div v-if="project" class="md:col-span-3 flex group">
                <h3 class="leading-none">{{ data.event_title }}</h3>
            </div>
             <div v-else class="md:col-span-3 flex group">
                <h3 class="leading-none">{{ data.project?.title || data.title }}</h3>
            </div>
            <div class="md:col-span-4 md:text-right">
                <small class="meta uppercase font-semibold">{{ data.location }} - {{ data.city }}</small>
            </div>
            <div class="md:col-span-2 md:text-right mt-single-space md:mt-0">
                <ElementsButton size="small" v-if="data.ticket_url && data.ticket_status?.value == 'available'" :data="{ label: 'Tickets', url: data.ticket_url }"></ElementsButton>
                <span class="py-2 px-4 bg-black/90" v-else-if="data.ticket_status?.value == 'sold_out'">Uitverkocht</span>
                <span class="py-2 px-4 bg-black/90" v-else>Besloten</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    const props = withDefaults(defineProps<{
        data?: any;
        project?: any
    }>(),{
        data: null,
        project: null
    })
    const date = computed(() => new Date(props.data.date).toLocaleString('nl', { month: 'long', day: 'numeric', year: 'numeric' }))
    const time = computed(() => props.data.time)

    console.log(props.data)
</script>