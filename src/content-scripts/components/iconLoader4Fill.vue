<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-11-04 16:32:36
 * @LastEditTime: 2022-11-11 15:13:57
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\src\content-scripts\components\iconLoader4Fill.vue
-->
<template>

    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" :width="size" :height="size">
        <path fill="none" d="M0 0h24v24H0z" />
        <path :fill="color" d="M18.364 5.636L16.95 7.05A7 7 0 1 0 19 12h2a9 9 0 1 1-2.636-6.364z" />
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
        default: '#d4d4d4'
    }
})
</script>
