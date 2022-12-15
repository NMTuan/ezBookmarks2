<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-12-15 14:06:49
 * @LastEditTime: 2022-12-15 15:56:14
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\src\options\components\ImportStep2.vue
-->
<template>
    <div>
        <div class="bg-emerald-200">{{ current.url }}
            <a :href="current.url" target="_blank">访问</a>
        </div>
        <div class="bg-emerald-100 p-4 flex">
            <div v-for="item in current.data" class="flex-1 overflow-hidden" @click="handleChoose(item.id)">
                <div>{{ item.id }}</div>
                <div>标题：{{ item.title }}</div>
                <div>创建时间：{{ formatTimestamp(item.dateAdded) }}</div>
                <div>所属文件夹：{{ item.parentTitles.join(' / ') }}</div>
                <div>{{ item.id === chooseId ? '√' : '' }}</div>
            </div>
        </div>
        <div class="bg-emerald-200">
            <div @click="handleNext">都保留（跳过）</div>
            <div @click="removeAll">都不要</div>
            <div @click="submitChoose">保留已选择（{{ chooseId }}）</div>
        </div>
        <div class="bg-emerald-300">
            注意：此操作会直接修改你现在的书签数据。
        </div>
    </div>
</template>
<script setup>
import { ref, computed } from 'vue';

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

const currentIndex = ref(0)    // 当前处理索引
const chooseId = ref('')

// 当前处理的数据
const current = computed(() => {
    return props.duplicateData[currentIndex.value] || {}
})


// 格式化时间戳
const formatTimestamp = (ts) => {
    const date = new Date(ts)
    return date.toLocaleString()
}

const handleChoose = (id) => {
    chooseId.value = id
}
// 处理下一个（跳过）
const handleNext = () => {
    currentIndex.value++
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
    emits('update:duplicateData', props.duplicateData.filter(item => item.url !== current.value.url))
    chooseId.value = ''
}

// 全删除
const removeAll = async () => {
    for (let i = 0; i < current.value.data.length; i++) {
        await chrome.bookmarks.remove(current.value.data[i].id)
    }
    // 从重复数据中把当前条目删掉
    emits('update:duplicateData', props.duplicateData.filter(item => item.url !== current.value.url))
    chooseId.value = ''
}

</script>
