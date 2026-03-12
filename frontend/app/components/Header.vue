<template>
    <header class="fixed w-screen top-0 left-0 h-18 lg:h-25 flex items-center z-50">
        <!-- Radial gradient  -->
        <div :class="[ menuOpen ? 'opacity-0' : 'opacity-100', `from-theme-${theme}/50`]" class="absolute pointer-events-none left-0 top-0 w-screen h-60 bg-linear-to-b to-transparent duration-500"></div>
        <div class="container--lg w-full">
            <a href="#content" class="focus:outline-none absolute opacity-0 focus:opacity-100 -left-[200vw] focus:left-1/2 top-1/2 translate-x-0 focus:-translate-x-1/2 -translate-y-1/2 z-10 py-3 px-6 bg-highlight text-black shadow-md">Direct naar de inhoud</a>
            <button :aria-label="menuOpen ? 'Sluit menu' : 'Open menu'" @click="toggleMenuOpen(!menuOpen)" class="relative w-10 h-4 z-10 cursor-pointer focus:outline-none focus:scale-85 hover:scale-85 duration-300" >
                <div ref="barOne" :class="menuOpen ? 'bg-theme-darkgreen top-1/2 -rotate-45' : 'bg-highlight top-0'" class="absolute -translate-y-1/2 w-0 h-0.75 duration-300"></div>
                <div ref="barTwo" :class="menuOpen ? 'bg-theme-darkgreen -rotate-45' : 'bg-highlight'" class="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0.75 duration-300"></div>
                <div ref="barThree" :class="menuOpen ? 'bg-theme-darkgreen top-1/2 rotate-45' : 'bg-highlight top-full'" class="absolute left-0 -translate-y-1/2 w-0 h-0.75 duration-300"></div>
            </button>
            <div :class="[ isHome && !isEndHeroHome && !menuOpen ? 'w-screen h-screen' : 'w-full h-full' ]" class="absolute top-0 left-0 flex items-center justify-center duration-500">
                <h1 v-if="isHome" class="relative inline-block">
                    <div :class="menuOpen || isEndHeroHome ? 'opacity-0' : 'opacity-100'" class="absolute pointer-events-none left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-screen h-screen bg-radial from-black/20 to-transparent duration-200"></div>
                    <Logo
                        :class="[
                            menuOpen ? 'fill-theme-darkgreen' : 'fill-highlight',
                            !isEndHeroHome && !menuOpen ? '!fill-white' : '',
                            !isEndHeroHome && !menuOpen ? 'w-[70vw] md:w-[50vw] h-[20vh] md:h-[15vw] -translate-y-5' : 'w-60 h-10'
                        ]"
                        class="duration-500">
                    </Logo>
                </h1>
                <nuxt-link v-else to="/" aria-label="Naar de homepage" class="relative inline-block focus:outline-none focus:scale-95 hover:scale-95 duration-300">
                    <Logo
                        :class="[
                            menuOpen ? 'fill-theme-darkgreen' : 'fill-highlight',
                        ]"
                        class="duration-500 fill-white w-60 h-10">
                    </Logo>
                </nuxt-link>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
    import gsap from 'gsap';
    import { useUIStore } from '@/stores/ui';

    const ui = useUIStore();
    const { toggleMenuOpen } = ui;
    const { menuOpen, isHome, isEndHeroHome, theme } = storeToRefs(ui)

    const barOne = ref(null);
    const barTwo = ref(null);
    const barThree = ref(null);
    const initTransition = () => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!prefersReducedMotion) {
            if (!barOne.value && !barTwo.value && !barThree.value) return
            gsap.to([barOne.value], {
                width: '100%',
                duration: 0.6,
                delay: 0.5
            })
            gsap.to([barTwo.value], {
                width: '100%',
                duration: 0.6,
                delay: 0.6
            })
            gsap.to([barThree.value], {
                width: '100%',
                duration: 0.6,
                delay: 0.7
            })
        }
    }
    onMounted(() => {
        initTransition()
    })
    watch (isHome, () => {
        console.log('home changed')
    })
</script>