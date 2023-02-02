<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-12-19 13:20:24
 * @LastEditTime: 2023-02-01 16:14:18
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\options\router\base\duplicate.vue
-->
<template>
    <div class="relative">
        <div class="mb-2">
            <p>
                {{ getI18n('word_find') }}
                {{ baseStore.bookmarksDuplicate.length }}
                {{ getI18n('word_unit') }}
                {{ getI18n('word_duplicate') }}
                {{ getI18n('word_bookmark') }}
            </p>
        </div>
        <div v-if="!baseStore.loading">
            <base-duplicate-list
                v-for="item in baseStore.bookmarksDuplicate.slice(
                    0,
                    page * limit
                )"
                :item="item"
                :key="item.url"
            ></base-duplicate-list>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { throttle } from 'throttle-debounce'
import { useBaseStore } from '/store/base'
import BaseDuplicateList from '../../components/BaseDuplicateList.vue'
import { getI18n } from '/utils'

const baseStore = useBaseStore()

const correction = 100 // 修正值，滚动到距离边缘多少px时触发
const page = ref(1)
const limit = ref(10)

// 加载分页
const loadNextPage = () => {
    if (limit.value * page.value >= baseStore.bookmarksDuplicate.length) {
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

defineExpose({ onScroll })
</script>
<script>
export default {
    icon: 'i-ri-file-copy-2-line'
}
</script>
