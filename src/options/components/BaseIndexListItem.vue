<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-12-21 13:44:47
 * @LastEditTime: 2022-12-23 08:29:46
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\src\options\components\BaseIndexListItem.vue
-->
<template>
    <div class="p-3 border-b group" hover="bg-cool-gray-100">
        <div class="flex items-center">
            <img
                :src="getFaviconUrl(item.url)"
                alt=""
                class="block w-6 h-6 flex-shrink-0 mr-3"
            />
            <div class="flex-1 flex items-start overflow-hidden">
                <a
                    class="truncate"
                    hover="underline underline-offset-4"
                    :href="item.url"
                    target="_blank"
                    v-html="highlight(item.title)"
                >
                </a>
                <div
                    class="i-ri-share-box-line flex-shrink-0 ml-1 text-sm text-cool-gray-300 hidden"
                    group-hover="block"
                ></div>
            </div>
        </div>
        <div class="flex mt-2 pl-9 text-cool-gray-400 text-sm">
            <!-- 目录 -->
            <div
                v-if="item.parentTitles?.length > 0"
                class="flex-shrink-0 flex items-center mr-4"
            >
                <div class="i-ri-folder-line mr-2"></div>
                {{ item.parentTitles.join(' - ') }}
            </div>
            <!-- 访问量 -->
            <div
                v-if="item.visits?.length > 0"
                class="flex-shrink-0 flex items-center mr-4"
            >
                <div class="i-ri-eye-line mr-2"></div>
                {{ item.visits.length }} -
                {{
                    formatTimestamp(
                        item.visits[item.visits.length - 1].visitTime
                    )
                }}
            </div>
            <!-- 创建时间 -->
            <div class="flex-shrink-0 flex items-center mr-4">
                <div class="i-ri-add-box-line mr-2"></div>
                {{ formatTimestamp(item.dateAdded) }}
            </div>
            <!-- 网址 -->
            <div class="flex items-center overflow-hidden">
                <div class="i-ri-links-line mr-2"></div>
                <div class="truncate">{{ item.url }}</div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { getFaviconUrl, formatTimestamp } from '../../utils'

const props = defineProps({
    item: {
        type: Object,
        default() {
            return {}
        }
    },
    q: {
        type: String,
        default: ''
    }
})
const classNames = 'bg-yellow-200 rounded'
const highlight = (text) => {
    const reg = new RegExp(props.q.split(/\s/).join('|'), 'ig')
    console.log(reg)
    if (props.q) {
        return text.replace(reg, (word) => {
            return `<span class="${classNames}">${word}</span>`
        })
    } else {
        return text
    }
}
</script>
<style lang="scss" scoped>
.highlight {
    @apply bg-yellow-200 rounded;
}
</style>
