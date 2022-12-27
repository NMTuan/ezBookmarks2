<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-12-27 14:23:22
 * @LastEditTime: 2022-12-27 16:53:52
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\src\options\components\BaseDuplicateItem.vue
-->
<template>
    <div
        class="flex items-end justify-between p-4 text-sm border cursor-pointer"
        :class="{
            'bg-white': selected,
            'border-transparent': !selected,
            'hover:bg-cool-gray-100': !selected
        }"
    >
        <div class="overflow-hidden">
            <div class="truncate">{{ item.title }}</div>
            <div class="flex mt-2 text-cool-gray-400">
                <!-- 目录 -->
                <div
                    v-if="item.parentTitles?.length > 0"
                    class="flex-shrink-0 flex items-center mr-4"
                >
                    <div class="i-ri-folder-line mr-2"></div>
                    {{ item.parentTitles.join(' - ') }}
                </div>
                <!-- 创建时间 -->
                <div class="flex-shrink-0 flex items-center mr-4">
                    <div class="i-ri-add-box-line mr-2"></div>
                    {{ formatTimestamp(item.dateAdded) }}
                </div>
            </div>
        </div>
        <div v-if="selected" class="items-center text-blue-400">
            <!-- ENTER -->
            <div class="i-ri-check-line text-xl ml-2"></div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { formatTimestamp } from '../../utils'

const props = defineProps({
    item: {
        type: Object,
        default() {
            return {}
        }
    },
    selected: {
        type: Boolean,
        default: false
    }
})
</script>
