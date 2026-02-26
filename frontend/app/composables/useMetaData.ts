
import { useStatamicStore } from '@/stores/statamic'
export function useMetaData(options: any) {

    const statamic = useStatamicStore()
    const { globals } = storeToRefs(statamic)
    const settings = ref<any>(null)

    if (globals.value) {
        settings.value = globals.value.filter((global: any) => global.handle === 'site_settings')[0]
        const globalTitle = computed(() => settings?.value?.site_title ?? '');
        const globalDescription = computed(() => settings?.value?.site_description ?? '');
        const globalImage = computed(() => settings?.value?.site_image?.permalink ?? '');

        const pageTitle = computed(() => {
            if (!options.title) return '';
            var title = options.title;
            title = title.replace(/~/g, '');
            title = title.replace(/~|&{2,}/g, ' ')
            title = title
            .replace(/\s+/g, ' ')
            .trim();
            return title;
        });

        const pageDescription = computed(() => {
            return options.description || globalDescription || '';
        });

        const imageUrl = computed(() => options.socialImage?.permalink || globalImage.value);
        const socialTitle = computed(() => options.socialTitle || pageTitle.value);
        const socialDescription = computed(() => options.socialDescription || pageDescription.value);

        useHead({
            htmlAttrs: {
            lang: 'nl',
            },
            title: pageTitle.value,
            titleTemplate: (title) => (title ? `${title} | ${globalTitle.value}` : globalTitle.value)
        });

        useSeoMeta({
            title: pageTitle.value,
            description: pageDescription.value,
            ogTitle: socialTitle.value,
            ogDescription: socialDescription.value,
            ogSiteName: globalTitle.value,
            ogType: 'website',
            ogImage: imageUrl.value
        });
    }
}
