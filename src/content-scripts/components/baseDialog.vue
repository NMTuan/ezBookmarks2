<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-10-20 17:09:24
 * @LastEditTime: 2022-11-07 15:38:44
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\src\content-scripts\components\baseDialog.vue
-->
<template>
    <div v-if="show" class=":uno: text-neutral-300 text-left">
        <div class=":uno: absolute inset-0 z-10000 bg-transparent backdrop-blur-sm" @click="clickMask">
            <BaseSimplebar class=":uno: h-full overflow-hidden">
                <div class=":uno: bg-neutral-700 mx-auto my-12vh overflow-hidden rounded p-4
                    w-90%
                    sm:w-80%
                    md:w-70% 
                    lg:w-50%
                    " @click.stop="clickContainer">
                    <div v-if="!noHeader" class=":uno: flex items-center text-lg">
                        <div class=":uno: flex-1">
                            {{ title }}
                        </div>
                        <div class=":uno: 
                        flex items-center justify-center rounded w-6 h-6 text-center cursor-pointer
                        hover:bg-neutral-500/30
                        " @click="clickCloseIcon">
                            <IconCloseLine />
                        </div>
                    </div>
                    <div :class="{ ':uno: mt-6': !noHeader, ':uno: mb-2': !noHeader }">
                        <slot />
                    </div>
                    <div v-if="$slots.foot">
                        <slot name="foot" :close="close" />
                    </div>
                </div>
            </BaseSimplebar>
        </div>
    </div>
</template>
<script setup>
import {
    // defineProps, defineEmits,
    watchEffect
} from 'vue';
import BaseSimplebar from '@/content-scripts/components/BaseSimplebar.vue'
import IconCloseLine from './iconCloseLine.vue';
const props = defineProps({
    // 标题
    title: {
        type: String,
        default: ''
    },
    // 点击遮罩是否关闭弹窗
    closeOnClickMask: {
        type: Boolean,
        default: false
    },
    // 是否显示弹窗
    show: {
        type: Boolean,
        default: false
    },
    // 隐藏头部
    noHeader: {
        type: Boolean,
        default: false
    }
})

const emits = defineEmits(['close', 'update:show'])

// 关闭
const close = () => {
    // emits('close')
    emits('update:show', false)
}

// 点击遮罩
const clickMask = () => {
    if (props.closeOnClickMask) {
        close()
    }
}

// 点击关闭按钮
const clickCloseIcon = () => {
    close()
}
// 点击容器
const clickContainer = () => {
    return
}
const fontSize = document.querySelector("html").style.fontSize
watchEffect(() => {
    if (props.show) {
        document.querySelector('html').style.overflow = 'hidden'
        document.querySelector("html").style.fontSize = "16px"; // unocss rem2px有问题，所以继续使用 rem，为保证样式统一，强制处理
        document.body.style.overflow = 'hidden'
    } else {
        document.querySelector('html').style.overflow = ''
        document.querySelector("html").style.fontSize = fontSize;
        document.body.style.overflow = ''
    }
})
</script>
