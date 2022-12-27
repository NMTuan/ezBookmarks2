<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-12-26 15:57:51
 * @LastEditTime: 2022-12-27 10:12:09
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\src\options\components\CommonDialog.vue
-->
<template>
    <teleport to="#dialog">
        <div
            v-if="show"
            class="absolute inset-0 z-10 bg-dark-800/20 backdrop-blur-sm"
            @click="handleClickMask"
        >
            <simplebar class="simplebar h-full">
                <div
                    class="bg-cool-gray-50 mx-auto my-12vh overflow-hidden rounded p-4 w-90%"
                    sm="w-80%"
                    md="w-70%"
                    lg="w-50%"
                    @click.stop=""
                >
                    <div
                        class="flex items-center justify-between text-cool-gray-800"
                    >
                        <div>{{ title }}</div>
                        <div
                            class="i-ri-close-line text-xl cursor-pointer"
                            hover="bg-blue-500"
                            @click="handleClose"
                        ></div>
                    </div>
                    <div class="mt-6">
                        <slot></slot>
                    </div>
                </div>
            </simplebar>
        </div>
    </teleport>
</template>
<script setup>
import { ref } from 'vue'
import simplebar from 'simplebar-vue'

const props = defineProps({
    title: {
        type: String,
        default: ''
    },
    show: {
        type: Boolean,
        default: false
    },
    beforeClose: {
        type: Function,
        default: null
    }
})
const emits = defineEmits(['update:show'])

const handleClose = () => {
    if (typeof props.beforeClose === 'function') {
        props.beforeClose()
    } else {
        emits('update:show', false)
    }
}

const handleClickMask = () => {
    handleClose()
}
</script>
