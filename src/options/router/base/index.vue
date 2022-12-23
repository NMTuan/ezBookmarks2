<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-12-21 11:03:07
 * @LastEditTime: 2022-12-23 16:44:45
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
                v-for="(item,index) in queryData.slice(0, page * limit)"
                :item="item"
                :q="q.trim()"
                v-model:activeIndex="activeIndex"
                class="transition-all"
                :class="{'bg-cool-gray-200': activeIndex === index}"
                @mouseenter="handleMouseenter(index)"
                ref="items"
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
import { ref, computed, inject, defineExpose, onMounted, onBeforeUnmount } from 'vue'
import { throttle } from 'throttle-debounce'
import { useBaseStore } from '@/store/base'
import BaseIndexListItem from '@/options/components/BaseIndexListItem.vue'

const baseStore = useBaseStore()
const input = ref('')
const q = ref('')
const page = ref(1)
const limit = ref(10)
const activeIndex = ref(0)
const items = ref([])

const mainScrollTop = inject('mainScrollTop')

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
            return reg.test(item.title) || reg.test(item.url.replace(/^https?\:\/\//ig, ''))
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

// 鼠标滑过
const handleMouseenter = (index) => {
    activeIndex.value = index
}

// 处理按键事件
const handleKey = (e) => {
    console.log('key', e.key)
    if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (activeIndex.value > 0) {
            activeIndex.value--
            keepActiveShow()
        }
    }
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (activeIndex.value < queryData.value.length) {
            activeIndex.value ++
            keepActiveShow()
        }
    }
    if (e.key === 'Enter') {
        window.open(queryData.value[activeIndex.value].url)
    }
}

// 保持当前项目显示在屏幕中
const keepActiveShow = () => {
    const activeEl = items.value[activeIndex.value]
    console.log(activeEl.el)
}

onMounted(() => {
    input.value.focus()
    window.addEventListener('keydown', handleKey)
})

onBeforeUnmount(() => [
    window.removeEventListener('keydown', handleKey)
])

defineExpose({ onScroll })
</script>
<script>
export default {
    icon: 'i-ri-file-list-line'
}
</script>
