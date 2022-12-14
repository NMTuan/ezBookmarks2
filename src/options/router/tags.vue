<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-12-14 10:36:26
 * @LastEditTime: 2022-12-14 14:17:46
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\src\options\router\tags.vue
-->
<template>
    <div>
        <div>tags</div>
        <table class="bg-lime-100 w-full text-center">
            <tr>
                <th>tag</th>
                <th>count</th>
            </tr>
            <tr v-for="tag in tags">
                <td @click="filter(tag.label)">{{ tag.label }}</td>
                <td>{{ tag.count }}</td>
            </tr>
        </table>
        total: {{ filterRes.length }}
        <pre>{{ filterRes }}</pre>
        <!-- <pre>{{ tags }}</pre> -->
    </div>
</template>
<script setup>
import { inject, ref } from 'vue';
const db = inject('db')
const tags = ref([])
const filterRes = ref([])

const filter = (tag) => {
    db.find({
        selector: {
            tags: {
                $all: [tag]
            }
        }
    })
        .then(res => {
            filterRes.value = res.docs
        })
        .catch(err => {
            console.error('[err]', err)
        })
}

db.find({
    selector: {},
    fields: ['tags']
})
    .then(res => {
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
