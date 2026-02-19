<template>
    <!-- Updates Block -->
    <section class="last:pb-triple-space">
        <div class="container--lg flex flex-col gap-triple-space">
            <div class="title-block">
                <h2 class="uppercase font-bold">Agenda</h2>
            </div>
            <ul class="flex flex-col gap-single-space divide-y-2 divide-white border-t-2 border-white py-single-space">
                <li v-for="event in filteredEvents">
                    <BlocksPlayListItem :data="event" :project="project"/>
                </li>
            </ul>
        </div>
    </section>
</template>

<script setup lang="ts">
    const props = withDefaults(defineProps<{
        project?: any;
        showArchive?: boolean;
    }>(), {
        project: null,
        showArchive: true
    });

    const store = useStatamicStore();
    const { events } = storeToRefs(store);

    // Filter projects based on props
    const filteredEvents = computed(() => {
        let filtered = events.value;
        // console.log('events', events.value)

        // Filter by maker if specified
        if (props.project) {
            filtered = filtered.filter(event => {
                // console.log('event project', event.project)
                return event.project.id === props.project.id;
            });
        }

        return filtered;
    });
</script>