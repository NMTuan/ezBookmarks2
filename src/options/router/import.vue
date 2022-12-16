<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-12-14 14:38:33
 * @LastEditTime: 2022-12-16 07:23:14
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\src\options\router\import.vue
-->
<template>
    <div>
        <div>import</div>
        <p>将您浏览器中的书签导入到本插件中。</p>
        <!-- <p>导入的书签不再有目录结构，原目录结构将会以标签的形式保留。</p> -->
        <!-- <p>注意：此功能是不考虑重复数据的，你可以在数据导入后去【去重】页面优化数据。</p> -->
        <p>注意：重复书签是指网址相同的书签</p>
        <hr>
        <p>step1 读取浏览器书签</p>
        <ImportStep1 v-model:treeData="treeData" v-model:flatData="flatData" v-model:duplicateData="duplicateData">
        </ImportStep1>
        <hr>
        <p>step2 处理浏览器书签中的重复书签，或跳过处理</p>
        <ImportStep2 v-model:treeData="treeData" v-model:flatData="flatData" v-model:duplicateData="duplicateData">
        </ImportStep2>
        <hr>
        <p>step3 处理本插件和浏览器书签之间的重复书签</p>
        <ImportStep3 v-model:treeData="treeData" v-model:flatData="flatData" v-model:duplicateData="duplicateData">
        </ImportStep3>
        <hr>
        <p>step4 将处理后的数据导入到本插件中。</p>
        <hr>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import ImportStep1 from '../components/ImportStep1.vue';
import ImportStep2 from '../components/ImportStep2.vue';
import ImportStep3 from '../components/ImportStep3.vue';

const treeData = ref([])    // bookmakrs tree 数据
const flatData = ref([]) // 一维数据
const duplicateData = ref([])   // 重复数据



</script>
<style lang='scss' scoped>
::v-deep {
    button {
        @apply border px-3 py-1 bg-sky-600 text-white;
    }
}
</style>
