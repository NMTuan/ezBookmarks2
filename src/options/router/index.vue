<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-12-13 16:25:07
 * @LastEditTime: 2022-12-19 16:06:38
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\src\options\router\index.vue
-->
<template>
    <div>
        <div>index</div>
        <table class="text-center w-full bg-purple-200">
            <tr>
                <th>id</th>
                <th>title</th>
                <!-- <th>url</th> -->
                <th>tags</th>
                <th></th>
            </tr>
            <tr v-for="item in rows">
                <td>{{ item.id }}</td>
                <td>{{ item.doc.title }}</td>
                <!-- <td>{{item.doc.url}}</td> -->
                <td>{{ item.doc.tags }}</td>
                <td></td>
            </tr>
        </table>
        <pre>{{ rows }}</pre>
    </div>
</template>
<script setup>
import { def } from '@vue/shared'
import { inject, ref, onMounted, defineExpose } from 'vue'
const rows = ref([])
const total_rows = ref(0)
const db = inject('db')

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
<script>
export default {
    icon: 'i-ri-bookmark-3-line',
    sort: 100
}
</script>
