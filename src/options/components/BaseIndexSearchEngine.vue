<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-12-26 15:23:52
 * @LastEditTime: 2022-12-26 16:38:38
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\src\options\components\BaseIndexSearchEngine.vue
-->
<template>
    <div>
        <div
            @click="handleShow"
            class="flex items-center underline ml-2 cursor-pointer"
        >
            {{ current.label }}
            <div class="i-ri-arrow-down-s-fill"></div>
        </div>
        <common-dialog v-model:show="showDialog" title="333">
            123
        </common-dialog>
    </div>
</template>
<script setup>
import { ref, defineExpose } from 'vue'
import CommonDialog from './commonDialog.vue'

const current = ref({})
const showDialog = ref(false)

const engineList = [
    { label: 'google.com', url: 'https://www.google.com/search?q=' },
    { label: 'duckduckgo.com', url: 'https://duckduckgo.com/?q=' },
    { label: 'bing.com', url: 'https://www.bing.com/search?q=' },
    { label: 'baidu.com', url: 'https://baidu.com/s?wd=' },
    { label: 'yandex.com', url: 'https://yandex.com/search/?text=' }
    // { label: 'sogou.com', url: 'https://www.sogou.com/web?query=' },
]

const fetchData = () => {
    chrome.storage.sync.get(['searchEngine']).then(({ searchEngine }) => {
        if (searchEngine) {
            current.value = searchEngine
        } else {
            current.value = engineList[0]
        }
    })
}

const search = (keyword = '') => {
    chrome.tabs.create({
        url: current.value.url + keyword
    })
}

const handleShow = () => {
    showDialog.value = true
}

fetchData()

defineExpose({ search })
</script>
