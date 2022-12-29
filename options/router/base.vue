<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-12-19 13:49:44
 * @LastEditTime: 2022-12-22 11:18:12
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\src\options\router\base.vue
-->
<template>
    <router-view v-slot="{ Component }">
        <component :is="Component" ref="view"></component>
    </router-view>
</template>
<script setup>
import { ref } from 'vue'
const view = ref(null)
defineExpose({ view })
</script>
<script>
export default {
    sort: 500
}
</script>
