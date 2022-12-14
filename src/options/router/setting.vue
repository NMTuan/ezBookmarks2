<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-12-14 14:38:33
 * @LastEditTime: 2022-12-14 16:50:15
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\src\options\router\setting.vue
-->
<template>
    <div>
        <div>setting</div>
        <div class="bg-red-100 text-center">书签总计: {{ flatData.length }}</div>
        <div class="bg-red-100 text-center">去重后: {{ removeDuplicateData.length }}</div>
        <div class="bg-red-100 text-center">loading: {{ loading }}</div>
        <div class="bg-red-100 text-center"><button class="border bg-red-400 p-2" @click="importData">导入数据</button>
        </div>
        <div v-for="item in removeDuplicateData" class="flex items-center justify-between p-1" hover="bg-sky-100">
            <div>{{ item.title }}</div>
            <div>{{ item.tags }}</div>
        </div>
    </div>
</template>
<script setup>
import { inject, ref } from 'vue'
const db = inject('db')
const flatData = ref([])
const removeDuplicateData = ref([])
const loading = ref(false)

// 拍平，变成一维数组
const flatTree = (boomark = [], tags = []) => {
    return boomark.reduce((total, item) => {
        if (item.children && item.children.length > 0) {
            // 如果有 children，把当前 title 插入 tags 中，继续递归
            const titles = [...tags]
            if (item.title && item.id !== '0' && item.parentId !== '0') {
                titles.push(item.title)
            }
            // 把递归回来的数据，合并到 total 中
            total = total.concat(flatTree(item.children, titles))
        } else if (item.url) {
            // 没有 children 并且有 url，则当一条数据插入 total
            total.push({
                title: item.title,
                url: item.url,
                date_created: item.dateAdded,
                date_updated: item.dateAdded,
                hits: 0,
                tags: [...tags]
            })
        }
        return total
    }, [])
}

// 去重
const removeDuplicate = (data) => {
    return data.reduce((total, item) => {
        const exits = total.find(tag => tag.url === item.url)
        if (exits) {
            // url 已经存在

            // 记录所有重复数据，让用户自行处理
            if (Array.isArray(exits.duplicate) && exits.duplicate.length > 0) {
                // 存在，则直接插入 item
                exits.duplicate.push(item)
            } else {
                // 不存在，复制一份插入自己，同时插入 item
                const exitsData = { ...exits }
                exits.duplicate = []
                exits.duplicate.push(exitsData)
                exits.duplicate.push(item)
            }
            // 同时把 tags 合并到主数据
            const tags = exits.tags.concat(item.tags)
            exits.tags = Array.from(new Set(tags))
        } else {
            // 否则插入
            total.push(item)
        }
        return total
    }, [])
}

const importData = () => {
    loading.value = true
    db.bulkDocs(removeDuplicateData.value)
        .then(res => {
            loading.value = false
            console.log('[res]', res)
        })
        .catch(err => {
            loading.value = false
            console.error('[error]', err)
        })
}

chrome.bookmarks.getTree((res) => {
    let data = flatTree(res)
    flatData.value = data
    data = removeDuplicate(data)
    removeDuplicateData.value = data
})
</script>
