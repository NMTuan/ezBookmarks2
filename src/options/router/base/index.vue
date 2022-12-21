<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-12-21 11:03:07
 * @LastEditTime: 2022-12-21 11:23:32
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\src\options\router\base\index.vue
-->
<template>
    <div v-if="!baseStore.loading">
        <pre>{{ baseStore.bookmarksTree }}</pre>
    </div>
</template>
<script setup>
import { useBaseStore } from '@/store/base'

const baseStore = useBaseStore()
</script>
<script>
export default {
    icon: 'i-ri-file-list-line'
}
</script>
