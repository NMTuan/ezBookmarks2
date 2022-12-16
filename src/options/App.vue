<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-11-22 11:07:04
 * @LastEditTime: 2022-12-16 16:22:24
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\src\options\App.vue
-->
<template>
    <div class="h-full flex">
        <!-- menu -->
        <div
            class="fixed z-10 h-full overflow-hidden transition-all duration-500"
            :class="menuClass"
        >
            <div class="w-64">
                <router-link :to="{ name: 'index' }">[index]</router-link>
                <router-link :to="{ name: 'login' }">[login]</router-link>
                <router-link :to="{ name: 'create' }">[create]</router-link>
                <router-link :to="{ name: 'tags' }">[tags]</router-link>
                <router-link :to="{ name: 'setting' }">[setting]</router-link>
                <router-link :to="{ name: 'import' }">[import]</router-link>
            </div>
        </div>
        <!-- main -->
        <div
            class="flex-1 h-full transition-all duration-500"
            :class="mainClass"
        >
            <div class="flex items-center justify-between p-4 leading-none">
                <div class="flex items-center">
                    <div
                        @click="togglePin"
                        class="i-ri-menu-line text-xl"
                    ></div>
                    <div class="ml-4">简单书签</div>
                </div>
                <div>
                    <div class="i-ri-github-fill text-2xl"></div>
                </div>
            </div>
            <div class="w-85% max-w-6xl mx-auto">
                layout
                <input type="text" class="bg-white border" />
                <router-view> </router-view>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { pin, togglePin } from './components/LayoutPin'
console.log('[i18n]', chrome.i18n.getMessage('ext_name'))

const menuClass = computed(() => {
    let classNames = []
    switch (pin.value) {
        case true:
            classNames.push(
                'w-0 bg-warm-gray-100/90 border-r-8 border-warm-gray-300/50 '
            )
            classNames.push('hover:w-64 hover:border-r')
            break
        case false:
            classNames.push(
                'w-0 bg-warm-gray-100/90 border-r-8 border-warm-gray-300/50 '
            )
            classNames.push('hover:w-64 hover:border-r')
            classNames.push('lg:w-64 lg:bg-warm-gray-200/50 lg:!border-none')
    }
    return classNames
})
const mainClass = computed(() => {
    const classNames = []
    switch (pin.value) {
        case true:
            classNames.push('ml-0')
            break
        case false:
            classNames.push('ml-0')
            classNames.push('lg:ml-64')
    }
    return classNames
})
</script>
<style>
html,
body,
#app {
    @apply text-base bg-warm-gray-50 h-full overflow-hidden;
}
</style>
