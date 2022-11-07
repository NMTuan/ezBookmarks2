<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-11-04 16:32:36
 * @LastEditTime: 2022-11-07 15:48:25
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\src\content-scripts\components\iconCloseLine.vue
-->
<template>

    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" :width="size" :height="size">
        <path fill="none" d="M0 0h24v24H0z" />
        <path :fill="color"
            d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
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
