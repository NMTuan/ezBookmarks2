<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-12-21 13:44:47
 * @LastEditTime: 2023-01-19 14:36:03
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\options\components\BaseIndexListItem.vue
-->
<template>
    <div ref="el" class="flex items-end p-3 border-b group">
        <div class="flex-1 overflow-hidden">
            <div class="flex items-center">
                <img
                    :src="getFaviconUrl(item.url)"
                    alt=""
                    class="block w-4 h-4 flex-shrink-0 mr-3"
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
                        class="i-ri-share-box-line flex-shrink-0 ml-1 text-sm text-cool-gray-400 hidden"
                        group-hover="block"
                    ></div>
                </div>
            </div>
            <div class="flex mt-2 pl-9 text-cool-gray-400 text-sm">
                <!-- 目录 -->
                <div
                    v-if="item.parentTitles?.length > 0"
                    class="flex-shrink-0 flex items-center mr-4"
                    :title="getI18n('word_folder')"
                >
                    <div class="i-ri-folder-line mr-2"></div>
                    {{ item.parentTitles.join(' - ') }}
                </div>
                <!-- 访问量 -->
                <div
                    v-if="item.visits?.length > 0"
                    class="flex-shrink-0 flex items-center mr-4"
                    :title="getI18n('word_last_visit_date')"
                >
                    <div class="i-ri-eye-line mr-2"></div>
                    <!-- {{ item.visits.length }} - -->
                    {{
                        formatTimestamp(
                            item.visits[item.visits.length - 1].visitTime
                        )
                    }}
                </div>
                <!-- 创建时间 -->
                <div
                    class="flex-shrink-0 flex items-center mr-4"
                    :title="getI18n('word_created_date')"
                >
                    <div class="i-ri-add-box-line mr-2"></div>
                    {{ formatTimestamp(item.dateAdded) }}
                </div>
                <!-- 网址 -->
                <div class="flex items-center overflow-hidden">
                    <div class="i-ri-links-line mr-2"></div>
                    <div
                        class="truncate"
                        v-html="
                            highlight(item.url.replace(/^https?\:\/\//, ''))
                        "
                    ></div>
                </div>
            </div>
        </div>
        <div
            class="items-center text-cool-gray-400"
            :class="{ flex: active, hidden: !active }"
        >
            <!-- ENTER -->
            <div class="i-icon-park-solid:enter-key text-xl ml-2"></div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { getFaviconUrl, formatTimestamp, getI18n } from '/utils'

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
    },
    active: {
        type: Boolean,
        default: false
    }
})

const el = ref()
const classNames = 'bg-yellow-200 rounded'
const highlight = (text) => {
    const reg = new RegExp(props.q.split(/\s/).join('|'), 'ig')
    if (props.q) {
        return text.replace(reg, (word) => {
            return `<span class="${classNames}">${word}</span>`
        })
    } else {
        return text
    }
}

defineExpose({ el })
</script>
<style lang="scss" scoped>
.highlight {
    @apply bg-yellow-200 rounded;
}
</style>
