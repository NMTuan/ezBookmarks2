<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-11-07 14:57:30
 * @LastEditTime: 2022-11-21 14:46:40
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\src\content-scripts\components\listItem.vue
-->
<template>
    <div class=":uno:
    px-4 py-3 
    cursor-pointer 
    rounded
    text-white
    transition-all
    " :class="itemClassNames" @click="handleClick">
        <div class=":uno: flex mb-2">
            <div class=":uno: flex-1 truncate">
                {{ item.name }}
                <sup class=":uno: text-white/50 text-xs">{{ item.clicks_count }}</sup>
            </div>
            <!-- <div class=":uno:
            ml-1 flex items-center
            rounded w-6 h-6 text-center
            hover:bg-sky-800/50
            ">
                <IconPencilFill v-show="active" @click.stop="" class=":uno: mx-auto" />
            </div> -->
            <!-- <NuxtLink :to="{
                name: 'edit-id', params: {
                    id: item.id
                }
            }" class=":uno:
            ml-1 flex items-center
            rounded w-6 h-6 text-center
            " hover="bg-sky-800/50" v-show="active" @click.stop="">
                <div class=":uno: i-ri-pencil-fill text-white/50 transition-all
                mx-auto
                ">
                </div>
            </NuxtLink> -->
        </div>
        <div class=":uno: flex items-center">
            <div class=":uno: flex items-center text-neutral-400">
                <div v-for="tag in item.tags"
                    class=":uno: text-xs mr-2 px-3 py-1 rounded bg-neutral-800/50 whitespace-nowrap">
                    {{ tag.tags_name }}
                </div>
            </div>
            <div class=":uno: truncate text-sm transition-all" :class="urlClassName">
                {{ item.url }}
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
// import IconPencilFill from './iconPencilFill.vue';
const props = defineProps({
    item: {
        type: Object,
        default() {
            return {}
        }
    },
    active: {
        type: Boolean,
        default: false
    }
})

const emits = defineEmits(['reload'])

const itemClassNames = computed(() => {
    const className = []
    if (props.active) {
        className.push('bg-sky-500/50')
    } else {
        className.push('bg-transparent')
    }
    return className
})

const urlClassName = computed(() => {
    const className = []
    if (props.active) {
        className.push('text-neutral-300')
    } else {
        className.push('text-neutral-500')
    }
    return className
})

const handleClick = () => {
    // 打开
    window.open(props.item.url)
    // 次数+1，同时更新下编辑时间，列表要根据编辑时间排序
    chrome.runtime.sendMessage({
        type: 'createClick',
        payload: {
            bookmark_id: props.item.id
        }
    }, ({ errors, data }) => {
        if (!errors) {
            chrome.runtime.sendMessage({
                type: 'updateBookmark',
                payload: {
                    id: props.item.id
                }
            }, () => {
                emits('reload')
            })
        }
    })
}

</script>
