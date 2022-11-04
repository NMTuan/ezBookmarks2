<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-11-02 16:45:21
 * @LastEditTime: 2022-11-04 16:01:58
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
        <pre>{{ storageData }}</pre>
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
import { ref, watchEffect } from "vue";
import log from '@/utils/log'
import storageData from "@/utils/storage";

import Dialog from './dialog.vue'
import BaseInput from './baseInput.vue'
import BaseButton from "./baseButton.vue"

const email = ref('')
const password = ref('')
const loading = ref(false)

// 提交表单
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
        log('[errors]', errors);
        log('[data]', data);
    })
}

// 把 storage 中 email 直接赋值到表单，友好操作
watchEffect(() => {
    email.value = storageData.email
})
</script>
