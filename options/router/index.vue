<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-12-13 16:25:07
 * @LastEditTime: 2022-12-29 16:44:44
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\options\router\index.vue
-->
<template>
    <router-view></router-view>
</template>
<script setup>
import { inject, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const rows = ref([])
const total_rows = ref(0)
const db = inject('db')

const route = useRoute()
const router = useRouter()
if (route.name === 'index') {
    router.replace({
        name: 'index_index'
    })
}

onMounted(() => {
    db.allDocs({
        include_docs: true
    }).then((res) => {
        // { offset:Number, rows:Array, total_rows:Number}
        rows.value = res.rows
    })
})

defineExpose({
    name: 'aabbcc'
})
</script>
