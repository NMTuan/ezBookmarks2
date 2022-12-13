<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-11-22 11:07:04
 * @LastEditTime: 2022-12-14 06:50:07
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\src\options\App.vue
-->
<template>
    <div>
        layout
        <router-link :to="{ name: 'index' }">[index]</router-link>
        <router-link :to="{ name: 'login' }">[login]</router-link>
        <router-link :to="{ name: 'create' }">[create]</router-link>
        <hr>
        <div>
            testpage
            <router-view>
            </router-view>
        </div>
    </div>
</template>
<script setup>
console.log('[i18n]', chrome.i18n.getMessage("ext_name"))
</script>
<style>
html,
body {
    @apply text-base;
}
</style>
