<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-10-22 17:20:26
 * @LastEditTime: 2022-11-11 15:15:45
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
        text-base
        flex items-center justify-center
        " :class="{ 'cursor-not-allowed': loading, 'cursor-pointer': !loading }" :type="type" :disabled="loading">
            <IconLoader4Fill v-if="loading" class=":uno: animate-spin mx-auto text-lg"></IconLoader4Fill>
            <slot v-else />
        </button>
    </div>

</template>

<script setup>
import IconLoader4Fill from './iconLoader4Fill.vue';

// import { defineProps } from 'vue';
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
