<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-11-22 14:09:25
 * @LastEditTime: 2022-12-13 08:28:27
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\src\create\App.vue
-->
<template>
    <div class="text-xl font-bold w-full h-full  bg-#a8c9c4">
        <div>
            testpage
            <div>
                create
                {{ data }}
            </div>
        </div>
    </div>
</template> 
<script setup>
import { ref } from 'vue'
import PouchDB from 'pouchdb-browser'
import PouchFind from 'pouchdb-find';
const data = ref({})
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
        data.value = res
    })

</script>
