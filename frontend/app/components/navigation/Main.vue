<template>
    <div v-if="isActive"  id="navMain" class="fixed w-full h-screen  text-theme-darkgreen z-40">
        <div :class="[ isVisible ? 'max-h-screen' : 'max-h-0' ]" class="absolute w-full h-full left-0 top-0 overflow-hidden bg-theme-lightpink duration-300"></div>
        <div class="relative container--lg w-full h-full flex items-center">
            <ul class="flex-1 flex flex-col py-double-space">
                <li :class="[ isVisible ? 'opacity-100' : 'opacity-0 translate-y-2' ]" class="text-center duration-300">
                    <nuxt-link to="/makers" class="inline-block h1 duration-200 hover:-translate-y-1 focus:-translate-y-1 focus:outline-none">
                        Makers
                    </nuxt-link>
                </li>
                <li :class="[ isVisible ? 'opacity-100 delay-50' : 'opacity-0 translate-y-2' ]" class="text-center duration-300">
                    <nuxt-link to="/samenwerken" class="inline-block h1 duration-200 hover:-translate-y-1 focus:-translate-y-1 focus:outline-none">
                        Samenwerken
                    </nuxt-link>
                </li>
                <li :class="[ isVisible ? 'opacity-100 delay-100' : 'opacity-0 translate-y-2' ]" class="text-center duration-300">
                    <nuxt-link to="/over-ons" class="inline-block h1 duration-200 hover:-translate-y-1 focus:-translate-y-1 focus:outline-none">
                        Over ons
                    </nuxt-link>
                </li>
                <li :class="[ isVisible ? 'opacity-100 delay-150' : 'opacity-0 translate-y-2' ]" class="text-center duration-300">
                    <nuxt-link to="/nieuws" class="inline-block h1 duration-200 hover:-translate-y-1 focus:-translate-y-1 focus:outline-none">
                        Nieuws
                    </nuxt-link>
                </li>
                <li :class="[ isVisible ? 'opacity-100 delay-200' : 'opacity-0 translate-y-2' ]" class="text-center duration-300">
                    <nuxt-link to="/pers" class="inline-block h2 duration-200 hover:-translate-y-1 focus:-translate-y-1 focus:outline-none">
                        Pers
                    </nuxt-link>
                </li>
            </ul>
        </div>
        <div
            :class="[ isVisible ? 'opacity-100 delay-25 0' : 'opacity-0 translate-y-2' ]"
            class="absolute w-75 left-0 bottom-double-space container--lg flex flex-col gap-single-space duration-300"
        >
            <p>
                Huis Salomon<br>
                Straatnaam 100<br>
                4124 AB Amsterdam
            </p>
            <p>
                huissalomon.nl<br>
                020 4025218
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
    const ui = useUIStore();
    const { menuOpen } = storeToRefs(ui)
    const isActive = ref(false)
    const isVisible = ref(false)

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
</script>