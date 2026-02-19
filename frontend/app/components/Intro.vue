<template>
    <div class="container--lg">
        <div class="title-block">
            <p>
                {{ strippedDescription }}
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
    const props = withDefaults(defineProps<{
        description: string;
    }>(), {
        description: '',
    })

    const strippedDescription = computed(() => {
        return props.description.replace(/<p>/g, '').replace(/<\/p>/g, '')
    })
</script>