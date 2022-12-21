<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-12-21 11:03:07
 * @LastEditTime: 2022-12-21 16:57:41
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\src\options\router\base\index.vue
-->
<template>
    <div v-if="!baseStore.loading" class="relative">
        <div class="w-full">
            <input type="text" v-model="q" />{{ queryData.length }}
        </div>
        <BaseIndexListItem
            v-for="item in queryData"
            :item="item"
        ></BaseIndexListItem>
        <!-- <div>
            <pre
                v-for="item in queryData"
                class="overflow-hidden"
                hover="bg-blue-100"
                >{{ item }}</pre
            >
        </div> -->
    </div>
</template>
<script setup>
import { ref, computed, onBeforeUpdate, onUpdated } from 'vue'
import { useBaseStore } from '@/store/base'
import BaseIndexListItem from '@/options/components/BaseIndexListItem.vue'
const x = ref(0)

const baseStore = useBaseStore()
const q = ref('')

// 排序后的数据
const sortedData = computed(() => {
    return [...baseStore.bookmarksFlat].sort((a, b) => {
        return b.dateAdded - a.dateAdded
    })
})

// 查询后的数据
const queryData = computed(() => {
    if (q.value.trim() === '') {
        return sortedData.value
    } else {
        return sortedData.value.filter((item) => {
            return item.title.indexOf(q.value) >= 0
        })
    }
})

onBeforeUpdate(() => {
    x.value = new Date().getTime()
})
onUpdated(() => {
    console.log('update time', new Date().getTime() - x.value)
})
</script>
<script>
export default {
    icon: 'i-ri-file-list-line'
}
</script>
