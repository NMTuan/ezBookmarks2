<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-12-21 11:03:07
 * @LastEditTime: 2022-12-28 14:53:34
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
            <div
                class="flex item-center justify-between text-cool-gray-400 px-3 py-3 text-sm"
            >
                <div class="">
                    {{ q ? '找到' : '' }} {{ queryData.length }} 个书签：
                </div>
                <div class="flex items-center">
                    Ctrl+Enter search in
                    <base-index-search-engine
                        ref="searchEngine"
                    ></base-index-search-engine>
                </div>
            </div>
        </div>

        <div v-if="!baseStore.loading">
            <BaseIndexListItem
                v-for="(item, index) in queryData.slice(0, page * limit)"
                :item="item"
                :q="q.trim()"
                :active="activeIndex === index"
                class="transition-all"
                :class="{ 'bg-cool-gray-200': activeIndex === index }"
                @mouseenter="handleMouseenter(index)"
                ref="items"
            ></BaseIndexListItem>
        </div>
    </div>
</template>
<script setup>
import {
    ref,
    computed,
    inject,
    defineExpose,
    onMounted,
    onBeforeUnmount,
    watch
} from 'vue'
import { throttle } from 'throttle-debounce'
import { getI18n } from '../../../utils'
import { useBaseStore } from '@/store/base'
import BaseIndexListItem from '@/options/components/BaseIndexListItem.vue'
import BaseIndexSearchEngine from '../../components/BaseIndexSearchEngine.vue'

const correction = 100 // 修正值，滚动到距离边缘多少px时触发
const baseStore = useBaseStore()
const input = ref('')
const q = ref('')
const page = ref(1)
const limit = ref(10)
const activeIndex = ref(0)
const items = ref([])
const searchEngine = ref('')

const mainScrollTop = inject('mainScrollTop')
const mainScroll = inject('mainScroll')

// 查询后的数据
const queryData = computed(() => {
    if (q.value.trim() === '') {
        return baseStore.bookmarksFlat
    } else {
        const reg = new RegExp(q.value.trim().split(/\s/).join('|'), 'ig')
        return baseStore.bookmarksFlat.filter((item) => {
            return (
                reg.test(item.title) ||
                reg.test(item.url.replace(/^https?\:\/\//gi, ''))
            )
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
    if (e.scrollHeight - e.scrollTop - e.clientHeight <= correction) {
        throttleLoadNextPage()
    }
}

// 鼠标滑过
const handleMouseenter = (index) => {
    activeIndex.value = index
}

// 处理按键事件
const handleKey = (e) => {
    console.log('key', e.key, e)

    if (e.key === 'ArrowUp') {
        e.preventDefault()
        if (activeIndex.value > 0) {
            activeIndex.value--
            keepActiveCanBeSee()
        }
    }
    if (e.key === 'ArrowDown') {
        e.preventDefault()
        if (activeIndex.value < queryData.value.length - 1) {
            activeIndex.value++
            keepActiveCanBeSee()
        }
    }
    if (e.key === 'Enter') {
        if (e.ctrlKey) {
            searchEngine.value.search(q.value)
        } else {
            chrome.tabs.create({
                url: queryData.value[activeIndex.value].url
            })
        }
    }
}

// 保持当前项目显示在屏幕中
const keepActiveCanBeSee = () => {
    const activeEl = items.value[activeIndex.value].el

    if (activeIndex.value === 0) {
        // 顶
        mainScroll.value.scrollElement.scrollTop = 0
    } else if (
        activeEl.offsetTop + activeEl.clientHeight + correction >
        mainScroll.value.scrollElement.scrollTop + window.innerHeight
    ) {
        // 下边
        mainScroll.value.scrollElement.scrollTop =
            activeEl.offsetTop +
            activeEl.clientHeight -
            window.innerHeight +
            correction
    } else if (
        activeEl.offsetTop - correction <
        mainScroll.value.scrollElement.scrollTop
    ) {
        // 上边
        mainScroll.value.scrollElement.scrollTop =
            activeEl.offsetTop - activeEl.clientHeight - correction
    }
}

onMounted(() => {
    input.value.focus()
    window.addEventListener('keydown', handleKey)
})

onBeforeUnmount(() => [window.removeEventListener('keydown', handleKey)])

watch(q, () => {
    // 搜索条件改变时
    mainScrollTop(0) // 滚动到页面最上方
    page.value = 1 // 分页为 1
    activeIndex.value = 0 // 高亮为 0
})

defineExpose({ onScroll })
</script>
<script>
export default {
    icon: 'i-ri-file-list-line'
}
</script>
