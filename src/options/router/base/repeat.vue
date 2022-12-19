<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-12-19 13:20:24
 * @LastEditTime: 2022-12-19 13:23:09
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\src\options\router\baseRepeat.vue
-->
<template>
    <div>
        <div>重复数据</div>
        <pre>{{ route }}</pre>
    </div>
</template>
<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
</script>
