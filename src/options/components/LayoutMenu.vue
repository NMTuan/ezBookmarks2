<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-12-19 09:34:10
 * @LastEditTime: 2022-12-19 11:29:52
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\src\options\components\LayoutMenu.vue
-->
<template>
    <div class="menu">
        <template v-for="menu in menus">
            <template v-if="Array.isArray(menu.children)">
                <div class="title">{{ menu.label }}</div>
                <div v-for="item in menu.children">
                    <router-link class="link" :to="{ name: item.to }">
                        <div
                            v-if="item.icon"
                            :class="`${item.icon} icon`"
                        ></div>
                        {{ getI18n(item.label) }}
                    </router-link>
                </div>
            </template>
            <template v-else>
                <router-link class="link" :to="{ name: menu.to }">
                    {{ getI18n(menu.label) }}
                </router-link>
            </template>
        </template>

        <p v-for="i in 100">{{ i }}</p>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { getI18n } from '../../utils'

const menus = ref([
    {
        label: 'base',
        children: [
            {
                label: 'menu_index',
                to: 'index',
                icon: 'i-ri-bookmark-3-line'
            }
        ]
    },
    {
        label: 'adv',
        children: [{ label: 'menu_login', to: 'login' }]
    },
    {
        label: 'cloud',
        children: [{ label: 'menu_login', to: 'login' }]
    },
    {
        label: 'other',
        children: [
            { label: 'menu_login', to: 'login' },
            { label: 'menu_search', to: 'search' },
            { label: 'menu_create', to: 'create' },
            { label: 'menu_tags', to: 'tags' },
            { label: 'menu_setting', to: 'setting' },
            { label: 'menu_import', to: 'import' }
        ]
    }
])
</script>
<style scoped lang="scss">
.menu {
    @apply leading-none;
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
