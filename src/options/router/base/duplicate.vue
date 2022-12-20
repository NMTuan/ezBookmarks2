<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-12-19 13:20:24
 * @LastEditTime: 2022-12-20 08:00:35
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\src\options\router\base\duplicate.vue
-->
<template>
    <div>
        <div>loading: false</div>
        <div>您的浏览器书签中，有 {{ duplicateData.length }} 条网址相同的书签</div>
        <div class="bg-emerald-100 p-4 flex">
            <div v-for="item in current.data" class="flex-1 overflow-hidden" @click="handleChoose(item.id)">
                <div>{{ item.id }}</div>
                <div>标题：{{ item.title }}</div>
                <div>创建时间：{{ formatTimestamp(item.dateAdded) }}</div>
                <div>所属文件夹：{{ item.parentTitles.join(' / ') || '-' }}</div>
                <div>{{ item.id === chooseId ? '√' : '' }}</div>
            </div>
        </div>
        <div>注意：您的选择将直接修改浏览器中的书签</div>
        <div class="bg-emerald-200">
            <div @click="handleNext">都保留（跳过）</div>
            <div @click="removeAll">都不要</div>
            <div @click="submitChoose">保留已选择（{{ chooseId }}）</div>
        </div>

        <!-- <div>
            <pre>{{ duplicateData }}</pre>
        </div> -->
    </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { flatTree, findDuplicate, formatTimestamp } from '../../../utils';

const loading = ref(false)
const duplicateData = ref([])
const chooseId = ref('')

const current = computed(() => {
    return duplicateData.value[0] || { data: {} }
})

const readChromeBookmarks = () => {
    loading.value = true
    chrome.bookmarks.getTree((res) => {
        // console.log(res);
        let data = flatTree(res)
        duplicateData.value = findDuplicate(data)
        loading.value = false
    })
}

const handleChoose = (id) => {
    chooseId.value = id
}

// 处理下一个（跳过）
const handleNext = () => {
    duplicateData.value.shift()
}

// 提交选择
const submitChoose = async () => {
    if (!chooseId.value) {
        return
    }

    for (let i = 0; i < current.value.data.length; i++) {
        if (current.value.data[i].id !== chooseId.value) {
            await chrome.bookmarks.remove(current.value.data[i].id)
        }
    }
    // 从重复数据中把当前条目删掉
    chooseId.value = ''
}

// 全删除
const removeAll = async () => {
    for (let i = 0; i < current.value.data.length; i++) {
        await chrome.bookmarks.remove(current.value.data[i].id)
    }
    // 从重复数据中把当前条目删掉
    chooseId.value = ''
}



readChromeBookmarks()

</script>
<script>
export default {
    icon: 'i-ri-file-copy-2-line'
}
</script>
