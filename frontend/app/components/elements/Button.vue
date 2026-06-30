<template>
    <component :is="tag" v-bind="attrs" v-if="data" class="btn cursor-pointer relative bg-theme-lime text-black font-semibold inline-block group w-fit" :class="size == 'small' ? ' py-1 px-3' : ' py-2 px-4'">
        <div class="absolute w-full h-full left-1/2 -translate-x-1/2 top-0 bg-white max-w-0 overflow-hidden group-hover:max-w-full group-focus:max-w-full transition-all duration-300 rounded-full group-hover:rounded-none"></div>
        <div class="relative flex items-center gap-1">
            <span :class="size == 'small' ? 'text-base' : 'p'">
                {{ data.label }}
            </span>
            <span class="material-symbols-outlined">arrow_forward</span>
        </div>
    </component>
</template>

<script setup lang="ts">
    // @ts-ignore
    import { NuxtLink } from '#components';

    const tag = computed(() => {
        if (!props.data.link && !props.data.url) return 'div';
        if (props.data?.link?.url) return NuxtLink;
        if (props.data?.url) return 'a';
        return 'button';
    });

    const attrs = computed(() => {
        if (!props.data.link && !props.data.url) return;
        if (props.data?.link?.url) return { to: props.data?.link?.url };
        if (props.data?.url) return { href: props.data?.url, target: '_blank', rel: 'noopener noreferrer' };
        return { type: props.data?.type || 'button' };
    });

    const props = withDefaults(defineProps<{
       data?: any;
       size?: string
    }>(), {
        data: null,
        size: 'default'
    })
    // console.log('Button data', props.data)
</script>