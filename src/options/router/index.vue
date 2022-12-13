<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-12-13 16:25:07
 * @LastEditTime: 2022-12-13 16:52:50
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\src\options\router\index.vue
-->
<template>
    <div>
        index
        <pre>{{rows}}</pre>
    </div>
</template>
<script setup>
import { inject, ref, onMounted } from 'vue';
const rows = ref([])
const total_rows = ref(0)
const db = inject('db')

onMounted(() => {
    db.allDocs()
        .then(res => {
            // { offset:Number, rows:Array, total_rows:Number}
            console.log('res', res); 
        rows.value = res.rows
    })
})

</script>
