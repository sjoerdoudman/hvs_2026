<template>
    <section v-if="data" class="last:mb-quadruple-space">
        <div class="container--lg flex flex-col gap-double-space md:gap-triple-space">
            <div class="title-block">
                <h2 class="text-highlight uppercase font-bold" v-html="data.title"></h2>
            </div>
            <div class="grid md:grid-cols-3 2xl:grid-cols-2 gap-x-double-space gap-y-triple-space">
                <TeaserNews v-for="item in paginatedNews" :data="item"/>
            </div>

            <!-- Pagination controls -->
            <div v-if="data.pagination && totalPages > 1" class="flex items-center justify-center gap-6 mt-double-space">
                <button @click="goToPage(currentPage - 1)" :aria-label="`Vorige pagina`" :disabled="currentPage === 1" :class="[ currentPage === 1 ? 'opacity-20 cursor-default' : 'opacity-100 cursor-pointer']">
                    <span class="material-symbols-outlined text-theme-lime cursor-pointer">arrow_back</span>
                </button>
                <div class="flex gap-2">
                    <button
                        v-for="page in totalPages"
                        :key="page"
                        @click="goToPage(page)"
                        :disabled="currentPage === page"
                        :aria-label="`Pagina ${page} van ${totalPages}`"
                        :class="[
                            'px-2 py-1 border-b-2 hover:border-current focus:border-current focus:outline-none cursor-pointer',
                            currentPage === page ? 'text-white border-current' : 'text-theme-lime border-transparent'
                        ]"
                    >
                        {{ page }}
                    </button>
                </div>
                <button @click="goToPage(currentPage + 1)" :aria-label="`Volgende pagina`" :disabled="currentPage === totalPages" :class="[ currentPage === totalPages ? 'opacity-20 cursor-default' : 'opacity-100 cursor-pointer']">
                    <span class="material-symbols-outlined text-theme-lime cursor-pointer">arrow_forward</span>
                </button>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
    import { useStatamicStore } from '@/stores/statamic'
    const store = useStatamicStore();
    const news = computed(() => store.news);
    const route = useRoute();
    const router = useRouter();

    interface NewsList {
        title: string;
        maxItems?: number;
        pagination?: boolean;
    }

    const props = withDefaults(defineProps<{
        data?: NewsList | null;
    }>(),{
        data: null,
    })

    // Get current page from query param (default to 1)
    const currentPage = computed(() => {
        const pageParam = parseInt(route.query.page as string) || 1;
        return props.data?.pagination ? pageParam : 1;
    });

    // Calculate items per page
    const itemsPerPage = computed(() => {
        if (!props.data?.pagination) return 4; // Always show 4 if no pagination
        return props.data?.maxItems || 6; // Use maxItems if pagination enabled, default 2
    });

    // Calculate total pages
    const totalPages = computed(() => {
        return Math.ceil(news.value.length / itemsPerPage.value);
    });

    // Get paginated news items
    const paginatedNews = computed(() => {
        if (!props.data?.pagination) {
            // No pagination - show first 6 items
            return news.value.slice(0, 6);
        }

        // Pagination enabled - calculate slice based on current page
        const start = (currentPage.value - 1) * itemsPerPage.value;
        const end = start + itemsPerPage.value;
        return news.value.slice(start, end);
    });

    // Navigation function
    const goToPage = (page: number) => {
        if (page === currentPage.value) return;

        if (props.data?.pagination) {
            // Update query param for paginated view
            router.push({
                query: { ...route.query, page: page.toString() }
            });
        } else {
            // For non-paginated blocks, just scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };
</script>