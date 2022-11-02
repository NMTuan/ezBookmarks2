<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-11-02 16:45:21
 * @LastEditTime: 2022-11-02 17:24:03
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\src\content-scripts\components\login.vue
-->
<template>
    <div>
        login
        <BaseInput v-model="email" :placeholder="Email" />
        <BaseInput v-model="password" type="password" :placeholder="Password" />
    </div>
</template>
<script setup>
import { ref } from "vue";
import Dialog from './dialog.vue'
import BaseInput from './baseInput.vue'

const email = ref('')
const pssword = ref('')

</script>
