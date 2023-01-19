<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-12-27 14:23:22
 * @LastEditTime: 2023-01-19 15:57:08
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
