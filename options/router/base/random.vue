<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-12-20 08:16:38
 * @LastEditTime: 2022-12-20 11:29:44
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\src\options\router\base\random.vue
-->
<template>
    <div>
        <div class="bg-sky-100" v-if="theOne.id">
            <div class="flex items-center">
                <img
                    class="w-6 h-6 border mr-3"
                    :src="getFaviconUrl(theOne.url)"
                    alt=""
                />
                {{ theOne.title }}
            </div>
            <div>{{ theOne.url }}</div>
            <div
                v-if="
                    Array.isArray(theOne.parentTitles) &&
                    theOne.parentTitles.length > 0
                "
            >
                所在目录：{{ theOne.parentTitles?.join(' / ') }}
            </div>
            <div>创建于：{{ formatTimestamp(theOne.dateAdded) }}</div>
        </div>
        <div><button @click="getOne">随机一个</button></div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { flatTree, getFaviconUrl, formatTimestamp } from '/utils'

const loading = ref(false)
const data = ref([])
const theOne = ref({})

const readChromeBookmarks = () => {
    loading.value = true
    chrome.bookmarks.getTree((res) => {
        data.value = flatTree(res)
        loading.value = false
        getOne()
    })
}

// 随机数 res >= min ; res < max;
const random = (max, min = 1) => {
    // https://blog.csdn.net/qq_29132907/article/details/77101665
    return Math.floor(Math.random() * (max - min + 1)) + min
}

const getOne = () => {
    theOne.value = data.value[random(data.value.length)]
}

readChromeBookmarks()
</script>
<script>
export default {
    icon: 'i-ri-shuffle-line'
}
</script>
