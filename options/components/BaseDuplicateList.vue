<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-12-27 14:42:54
 * @LastEditTime: 2023-01-19 14:39:49
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\options\components\BaseDuplicateList.vue
-->
<template>
    <div class="bg-cool-gray-200/50 px-4 pt-4 pb-2 mb-4">
        <div class="flex items-center mb-2">
            <img
                :src="getFaviconUrl(item.url)"
                class="block w-4 h-4 flex-shrink-0 mr-3"
                alt=""
            />
            <div class="truncate">
                <a
                    :href="item.url"
                    class="font-bold"
                    hover="underline underline-offset-4"
                    target="_blank"
                >
                    {{ item.url }}
                </a>
            </div>
            <div
                class="i-ri-share-box-line flex-shrink-0 ml-1 text-sm text-cool-gray-300"
            ></div>
        </div>
        <div>
            <simplebar>
                <div class="flex">
                    <BaseDuplicateItem
                        v-for="(duplicate, index) in item.data"
                        :item="duplicate"
                        :selected="duplicate.id === selectedId"
                        class="flex-1 max-w-50% min-w-30%"
                        ref="items"
                        @click="handleSelect(duplicate.id)"
                    ></BaseDuplicateItem>
                </div>
            </simplebar>
        </div>
        <div class="text-sm mx-2 mb-2">
            <button
                :class="{
                    'bg-cool-gray-50 text-cool-gray-400 cursor-not-allowed':
                        selectedId === '',
                    'bg-blue-400 text-white cursor-pointer': selectedId !== ''
                }"
                @click="saveSelected"
            >
                {{ getI18n('options_duplicate_save_choose_item') }}
            </button>
            <button
                class="text-cool-gray-400 hover:(bg-red-400 text-white)"
                @click="removeAll"
            >
                {{ getI18n('options_duplicate_remove_all') }}
            </button>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { getFaviconUrl, getI18n } from '/utils'
import BaseDuplicateItem from './BaseDuplicateItem.vue'
import simplebar from 'simplebar-vue'

const props = defineProps({
    item: {
        type: Object,
        default() {
            return {}
        }
    }
})

const selectedId = ref('') // 被选中的id

const handleSelect = (itemId) => {
    if (itemId) {
        selectedId.value = itemId
    }
}

const saveSelected = async () => {
    if (selectedId.value === '') {
        return
    }
    for (let i = 0; i < props.item.data.length; i++) {
        if (props.item.data[i].id !== selectedId.value) {
            await chrome.bookmarks.remove(props.item.data[i].id)
        }
    }
}

const removeAll = async () => {
    for (let i = 0; i < props.item.data.length; i++) {
        await chrome.bookmarks.remove(props.item.data[i].id)
    }
}
</script>
<style scoped lang="scss">
button {
    @apply mr-4 px-3 py-2 rounded text-sm;
    @apply transition-all;
}
</style>
