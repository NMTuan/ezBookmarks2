<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-10-20 17:09:24
 * @LastEditTime: 2022-11-21 16:24:34
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\src\content-scripts\components\baseDialog.vue
-->
<template>
    <div v-if="show" class=":uno: text-neutral-300 text-left">
        <div ref="el" class=":uno: absolute top-0 left-0 w-screen h-screen z-10000 bg-transparent backdrop-blur-sm"
            @click="clickMask">
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
    ref,
    watchEffect,
    nextTick
} from 'vue';
import BaseSimplebar from '@/content-scripts/components/BaseSimplebar.vue'
import IconCloseLine from './iconCloseLine.vue';
const el = ref()
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
    // 按 esc 关闭弹窗
    closeOnPressEscape: {
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

// 按 esc 关闭
const pressEscape = (e) => {
    if (e.key === 'Escape') {
        close()
    }
}

const fontSize = document.querySelector("html").style.fontSize
let scrollTop = 0
watchEffect(() => {
    const html = document.querySelector('html')
    if (props.show) {
        scrollTop = html.scrollTop
        html.style.fontSize = "16px"; // unocss rem2px有问题，所以继续使用 rem，为保证样式统一，强制处理
        document.body.style.overflow = 'hidden' // 锁定页面滚动。百度结果页特殊，暂时不处理。
        nextTick(() => {
            // 让弹层显示在可视窗口
            el.value.style.top = scrollTop + 'px'
        })
    } else {
        html.style.fontSize = fontSize;
        document.body.style.overflow = ''
    }
})

watchEffect(() => {
    if (props.show && props.closeOnPressEscape) {
        window.addEventListener('keydown', pressEscape)
    }
    if (!props.show && props.closeOnPressEscape) {
        window.removeEventListener('keydown', pressEscape)
    }
})

</script>
