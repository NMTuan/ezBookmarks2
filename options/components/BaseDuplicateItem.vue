<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-12-27 14:23:22
 * @LastEditTime: 2023-01-19 14:46:39
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\options\components\BaseDuplicateItem.vue
-->
<template>
    <div class="p-2">
        <BaseDuplicateBox :title="getI18n('options_duplicate_item_id')">
            {{ item.id }}
            <template #side>
                <div
                    class="text-2xl"
                    :class="{
                        'i-ri-checkbox-blank-circle-line text-cool-gray-300':
                            !selected,
                        'i-ri-checkbox-circle-line text-blue-400': selected
                    }"
                ></div>
            </template>
        </BaseDuplicateBox>
        <BaseDuplicateBox :title="getI18n('options_duplicate_item_url')">
            {{ item.url }}
        </BaseDuplicateBox>
        <BaseDuplicateBox :title="getI18n('options_duplicate_item_folder')">
            {{
                item.parentTitles.join(' - ') ||
                getI18n('options_duplicate_item_none')
            }}
        </BaseDuplicateBox>
        <BaseDuplicateBox :title="getI18n('options_duplicate_item_dataAdded')">
            {{ formatTimestamp(item.dateAdded) }}
        </BaseDuplicateBox>
        <BaseDuplicateBox
            :title="getI18n('options_duplicate_item_lastVisited')"
        >
            x
        </BaseDuplicateBox>
        <!-- <div class="overflow-hidden">
            <div class="truncate">{{ item.title }}</div>
            <div class="flex mt-2 text-cool-gray-400">
                <div
                    v-if="item.parentTitles?.length > 0"
                    class="flex-shrink-0 flex items-center mr-4"
                >
                    <div class="i-ri-folder-line mr-2"></div>
                    {{ item.parentTitles.join(' - ') }}
                </div>
                <div class="flex-shrink-0 flex items-center mr-4">
                    <div class="i-ri-add-box-line mr-2"></div>
                    {{ formatTimestamp(item.dateAdded) }}
                </div>
            </div>
        </div> -->
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { formatTimestamp, getI18n } from '/utils'
import BaseDuplicateBox from './BaseDuplicateBox.vue'

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
