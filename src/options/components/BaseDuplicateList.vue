<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-12-27 14:42:54
 * @LastEditTime: 2022-12-27 16:53:10
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\src\options\components\BaseDuplicateList.vue
-->
<template>
    <div class="p-3">
        <div class="flex items-center mb-2">
            <img
                :src="getFaviconUrl(item.url)"
                class="block w-6 h-6 flex-shrink-0 mr-3"
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
        <div class="border-l-4 ml-3 pl-4">
            <BaseDuplicateItem
                v-for="(duplicate, index) in item.data"
                :item="duplicate"
                :selected="duplicate.id === selectedId"
                class="transition-all"
                ref="items"
                @click="handleSelect(duplicate.id)"
            ></BaseDuplicateItem>
            <div class="text-sm mt-3">
                <button
                    class="border px-4 py-2 transition-all"
                    hover="border-transparent"
                    :class="{
                        'cursor-not-allowed hover:bg-blue-200 ':
                            selectedId === '',
                        'bg-blue-400 border-transparent text-white hover:bg-blue-500':
                            selectedId
                    }"
                    @click="saveSelected"
                >
                    保留选中项
                </button>
                <button
                    class="px-4 py-2 ml-2 transition-all"
                    hover="bg-red-400 text-white"
                    @click="removeAll"
                >
                    都不保留
                </button>
            </div>
        </div>
        <!-- {{ item }} -->
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { getFaviconUrl } from '../../utils'
import BaseDuplicateItem from './BaseDuplicateItem.vue'

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
