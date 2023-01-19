<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-12-19 09:34:10
 * @LastEditTime: 2022-12-28 16:05:51
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\src\options\components\LayoutMenu.vue
-->
<template>
    <div class="menu">
        <template v-for="menu in treeRoutes">
            <template
                v-if="Array.isArray(menu.children) && menu.children.length > 0"
            >
                <div class="title">
                    {{ menu.meta.name }}
                </div>
                <div v-for="item in menu.children">
                    <router-link class="link" :to="{ name: item.name }">
                        <div
                            v-if="item.meta.icon"
                            :class="`${item.meta.icon} icon`"
                        ></div>
                        {{ item.meta.name }}
                    </router-link>
                </div>
            </template>
            <template v-else>
                <router-link class="link" :to="{ name: menu.name }">
                    <div
                        v-if="menu.meta.icon"
                        :class="`${menu.meta.icon} icon`"
                    ></div>
                    {{ menu.meta.name }}
                </router-link>
            </template>
        </template>
    </div>
</template>
<script setup>
import { treeRoutes } from '/utils'
</script>
<style scoped lang="scss">
.menu {
    @apply leading-none mt-2;
}
.title {
    @apply px-4 pt-5 pb-2;
    @apply text-cool-gray-400 capitalize text-sm;
}
.link {
    @apply block p-4 flex items-center;
    @apply capitalize font-bold text-cool-gray-600;
    @apply hover:bg-cool-gray-200;
}
.icon {
    @apply text-20px mr-2 text-cool-gray-400;
}
.router-link-active,
.router-link-active:hover {
    @apply bg-blue-400;
    @apply text-white;
    .icon {
        @apply text-blue-200;
    }
}
</style>
