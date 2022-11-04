<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-11-02 16:45:21
 * @LastEditTime: 2022-11-04 10:16:14
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\src\content-scripts\components\login.vue
-->
<template>
    <Dialog>
        <!-- <div class=":uno:
    absolute inset-0
    backdrop-blur-sm
    "> -->
        login
        <BaseInput v-model="email" placeholder="Email" />
        <BaseInput v-model="password" type="password" placeholder="Password" />
        <BaseButton class=":uno: 
        flex-1 bg-sky-500/50 text-white
        hover:bg-sky-500
        " :loading="loading" @click="handleSubmit">
            Submit
        </BaseButton>
        <!-- </div> -->
    </Dialog>
</template>
<script setup>
import { ref, onMounted, watchEffect } from "vue";
import log from '@/utils/log'
import Dialog from './dialog.vue'
import BaseInput from './baseInput.vue'
import BaseButton from "./baseButton.vue"

const email = ref('')
const password = ref('')
const loading = ref(false)

const handleSubmit = async () => {
    if (!email.value || !password.value) {
        alert('请输入邮箱或密码')
        return
    }
    loading.value = true

    chrome.runtime.sendMessage({
        type: 'login',
        payload: {
            email: email.value.trim(),
            password: password.value
        }
    }, ({ errors, data }) => {
        console.log('[errors]', errors);
        console.log('[data]', data);
    })
}


onMounted(() => {
    // 获取 storage 数据
    chrome.storage.sync.get(['email'])
        .then(res => {
            email.value = res.email
        })
})

// watchEffect(() => {
//     chrome.storage.sync.set({ email: email.value })
// })
</script>
