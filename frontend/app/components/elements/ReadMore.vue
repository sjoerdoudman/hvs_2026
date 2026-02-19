<template>
    <div v-if="data">
        <div :id="uniqueId" :class="[ open ? 'max-h-screen lg:max-h-125' : 'max-h-0' ]" class="overflow-hidden duration-700">
            <p class="block mb-4" v-html="data.text"></p>
        </div>
        <button :aria-controls="uniqueId" aria-label="Klap uit om meer te lezen" :aria-expanded="open" @click="open = !open" class="p text-theme-lime flex gap-2 items-center">
            <span>Lees meer</span>
            <span class="duration-700" :class="[ open ? 'rotate-225' : '' ]">+</span>
        </button>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps({
        data: {
            type: Object,
            required: true
        }
    })
    const open = ref(false);
    const uniqueId = `readmore-${useId()}`;
</script>