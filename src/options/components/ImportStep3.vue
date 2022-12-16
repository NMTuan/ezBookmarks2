<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-12-16 07:22:47
 * @LastEditTime: 2022-12-16 13:38:58
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
        <div class="bg-emerald-200">{{ current.url }} </div>

        <div class="bg-emerald-100 flex justify-around">
            <pre>{{ current.db }}</pre>
            <pre>{{ current.bookmark }}</pre>
        </div>
        <div class="bg-emerald-100 px-4">
            <div><input type="text" v-model="current.db.title"></div>
            <div><input type="text" v-model="current.db.url"></div>
            <div><input type="text" v-model="tags"></div>
            <div><button @click="handleDuplcate">保存</button></div>
        </div>
        <div>
            <button @click="submit">导入</button>
        </div>

        <pre v-for="item in data" class="hover:bg-indigo-100">{{ item }}</pre>
    </div>
</template>
<script setup>
import { ref, inject, computed, watch, watchEffect, nextTick } from 'vue';

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
const currentId = ref(0)

const current = computed(() => {
    return duplicateData.value[currentId.value] || { db: {} }
})

const tags = ref('')

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
            data.value.push({
                title: item.title,
                url: item.url,
                date_created: item.dateAdded,
                date_updated: item.dateAdded,
                hits: 0,
                tags: item.parentTitles.join('/') ? [item.parentTitles.join('/')] : []
            })
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

// 保存当前重复数据
const handleDuplcate = () => {
    const newData = { ...current.value.db }
    data.value.push(newData)
    duplicateData.value.shift()
}

// 导入
const submit = () => {
    db.bulkDocs(data.value)
        .then(res => {
            console.log('[res]', res)
        })
        .catch(err => {
            console.error('[err]', err)
        })
}

watch(current, () => {
    tags.value = current.value.db.tags?.join(',')
})

watch(tags, () => {
    current.value.db.tags = tags.value?.replace(/\s/g, ' ').split(/[,， ]/)
        .reduce((total, tag) => {
            // 存在且不重复
            if (tag && total.indexOf(tag) < 0) {
                total.push(tag)
            }
            return total
        }, [])
})

</script>
