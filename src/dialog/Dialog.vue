<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-11-22 14:09:25
 * @LastEditTime: 2022-12-05 14:35:16
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\src\dialog\Dialog.vue
-->
<template>
    <div class="text-xl font-bold w-full h-full  bg-purple-400">

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

</script>
