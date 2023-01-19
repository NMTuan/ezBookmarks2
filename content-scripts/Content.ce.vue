<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-11-22 17:17:10
 * @LastEditTime: 2022-12-29 14:25:00
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\src\content\Content.ce.vue
-->
<template>
    <iframe
        v-if="src"
        class="fixed inset-0 w-full h-full backdrop-blur-sm"
        style="z-index: 9999"
        :src="src"
        frameborder="0"
    >
    </iframe>
</template>
<script setup>
import { ref } from 'vue'
const src = ref('')
const activeCommand = ref('') // 记录一下当前执行的命令

// document.querySelector('html').style.overflow = 'hidden'
// document.body.style.overflow = 'hidden'

// 处理按键部分
const handleCommand = (command = '') => {
    if (command === '') {
        return
    }
    if (src.value === '') {
        // iframe 没有 src， 则打开 command 对应的地址， 显示 iframe
        activeCommand.value = command
        handleDialog('open', `pages/${command}.html`)
    } else if (activeCommand.value === command) {
        // iframe 有 src 并且 当前 command 与 已激活的 command 相同，则清除数据关闭 iframe
        handleDialog('close')
    }
}

const handleDialog = (action, url) => {
    if (action === 'open' && url) {
        src.value = chrome.runtime.getURL(url)
        document.body.style.overflow = 'hidden'
        document.body.style.paddingRight = '17px'
    }
    if (action === 'close') {
        src.value = ''
        activeCommand.value = ''
        document.body.style.overflow = ''
        document.body.style.paddingRight = ''
    }
}

// 消息处理
const handleMessage = ({ type = '', action = '', payload = {} }) => {
    // console.log('[content:message]', type, action, payload)
    if (type === 'command') {
        handleCommand(action)
    }
    if (type === 'dialog') {
        handleDialog(action)
    }
}

// 消息处理
chrome.runtime.onMessage.addListener((message) => {
    handleMessage(message)
})
</script>
<style>
@unocss-placeholder;
</style>
