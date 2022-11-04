<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-10-18 14:17:18
 * @LastEditTime: 2022-11-04 16:16:12
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\src\content-scripts\components\baseSimplebar.vue
-->
<template>
    <div>
        <div ref="element" class=":uno: h-full w-full">
            <slot />
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import SimpleBar from 'simplebar';
import 'simplebar/dist/simplebar.css';

const element = ref(null)

// 滚动
const scrollTop = (offset = 0) => {
    element.value.querySelector('.simplebar-content-wrapper').scrollTop = offset
}
defineExpose({ scrollTop }) // 向父级暴露

onMounted(() => {
    const simpleBar = new SimpleBar(element.value, {
        timeout: 500
    })
})
</script>
<style>
.simplebar-scrollbar:before {
    @apply bg-neutral-500;
}
</style>
