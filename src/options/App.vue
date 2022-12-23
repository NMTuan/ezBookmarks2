<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-11-22 11:07:04
 * @LastEditTime: 2022-12-23 15:55:52
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\src\options\App.vue
-->
<template>
    <div class="h-full flex">
        <!-- menu -->
        <div class="fixed z-10 h-full overflow-hidden" :class="menuClass">
            <div class="w-64 h-full">
                <simplebar class="simplebar h-full">
                    <LayoutMenu></LayoutMenu>
                </simplebar>
            </div>
        </div>
        <!-- main -->
        <div class="flex-1 h-full overflow-hidden" :class="mainClass">
            <simplebar class="simplebar h-full" ref="mainScroll">
                <div
                    class="flex items-center justify-between p-4 leading-none bg-cool-gray-50/50 backdrop-blur sticky left-0 top-0 right-0 z-10"
                >
                    <div class="flex items-center">
                        <div
                            @click="togglePin"
                            class="i-ri-menu-line text-xl cursor-pointer"
                        ></div>
                        <div class="ml-4 flex items-center">
                            <div
                                v-for="(item, index) in route.matched"
                                class="flex items-center"
                            >
                                {{ item.meta.name }}
                                <div
                                    v-if="index !== route.matched.length - 1"
                                    class="i-ri-arrow-right-s-line mx-2 text-cool-gray-400"
                                ></div>
                            </div>
                        </div>
                    </div>
                    <div class="mr-2">
                        <div class="i-ri-github-fill text-2xl"></div>
                    </div>
                </div>
                <div class="w-85% max-w-6xl mx-auto">
                    <router-view v-slot="{ Component }">
                        <component :is="Component" ref="mainView"></component>
                    </router-view>
                </div>
            </simplebar>
        </div>
    </div>
</template>
<script setup>
import { ref, provide, computed, onMounted } from 'vue'
import { pin, togglePin } from './components/LayoutPin'
import LayoutMenu from './components/LayoutMenu.vue'
import simplebar from 'simplebar-vue'
import 'simplebar/dist/simplebar.min.css'
import { useRoute } from 'vue-router'
const route = useRoute()
console.log('[i18n]', chrome.i18n.getMessage('ext_name'))

const mainScroll = ref()
const mainView = ref()
const menuClass = computed(() => {
    let classNames = []
    switch (pin.value) {
        case true:
            classNames.push(
                'w-0 bg-cool-gray-100/90 border-r-8 border-cool-gray-300/50 transition-all duration-500'
            )
            classNames.push('hover:w-64 hover:border-r')
            break
        case false:
            classNames.push(
                'w-0 bg-cool-gray-100/90 border-r-8 border-cool-gray-300/50 transition-all duration-500'
            )
            classNames.push('hover:w-64 hover:border-r')
            classNames.push('lg:w-64 lg:bg-cool-gray-200/50 lg:!border-none')
    }
    return classNames
})
const mainClass = computed(() => {
    const classNames = []
    switch (pin.value) {
        case true:
            classNames.push('ml-0 transition-all duration-500')
            break
        case false:
            classNames.push('ml-0 transition-all duration-500')
            classNames.push('lg:ml-64')
    }
    return classNames
})

// 滚动主体区域
const mainScrollTop = (value = 0) => {
    mainScroll.value.scrollElement.scrollTop = value
}

onMounted(() => {
    mainScroll.value.scrollElement.addEventListener('scroll', () => {
        if (mainView.value.view?.onScroll) {
            mainView.value.view.onScroll(mainScroll.value.scrollElement)
        }
    })
})

provide('mainScrollTop', mainScrollTop)

</script>
<style lang="scss">
html,
body,
#app {
    @apply text-base text-cool-gray-800 bg-cool-gray-50 h-full overflow-hidden;
}
*:focus-visible {
    @apply outline-none;
}

.simplebar {
    &:hover {
        .simplebar-track {
            @apply bg-black/5;
        }
    }

    .simplebar-scrollbar {
        &:before {
            @apply bg-cool-gray-400;
        }
    }
}
</style>
