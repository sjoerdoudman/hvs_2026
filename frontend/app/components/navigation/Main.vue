<template>
    <div v-if="isActive && !loading"  id="navMain" class="fixed w-full h-screen  text-theme-darkgreen z-40">
        <div :class="[ isVisible ? 'max-h-screen' : 'max-h-0' ]" class="absolute w-full h-full left-0 top-0 overflow-hidden bg-theme-lightpink duration-300"></div>
        <div class="relative container--lg w-full h-full flex items-center">
            <ul class="flex-1 flex flex-col py-double-space">
                <li v-for="(link, index) in menu" :key="link.id" :class="[ isVisible ? 'opacity-100' : 'opacity-0 translate-y-2' ]" class="text-center duration-300">
                    <nuxt-link :to="link.page.url" class="inline-block duration-200 hover:-translate-y-1 focus:-translate-y-1 focus:outline-none" :class="[ index == menu.length - 1 ? 'h2' : 'h1' ]">
                        {{ link.page.title }}
                    </nuxt-link>
                </li>
            </ul>
        </div>
        <div
            v-if="settings"
            :class="[ isVisible ? 'opacity-100 delay-25 0' : 'opacity-0 translate-y-2' ]"
            class="absolute w-75 left-0 bottom-double-space container--lg flex flex-col gap-single-space duration-300"
        >
            <p v-if="settings.address" class="whitespace-pre-line" v-html="settings.address"></p>
            <p>
                <a :href="`mailto:${settings.email }`" v-html="settings.email"></a><br>
                <a :href="`tel:${settings.phone }`" v-html="settings.phone"></a>
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useStatamicStore } from '@/stores/statamic';
    import { useUIStore } from '@/stores/ui';
    const store = useStatamicStore();
    const ui = useUIStore();
    const { loading } = useStatamic();
    const menu = ref<any>(null)
    const settings = ref<any>(null)

    const { mainMenu, globals } = storeToRefs(store)
    const { menuOpen } = storeToRefs(ui)
    const isActive = ref(false)
    const isVisible = ref(false)
    const show = ref(false)

    watch (menuOpen, () => {
        if (menuOpen.value) {
            document.body.classList.add('overflow-hidden')
            isActive.value = true
            setTimeout(() => {
                isVisible.value = true
            }, 100)
        } else {
            document.body.classList.remove('overflow-hidden')
            isVisible.value = false
            setTimeout(() => {
                isActive.value = false
            }, 600)
        }
    })

    watchEffect(() => {
        if (mainMenu.value) {
            menu.value = mainMenu.value
        }
        if (globals.value) {
            // filter the global with handle site_settings return
            settings.value = globals.value.filter((global: any) => global.handle === 'site_settings')[0]
        }
    })
</script>