<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-12-15 08:20:45
 * @LastEditTime: 2022-12-15 14:25:16
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\src\options\components\ImportStep1.vue
-->
<template>
    <div>
        <div>loading：{{ loading }}</div>
        <button @click="readChromeBookmarks">读取浏览器书签</button>
        <div>目前浏览器书签数量：{{ flatData.length }}</div>
        <div>重复数量：{{ duplicateData.length }}</div>
        <!-- <div v-for="item in duplicateData">
            <pre class="hover:bg-sky-200">{{ item }}</pre>
        </div> -->
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { flatTree, findDuplicate } from '../../utils'

const props = defineProps({
    treeData: {
        type: Array,
        default() {
            return []
        }
    },
    flatData: {
        type: Array,
        default() {
            return []
        }
    },
    duplicateData: {
        type: Array,
        default() {
            return []
        }
    },
})
const emits = defineEmits([
    'update:treeData',
    'update:flatData',
    'update:duplicateData'
])

const loading = ref(false)

const readChromeBookmarks = () => {
    loading.value = true
    chrome.bookmarks.getTree((res) => {
        console.log(res);
        emits('update:treeData', res)
        let data = flatTree(res)
        emits('update:flatData', data)
        emits('update:duplicateData', findDuplicate(data))
        loading.value = false
    })
}
</script>
