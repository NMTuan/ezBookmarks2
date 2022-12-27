<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-12-26 15:23:52
 * @LastEditTime: 2022-12-27 08:17:40
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
            {{ engineList[choose].label }}
            <div class="i-ri-arrow-down-s-fill"></div>
        </div>
        <common-dialog v-model:show="showDialog" title="333">
            <div v-for="(item, index) in engineList">
                <label class="flex items-center p-2" hover="bg-cool-gray-200">
                    <input
                        type="radio"
                        class="mr-2"
                        v-model="choose"
                        :value="index"
                    />
                    {{ item.label }}
                    <span class="text-cool-gray-400 ml-2 text-sm">{{
                        item.url
                    }}</span>
                </label>
            </div>
            <label class="flex items-center p-2" hover="bg-cool-gray-200">
                <input
                    type="radio"
                    class="mr-2"
                    v-model="choose"
                    :value="'customize'"
                />
                <input
                    type="text"
                    class="border mr-2 p-2"
                    v-model="customize.label"
                    placeholder="customize name"
                    @focus="chooseCustomize"
                />
                <input
                    type="text"
                    class="border mr-2 p-2"
                    v-model="customize.url"
                    placeholder="customize url"
                    @focus="chooseCustomize"
                />
            </label>
            <div>
                {{ choose }}
            </div>
        </common-dialog>
    </div>
</template>
<script setup>
import { ref, defineExpose } from 'vue'
import CommonDialog from './commonDialog.vue'

const showDialog = ref(false)
const choose = ref(0)

const engineList = [
    { label: 'google.com', url: 'https://www.google.com/search?q=' },
    { label: 'duckduckgo.com', url: 'https://duckduckgo.com/?q=' },
    { label: 'bing.com', url: 'https://www.bing.com/search?q=' },
    { label: 'baidu.com', url: 'https://baidu.com/s?wd=' },
    { label: 'yandex.com', url: 'https://yandex.com/search/?text=' }
    // { label: 'sogou.com', url: 'https://www.sogou.com/web?query=' },
]
const customize = ref({})

const fetchData = () => {
    // 获取 自定义的搜素引擎 和 选中的值
    chrome.storage.sync
        .get(['customizeSearchEngine', 'chooseSearchEngine'])
        .then(({ customizeSearchEngine, chooseSearchEngine }) => {
            if (customizeSearchEngine) {
                engineList.value.push(customizeSearchEngine)
            } else {
                engineList.value.push({ label: '', url: '' })
            }
            if (chooseSearchEngine) {
                choose.value = chooseSearchEngine || 0
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

// 选择 自定义
const chooseCustomize = () => {
    console.log('focus')
    choose.value = 'customize'
}

fetchData()

defineExpose({ search })
</script>
