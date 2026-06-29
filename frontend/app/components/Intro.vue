<template>
    <div :class="[ container ? 'container--md' : '']">
        <div class="title-block">
            <p class="intro text-highlight">
                {{ strippedDescription }}
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
    const props = withDefaults(defineProps<{
        description: string;
        container?: boolean;
    }>(), {
        description: '',
        container: true
    })

    const strippedDescription = computed(() => {
        return props.description.replace(/<p>/g, '').replace(/<\/p>/g, '')
    })
</script>