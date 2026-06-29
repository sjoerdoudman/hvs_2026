<template>
    <footer
        ref="footerRef"
        :aria-hidden="footerIsFocusable ? 'false' : 'true'"
        :tabindex="footerIsFocusable ? '0' : '-1'"
        :class="[ hideFooter ? 'hidden' : '' ]"
        class="flex flex-col gap-sextuple-space bg-theme-lime"
    >
        <div class="container--lg w-full">
           <div class="grid md:grid-cols-2 lg:grid-cols-4 pt-double-space gap-double-space">
                <div class="md:col-span-2 lg:min-h-60 lg:order-last">
                    <p class="content-column lg:!text-[1.85rem]" v-html="settings?.site_description"></p>
                </div>
                <nav class="md:col-span-1">
                   <ul>
                        <li v-for="link in mainmenu" :key="link.id">
                            <nuxt-link @focus="scrollToBottom()" :to="link.page.url" class="text-[1.25rem] font-bold uppercase hover:text-theme-darkblue focus:text-theme-darkblue focus:outline-none">
                                {{ $softHyphen(link.page.title) }}
                            </nuxt-link>
                        </li>
                   </ul>
                </nav>
                <div class="md:col-span-1 flex flex-col gap-single-space">
                    <div v-if="settings" class="flex flex-col gap-single-space">
                        <p v-if="settings.address" class="whitespace-pre-line" v-html="settings.address"></p>
                        <p>
                            <a v-if="settings.email" @focus="scrollToBottom()" :href="`mailto:${settings.email }`" v-html="settings.email"></a><br>
                            <a v-if="settings.phone" @focus="scrollToBottom()" :href="`tel:${settings.phone }`" v-html="settings.phone"></a>
                        </p>
                    </div>
                    <ul>
                        <li v-for="link in footermenu" :key="link.id">
                            <nuxt-link @focus="scrollToBottom()" :to="link.page.url" class="hover:underline focus:underline underline-offset-4 focus:outline-none">
                                {{ link.page.title }}
                            </nuxt-link>
                        </li>
                    </ul>
                </div>
           </div>
        </div>
        <nuxt-link @focus="scrollToBottom()" to="/" class="flex items-center justify-center py-double-space focus:scale-95 focus:outline-none duration-300">
            <span class="sr-only">Huis Salomon homepage</span>
            <Logo
                aria-hidden
                class="w-[50vw] h-auto fill-current"
            />
        </nuxt-link>
    </footer>
</template>

<script setup lang="ts">
    import { useStatamicStore } from '@/stores/statamic';
    import { useUIStore } from '@/stores/ui';
    const store = useStatamicStore();
    const ui = useUIStore();

    const { mainMenu, footerMenu, globals } = storeToRefs(store)
    const { hideFooter, footerIsFocusable } = storeToRefs(ui);

    const mainmenu = ref<any>(null)
    const footermenu = ref<any>(null)
    const settings = ref<any>(null)

    const scrollToBottom = () => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }

    watchEffect(() => {
        if (mainMenu.value) {
            mainmenu.value = mainMenu.value
        }
        if (footerMenu.value) {
            footermenu.value = footerMenu.value
        }
        if (globals.value) {
            // filter the global with handle site_settings return
            settings.value = globals.value.filter((global: any) => global.handle === 'site_settings')[0]
        }
    })
</script>