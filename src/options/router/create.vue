<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-12-05 14:27:29
 * @LastEditTime: 2022-12-14 07:42:15
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\src\options\router\create.vue
-->
<template>
    <div>
        <div>create</div>
        <p>loading: {{ loading }}</p>
        <p>title: <input type="text" v-model="formData.title"></p>
        <p>url: <input type="text" v-model="formData.url"></p>
        <p>tags: <input type="text" v-model="tags"></p>
        <p><button @click="submit">submit</button></p>
        <pre>formData: {{ formData }}</pre>
        <pre>tags: {{ tags }}</pre>
        <pre>submitRes: {{ submitRes }}</pre>
    </div>
</template>
<script setup>
import { ref, watchEffect, inject } from 'vue'

const db = inject('db')
const loading = ref(false)
const formData = ref({})
const tags = ref('')
const submitRes = ref({})

// 处理 tags。 过滤长空格；分割字符串；去重；
watchEffect(() => {
    formData.value.tags = tags.value.replace(/\s/g, ' ').split(/[,， ]/).reduce((total, tag) => {
        // 存在且不重复
        if (tag && total.indexOf(tag) < 0) {
            total.push(tag)
        }
        return total
    }, [])
})

const submit = () => {
    if (formData.value.title === '' || formData.value.url === '') {
        return
    }
    loading.value = true
    const now = new Date().getTime()
    formData.value.date_created = now
    formData.value.date_updated = now
    formData.value.hits = 0
    db.post(formData.value)
        .then(res => {
            loading.value = false
            console.log('[res]', res)
            submitRes.value = res
            formData.value = {}
            tags.value = ''
        })
        .catch((err) => {
            loading.value = false
            console.error('[err]', err)
        })

}
</script>
<style scoped lang="scss">
input,
button {
    @apply border;
}
</style>
