<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-12-14 10:36:26
 * @LastEditTime: 2022-12-14 13:43:41
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\src\options\router\tags.vue
-->
<template>
    <div>
        <div>tags</div>
        <pre>{{ tags }}</pre>
    </div>
</template>
<script setup>
import { inject, ref } from 'vue';
const db = inject('db')
const fetchRes = ref([])
const tags = ref([])

// const fun = {
//     map(doc) {
//         emit(doc._id, doc.tags)

//     },
//     reduce: '_stats'
//     // reduce(keys, values, rereduce) {
//     //     return 1
//     // }
// }
// const fun = (doc) => {
//     emit([doc.tags])
// }
// db.query(fun)
//     .then(res => {
//         fetchRes.value = res
//     })



db.find({
    selector: {},
    fields: ['tags']
}).then(res => {
    tags.value = res.docs
        // 先把所有数据合并成一个数组
        .reduce((total, item) => {
            total = total.concat(item.tags)
            return total
        }, [])
        // 然后统计数组每项数量
        .reduce((total, item) => {
            const exits = total.find(tag => tag.label === item)
            if (exits) {
                exits.count++
            } else {
                total.push({
                    label: item,
                    count: 1
                })
            }
            return total
        }, [])
})
    .catch(err => {
        console.error('[err]', err)
    })
</script>
