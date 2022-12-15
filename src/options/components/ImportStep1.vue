<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-12-15 08:20:45
 * @LastEditTime: 2022-12-15 08:26:33
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\src\options\components\ImportStep1.vue
-->
<template>
    <div>
        <div>loading：{{ loading }}</div>
        <button @click="readChromeBookmarks">读取浏览器书签</button>
        <div>目前浏览器书签数量：{{ chromeBookmarksData.length }}</div>
    </div>
</template>
<script setup>
import { ref } from 'vue';

const loading = ref(false)
const chromeBookmarksData = ref([])

const readChromeBookmarks = () => {
    console.log('[readChromeBookmarks]');
    loading.value = true
    chrome.bookmarks.getTree((res) => {
        console.log(res);
        loading.value = false
        chromeBookmarksData.value = res
        // let data = flatTree(res)
        // flatData.value = data
        // data = removeDuplicate(data)
        // removeDuplicateData.value = data
    })

}
</script>
