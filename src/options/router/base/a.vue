<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-12-19 13:49:11
 * @LastEditTime: 2022-12-20 16:24:57
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\src\options\router\base\a.vue
-->
<template>
    <div>
        <div>base - a</div>
        <div>loading: {{ loading }}</div>
        <div v-if="!loading" v-for="item in data">
            <div hover="bg-blue-100">{{ item }}</div>
            <hr />
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { flatTree } from '../../../utils'

const loading = ref(false)
const data = ref([])

const readChromeBookmarks = () => {
    loading.value = true
    const startTime = new Date().getTime()
    chrome.bookmarks.getTree(async (res) => {
        data.value = flatTree(res)
        await handleVisits()
        loading.value = false
        console.log('finish', new Date().getTime() - startTime)
    })
}

const getVisits = (url) => {
    if (!url) {
        return ''
    }
    return chrome.history
        .getVisits({
            url
        })
        .then((res) => {
            return res
        })
}

const handleVisits = async () => {
    for (let i = 0; i < data.value.length; i++) {
        const visits = await getVisits(data.value[i].url)
        data.value[i].visits = visits
        // console.log('x')
    }
    // data.value.forEach(async (item) => {
    //     const visits = await getVisits(item.url)
    //     item.visits = visits
    // })
}

readChromeBookmarks()
</script>
