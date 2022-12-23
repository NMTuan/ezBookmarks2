<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-12-21 11:03:07
 * @LastEditTime: 2022-12-23 08:27:31
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\src\options\router\base\index.vue
-->
<template>
    <div class="relative">
        <div class="w-full backdrop-blur sticky left-0 top-14 right-0 z-10">
            <div class="flex">
                <input
                    ref="input"
                    class="flex-1 border-2 px-3 py-3 rounded"
                    type="text"
                    v-model="q"
                />
            </div>
            <div class="py-2 px-3 text-xs">
                共{{ q ? '找到' : '' }} {{ queryData.length }} 个书签：
            </div>
        </div>

        <div v-if="!baseStore.loading">
            <BaseIndexListItem
                v-for="item in queryData.slice(0, page * limit)"
                :item="item"
                :q="q.trim()"
            ></BaseIndexListItem>
        </div>
        <!-- <div>
            <pre
                v-for="item in queryData"
                class="overflow-hidden"
                hover="bg-blue-100"
                >{{ item }}</pre
            >
        </div> -->
    </div>
</template>
<script setup>
import { ref, computed, defineExpose, onMounted } from 'vue'
import { throttle } from 'throttle-debounce'
import { useBaseStore } from '@/store/base'
import BaseIndexListItem from '@/options/components/BaseIndexListItem.vue'

const baseStore = useBaseStore()
const input = ref('')
const q = ref('')
const page = ref(1)
const limit = ref(10)

// 排序后的数据
const sortedData = computed(() => {
    return [...baseStore.bookmarksFlat].sort((a, b) => {
        return b.dateAdded - a.dateAdded
    })
})

// 查询后的数据
const queryData = computed(() => {
    page.value = 1
    if (q.value.trim() === '') {
        return sortedData.value
    } else {
        const reg = new RegExp(q.value.trim().split(/\s/).join('|'), 'ig')
        return sortedData.value.filter((item) => {
            return reg.test(item.title)
        })
    }
})

// 加载分页
const loadNextPage = () => {
    if (limit.value * page.value >= queryData.value.length) {
        return
    }
    page.value++
}

// 防抖，单位时间内防止重复执行
const throttleLoadNextPage = throttle(300, () => {
    loadNextPage()
})

// 供父组件中滚动监听调用
const onScroll = (e) => {
    if (e.scrollHeight - e.scrollTop - e.clientHeight <= 100) {
        throttleLoadNextPage()
    }
}

onMounted(() => {
    input.value.focus()
})

defineExpose({ onScroll })
</script>
<script>
export default {
    icon: 'i-ri-file-list-line'
}
</script>
