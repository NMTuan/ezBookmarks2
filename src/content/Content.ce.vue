<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-11-22 17:17:10
 * @LastEditTime: 2022-12-05 13:45:17
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\src\content\Content.ce.vue
-->
<template>
    <iframe class="
    fixed inset-0
    w-full h-full
    backdrop-blur-sm
    " style="z-index:9999" :src="src" frameborder="0">
    </iframe>
</template>
<script setup>
import { ref } from 'vue'
const src = ref('')
const srcUrl = chrome.runtime.getURL('pages/dialog.html')
src.value = srcUrl

document.querySelector('html').style.overflow = 'hidden'
document.body.style.overflow = 'hidden'

</script>
<style>
@unocss-placeholder
</style>


