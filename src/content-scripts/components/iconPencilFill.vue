<template>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" :width="size" :height="size">
        <path fill="none" d="M0 0h24v24H0z" />
        <path :fill="color"
            d="M12.9 6.858l4.242 4.243L7.242 21H3v-4.243l9.9-9.9zm1.414-1.414l2.121-2.122a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414l-2.122 2.121-4.242-4.242z" />
    </svg>
</template>
<script setup>
// import { defineProps } from 'vue'

const props = defineProps({
    size: {
        type: String,
        default: '16'
    },
    color: {
        type: String,
        default: '#93b9ca'
    }
})
</script>
