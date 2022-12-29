<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-12-26 15:23:52
 * @LastEditTime: 2022-12-29 10:10:26
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\src\options\components\BaseIndexSearchEngine.vue
-->
<template>
    <div>
        <div
            @click="showDialog = true"
            class="flex items-center underline ml-2 cursor-pointer"
        >
            {{
                currentIndex === 'customize'
                    ? 'customize'
                    : engineList[currentIndex].label
            }}
            <div class="i-ri-arrow-down-s-fill"></div>
        </div>
        <common-dialog
            v-model:show="showDialog"
            :title="getI18n('dialog_search_engine_title')"
            :before-close="handleClose"
        >
            <div v-for="(item, index) in engineList">
                <label class="flex items-center p-2" hover="bg-cool-gray-200">
                    <input
                        type="radio"
                        class="mr-2"
                        v-model="chooseIndex"
                        :value="index"
                    />
                    {{ item.label }}
                    <span class="text-cool-gray-400 ml-2 text-sm">{{
                        item.url
                    }}</span>
                </label>
            </div>
            <div>
                <label class="flex items-center p-2" hover="bg-cool-gray-200">
                    <input
                        type="radio"
                        class="mr-2"
                        v-model="chooseIndex"
                        :value="'customize'"
                    />
                    <input
                        type="text"
                        class="border mr-2 px-2 py-1 w-full"
                        v-model="customizeUrl"
                        placeholder="customize url"
                        @focus="chooseIndex = 'customize'"
                    />
                </label>
            </div>
            <div class="text-right p-4">
                <button
                    class="px-4 py-1 ml-2"
                    hover="bg-cool-gray-200"
                    @click="handleClose"
                >
                    {{ getI18n('word_cancel') }}
                </button>
                <button
                    class="px-4 py-1 ml-2 bg-blue-400 text-white"
                    hover="bg-blue-500"
                    @click="handleSubmit"
                >
                    {{ getI18n('word_save') }}
                </button>
            </div>
        </common-dialog>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { getI18n } from '/utils'
import CommonDialog from './commonDialog.vue'

const showDialog = ref(false)
const currentIndex = ref(0) // 当前的搜索引擎
const chooseIndex = ref(0) // 临时选择的搜索引擎（未保存时）
const customizeUrl = ref('https://') // 自定义

const engineList = [
    { label: 'google.com', url: 'https://www.google.com/search?q=' },
    { label: 'duckduckgo.com', url: 'https://duckduckgo.com/?q=' },
    { label: 'bing.com', url: 'https://www.bing.com/search?q=' },
    { label: 'yandex.com', url: 'https://yandex.com/search/?text=' },
    { label: 'baidu.com', url: 'https://baidu.com/s?wd=' }
    // { label: 'sogou.com', url: 'https://www.sogou.com/web?query=' },
]

const fetchData = () => {
    // 获取 自定义的搜素引擎url 和 选中的index
    chrome.storage.sync
        .get(['customizeSearchEngineUrl', 'chooseSearchEngineIndex'])
        .then(({ customizeSearchEngineUrl, chooseSearchEngineIndex }) => {
            customizeUrl.value = customizeSearchEngineUrl || ''
            currentIndex.value = chooseSearchEngineIndex || 0
            chooseIndex.value = chooseSearchEngineIndex || 0
        })
}

// 搜索，供父组件触发搜索事件
const search = (keyword = '') => {
    const url =
        currentIndex.value === 'customize'
            ? customizeUrl.value
            : engineList[currentIndex.value].url
    chrome.tabs.create({
        url: url + keyword
    })
}

// 关闭弹窗
const handleClose = () => {
    showDialog.value = false
    chooseIndex.value = currentIndex.value
}

// 提交设定
const handleSubmit = () => {
    const reg = new RegExp(/http/, 'ig')
    // 没有填写协议的，自动加上https://协议
    if (!reg.test(customizeUrl.value)) {
        customizeUrl.value = `https://${customizeUrl.value}`
    }
    // 如果选择自定义，且自定义内容为空，则选中第一个
    if (
        customizeUrl.value === 'https://' &&
        chooseIndex.value === 'customize'
    ) {
        chooseIndex.value = 0
    }

    chrome.storage.sync
        .set({
            customizeSearchEngineUrl: customizeUrl.value,
            chooseSearchEngineIndex: chooseIndex.value
        })
        .then(() => {
            currentIndex.value = chooseIndex.value
            handleClose()
        })
        .catch((err) => {
            console.error(err)
        })
}

fetchData()

const x = chrome.i18n.getMessage('menu_base_index_search_in')
console.log('x', x)

defineExpose({ search })
</script>
