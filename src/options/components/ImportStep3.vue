<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-12-16 07:22:47
 * @LastEditTime: 2022-12-16 08:19:14
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\src\options\components\ImportStep3.vue
-->
<template>
    <div>
        <div>应该需要重新读取书签，这里先不处理</div>
        <div><button @click="fetchData">读取插件数据</button></div>
        <div>目前浏览器书签数量：{{ flatData.length }}</div>
        <div>插件共有书签数量：{{ fetchRes.length }}</div>
        <div><button @click="handleData">比对数据</button></div>
        <div>重复数据：{{ duplicateData.length }}</div>
        <div>待写入数据：{{ data.length }}</div>

        <pre v-for="item in duplicateData" class="hover:bg-indigo-100">{{ item }}</pre>
    </div>
</template>
<script setup>
import { ref, inject } from 'vue';

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

const db = inject('db')
const fetchRes = ref([])
const duplicateData = ref([])
const data = ref([])

// 读取插件数据
const fetchData = () => {
    db.find({
        selector: {}
    })
        .then(res => {
            console.log('res', res)
            fetchRes.value = res.docs
        })
}

// 处理即将要写入插件的数据
const handleData = () => {
    // 拿着浏览器数据比对插件数据
    // url 不重复的，放入待写入数据中
    // url 重复的拿出来，人工处理。处理后，放入待写入数据中
    // 最后一次性写入
    duplicateData.value = []
    data.value = []
    props.flatData.forEach((item) => {
        const exits = fetchRes.value.find(bm => bm.url === item.url)
        if (!exits) {
            data.value.push({ ...item })
        } else {
            const duplExits = duplicateData.value.find(bm => bm.url === item.url)
            if (duplExits) {
                console.log('xxx', duplExits);
                duplExits.bookmark.push({ ...item })
            } else {
                duplicateData.value.push({
                    url: item.url,
                    bookmark: [{ ...item }],
                    db: { ...exits }
                })
            }
        }

    })
}

</script>
