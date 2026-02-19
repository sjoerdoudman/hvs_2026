<template>
    <footer
        :aria-hidden="footerIsFocusable ? 'false' : 'true'"
        inert
        ref="footerRef"
        :class="[ hideFooter ? 'hidden' : '' ]"
        class="flex flex-col gap-sextuple-space"
    >
        <div class="container--lg w-full">
           <div class="grid grid-cols-4 pt-double-space">
                <nav class="col-span-1">
                   <ul>
                        <li>
                            <nuxt-link to="/makers" class="text-[1.25rem] font-bold uppercase hover:text-theme-darkblue focus:text-theme-darkblue">Makers</nuxt-link>
                        </li>
                         <li>
                            <nuxt-link to="/over-ons" class="text-[1.25rem] font-bold uppercase hover:text-theme-darkblue focus:text-theme-darkblue">Over Ons</nuxt-link>
                        </li>
                        <li>
                            <nuxt-link to="/samenwerken" class="text-[1.25rem] font-bold uppercase hover:text-theme-darkblue focus:text-theme-darkblue">Samenwerken</nuxt-link>
                        </li>
                        <li>
                            <nuxt-link to="/nieuws" class="text-[1.25rem] font-bold uppercase hover:text-theme-darkblue focus:text-theme-darkblue">Nieuws</nuxt-link>
                        </li>
                   </ul>
                </nav>
                <div class="col-span-1 flex flex-col gap-single-space">
                    <p>
                        Huis Salomon<br>
                        Straatnaam 100<br>
                        4124 AB Amsterdam
                    </p>
                    <p>
                        info@huissalomon.nl<br>
                        020 4025218
                    </p>
                    <ul>
                        <li><nuxt-link to="/pers">Pers</nuxt-link></li>
                        <li><nuxt-link to="/colophon">Colophon</nuxt-link></li>
                        <li><nuxt-link to="/privacy">Privacy</nuxt-link></li>
                    </ul>
                </div>
                <div class="col-span-2">
                    <p class="content-column !text-[1.85rem]">
                        De makers van Huis Salomon zijn ieder op hun eigen manier, eigen plek en eigen onderzoek gericht op het stimuleren van professionele twijfel. De verhalen die ze ontdekken worden gedeeld in artistieke vormen en omgezet in trainingen waarin medemenselijkheid en radicale empathie centraal staan.
                    </p>
                </div>
           </div>
        </div>
        <nuxt-link to="/" class="flex items-center justify-center py-double-space">
            <span class="sr-only">Huis Salomon home</span>
            <Logo
                aria-hidden
                class="w-[50vw] h-auto fill-current"
            />
        </nuxt-link>
    </footer>
</template>

<script setup lang="ts">
    import { useUIStore } from '@/stores/ui';
    const ui = useUIStore();
    const { hideFooter, footerIsFocusable } = storeToRefs(ui);
</script>