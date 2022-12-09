<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-11-22 17:17:10
 * @LastEditTime: 2022-12-09 17:19:31
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\src\content\Content.ce.vue
-->
<template>
    <component v-if="activeCommand" :is="componentId"></component>
</template>
<script setup>
import { ref } from 'vue'
import ContentCreate from '../components/ContentCreate.vue'
import ContentSearch from '../components/ContentSearch.vue'

const activeCommand = ref('')   // 记录一下当前执行的命令
const componentId = ref('')

// document.querySelector('html').style.overflow = 'hidden'
// document.body.style.overflow = 'hidden'

// 处理按键部分
const handleCommand = (command = '') => {
    if (command === '') {
        return
    }
    if (activeCommand.value === '') {
        // 如果没有激活指令， 则切换到当前指令对应组件
        activeCommand.value = command
        switch (command) {
            case 'create':
                componentId.value = ContentCreate
                break
            case 'search':
                componentId.value = ContentSearch
                break
        }
    } else if (activeCommand.value === command) {
        // 如果激活指令与当前指令相同，则清空激活指令，关闭相关组件
        activeCommand.value = ''
        componentId.value = ''
    }
}

// 消息处理
const handleMessage = ({ type = '', action = '', payload = {} }) => {
    console.log('[content:message]', type, action, payload);
    if (type === 'command') {
        handleCommand(action)
    }
}

// 消息处理
chrome.runtime.onMessage.addListener((message) => {
    handleMessage(message)
})

</script>
<style>
@unocss-placeholder
</style>


