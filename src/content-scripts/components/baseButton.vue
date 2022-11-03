<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-10-22 17:20:26
 * @LastEditTime: 2022-11-03 10:59:10
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\src\content-scripts\components\baseButton.vue
-->
<template>
    <div class=":uno:
        flex
        items-center
        flex-shrink-0
        rounded
    ">
        <button class=":uno:
        h-11 px-4 py-3 rounded leading-5 flex-grow
        flex items-center justify-center
        " :class="{ 'cursor-not-allowed': loading, 'cursor-pointer': !loading }" :type="type" :disabled="loading">
            <div v-if="loading" class=":uno: i-ri-loader-4-fill animate-spin mx-auto text-lg"></div>
            <slot v-else />
        </button>
    </div>

</template>

<script setup>
const props = defineProps({
    type: {
        type: String,
        default: 'submit'
    },
    loading: {
        type: Boolean,
        defautl: false
    }
})
</script>
