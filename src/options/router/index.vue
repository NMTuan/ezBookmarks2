<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-12-13 16:25:07
 * @LastEditTime: 2022-12-19 16:39:00
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\src\options\router\index.vue
-->
<template>
    <div>
        index
        <router-view></router-view>
    </div>
</template>
<script setup>
import { inject, ref, onMounted, defineExpose } from 'vue'
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
        console.log('res', res)
        rows.value = res.rows
    })
})

defineExpose({
    name: 'aabbcc'
})
</script>
