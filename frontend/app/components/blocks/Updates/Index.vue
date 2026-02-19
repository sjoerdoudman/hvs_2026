<template>
    <!-- Updates Block -->
    <section v-if="filteredNews.length > 0" class="last:pb-triple-space">
        <div class="container--lg flex flex-col gap-triple-space">
            <div class="title-block">
                <h2 class="uppercase font-bold" v-text="`Updates`"></h2>
            </div>
            <ul class="flex flex-col gap-single-space divide-y-2 divide-white border-t-2 border-white py-single-space">
                <li v-for="newsItem in filteredNews" :key="newsItem.id">
                    <BlocksUpdatesItem :data="newsItem"/>
                </li>
            </ul>
        </div>
    </section>
</template>

<script setup lang="ts">
    import { useStatamicStore } from '@/stores/statamic';

    const store = useStatamicStore();
    const { news } = storeToRefs(store);

    interface Maker {
        id: string;
        title: string;
        slug: string;
    }

    const props = withDefaults(defineProps<{
        maker?: Maker | null;
    }>(), {
        maker: null
    });

    // Filter news by maker if provided, otherwise get all news
    const filteredNews = computed(() => {
        let filtered = news.value;

        // Filter by maker if specified
        if (props.maker) {
            filtered = filtered.filter((newsItem: any) => {
                // Check if news has makers array and contains current maker
                return newsItem.makers && newsItem.makers.some((maker: any) =>
                    maker.id === props.maker?.id || maker.slug === props.maker?.slug
                );
            });
        }

        // Sort by date (newest first) - assuming news has a 'date' field
        filtered.sort((a: any, b: any) => {
            const dateA = new Date(a.date || a.created_at);
            const dateB = new Date(b.date || b.created_at);
            return dateB.getTime() - dateA.getTime();
        });

        // Return latest 6 items
        return filtered.slice(0, 6);
    });
</script>