<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-11-22 14:09:25
 * @LastEditTime: 2022-12-29 15:47:22
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\pages\search\App.vue
-->
<template>
    <simplebar class="simplebar h-full" ref="mainScroll" @click="closeDialog">
        <div
            class="bg-cool-gray-50 mx-auto my-12vh overflow-hidden rounded p-4 w-90%"
            sm="w-80%"
            md="w-70%"
            lg="w-50%"
            @click.stop=""
        >
            <div class="w-full backdrop-blur">
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
                        {{ q ? getI18n('word_find') : '' }}
                        {{ queryData.length }} {{ getI18n('word_unit')
                        }}{{ getI18n('word_bookmark') }}
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
    </simplebar>
</template>
<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { throttle } from 'throttle-debounce'
import { useBaseStore } from '/store/base'
import simplebar from 'simplebar-vue'
import 'simplebar/dist/simplebar.min.css'
import { getI18n } from '/utils'
import BaseIndexListItem from '/options/components/BaseIndexListItem.vue'
import BaseIndexSearchEngine from '/options/components/BaseIndexSearchEngine.vue'

const correction = 100 // 修正值，滚动到距离边缘多少px时触发
const baseStore = useBaseStore()
const input = ref('')
const q = ref('')
const page = ref(1)
const limit = ref(10)
const activeIndex = ref(0)
const items = ref([])
const searchEngine = ref('')
const mainScroll = ref()

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

// 滚动主体区域
const mainScrollTop = (value = 0) => {
    mainScroll.value.scrollElement.scrollTop = value
}

const closeDialog = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    chrome.tabs.sendMessage(tab.id, {
        type: 'dialog',
        action: 'close'
    })
}

onMounted(() => {
    input.value.focus()
    window.addEventListener('keydown', handleKey)
    mainScroll.value.scrollElement.addEventListener('scroll', () => {
        if (
            mainScroll.value.scrollElement.scrollHeight -
                mainScroll.value.scrollElement.scrollTop -
                mainScroll.value.scrollElement.clientHeight <=
            correction
        ) {
            throttleLoadNextPage()
        }
    })
})

onBeforeUnmount(() => [window.removeEventListener('keydown', handleKey)])

watch(q, () => {
    // 搜索条件改变时
    mainScrollTop(0) // 滚动到页面最上方
    page.value = 1 // 分页为 1
    activeIndex.value = 0 // 高亮为 0
})
</script>
<style lang="scss">
html,
body,
#app {
    @apply text-base text-cool-gray-800 bg-transparent h-full overflow-hidden;
}
#app {
    @apply bg-dark-800/22;
}
*:focus,
*:focus-visible {
    @apply outline-none;
}

.simplebar {
    &:hover {
        .simplebar-track {
            @apply bg-black/5;
        }
    }

    .simplebar-scrollbar {
        &:before {
            @apply bg-black/50;
        }
    }
}
</style>
