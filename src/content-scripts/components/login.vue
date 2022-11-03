<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-11-02 16:45:21
 * @LastEditTime: 2022-11-03 15:04:46
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\src\content-scripts\components\login.vue
-->
<template>
    <div>
        login
        <BaseInput v-model="email" placeholder="Email" />
        <BaseInput v-model="password" type="password" placeholder="Password" />
        <BaseButton class=":uno: 
        flex-1 bg-sky-500/50 text-white
        hover:bg-sky-500
        " :loading="loading" @click="handleSubmit">
            submit
        </BaseButton>
    </div>
</template>
<script setup>
import { ref } from "vue";
import axios from 'axios'
import BaseInput from './baseInput.vue'
import BaseButton from "./baseButton.vue";

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
    // .then(res => {
    //     console.log('[res]', res);
    // }).catch(error => {
    //     console.log('[error]', error);
    // })



    // axios({
    //     type: 'post',
    //     url: 'http://192.168.192.110:9999',
    //     data: {
    //         email: email.value.trim(),
    //         password: password.value
    //     }
    // })
    //     .then(res => {
    //         console.log('[res]', res);
    //     })

    // directus.auth.login({
    //     email: email.value.trim(),
    //     password: password.value
    // })
    //     // res:{access_token:string, expires:number, refresh_token:string}
    //     .then((res) => {
    //         loading.value = false
    //         window.location.href = '/'
    //         // navigateTo({ name: 'index' })
    //     })
    //     // error:string 错误信息
    //     .catch((error) => {
    //         loading.value = false
    //         alert(error)
    //     })

}

</script>
