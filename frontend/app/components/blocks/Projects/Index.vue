<template>
    <section>
        <!-- Running projects -->
        <div v-if="runningProjects.length > 0" class="bg-highlight py-quadruple-space" :class="[ `text-theme-${theme}` ]">
            <div class="container--lg flex flex-col gap-triple-space">
                <div class="title-block">
                    <h2 class="uppercase font-bold">Lopende projecten</h2>
                </div>
                <div class="grid w-full gap-triple-space">
                    <TeaserProject
                        v-for="project in runningProjects"
                        :key="project.id"
                        :data="project"
                    />
                </div>
            </div>
        </div>

        <!-- Archive projects -->
        <div v-if="showArchive && archiveProjects.length > 0" class="py-quadruple-space">
            <div class="container--lg flex flex-col gap-triple-space">
                <div class="title-block">
                    <h2 class="uppercase font-bold">Archief</h2>
                </div>
                <div class="grid w-full gap-triple-space">
                    <TeaserProject
                        v-for="project in archiveProjects"
                        :key="project.id"
                        :data="project"
                    />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
    import { useStatamicStore } from '@/stores/statamic';
    import { useUIStore } from '@/stores/ui';

    const store = useStatamicStore();
    const ui = useUIStore();
    const { projects } = storeToRefs(store);
    const { theme } = storeToRefs(ui);

    interface Maker {
        id: string;
        title: string;
        slug: string;
    }

    const props = withDefaults(defineProps<{
        maker?: Maker | null;
        showArchive?: boolean;
    }>(), {
        maker: null,
        showArchive: true
    });

    // Get maker name for display
    const makerName = computed(() => {
        return props.maker?.title || '';
    });

    // Filter projects based on props
    const filteredProjects = computed(() => {
        let filtered = projects.value;

        // Filter by maker if specified
        if (props.maker) {
            filtered = filtered.filter(project => {
                return project.makers && project.makers.some((maker: any) =>
                    maker.id === props.maker.id || maker.slug === props.maker.slug
                );
            });
        }

        return filtered;
    });

    // Split into running and archive
    const runningProjects = computed(() => {
        return filteredProjects.value.filter((project: any) =>
            project.running === true || project.status === 'running'
        );
    });

    const archiveProjects = computed(() => {
        return filteredProjects.value.filter((project: any) =>
            project.running !== true && project.status !== 'running'
        );
    });
</script>