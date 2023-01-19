<template>
    <div
        class="bg-white rounded px-3 py-2 mb-2 text-sm min-h-14 flex items-center justify-between overflow-hidden"
    >
        <div class="truncate">
            <div class="text-cool-gray-500">{{ title }}</div>
            <div class="truncate">
                <slot />
            </div>
        </div>
        <div class="flex-shrink-0 flex items-center justify-center">
            <slot name="side"></slot>
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    title: {
        type: String,
        default: ''
    }
})
</script>
