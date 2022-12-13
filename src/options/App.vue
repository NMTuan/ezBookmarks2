<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-11-22 11:07:04
 * @LastEditTime: 2022-12-13 08:25:11
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\src\options\App.vue
-->
<template>
    <div class="bg-red-200 py-12">
        <i class="
        block mx-auto
        i-ri-vuejs-line text-4xl text-white"></i>
        <div class=" flex items-center justify-center p-12">
            options page
        </div>
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
import PouchDB from 'pouchdb-browser'
import PouchFind from 'pouchdb-find';
PouchDB.plugin(PouchFind);
var db = new PouchDB('my_database');
console.log('db', db)

console.log('[i18n]', chrome.i18n.getMessage("ext_name"))


db.find({
    selector: {
        _id: 'x'
    }
})
    .then(res => {
        console.log('res', res)
    })

</script>
