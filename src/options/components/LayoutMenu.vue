<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-12-19 09:34:10
 * @LastEditTime: 2022-12-19 10:23:32
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\src\options\components\LayoutMenu.vue
-->
<template>
    <div class="menu">
        <div class="title">Menu</div>
        <router-link class="link" :to="{ name: 'index' }"> index </router-link>
        <router-link class="link" :to="{ name: 'login' }"> login </router-link>
        <div class="title">base type</div>
        <router-link class="link" :to="{ name: 'create' }">
            create
        </router-link>
        <router-link class="link" :to="{ name: 'tags' }"> tags </router-link>
        <div class="title">sync type</div>
        <router-link class="link" :to="{ name: 'setting' }">
            setting
        </router-link>
        <div class="title">cloud type</div>
        <router-link class="link" :to="{ name: 'import' }">
            import
        </router-link>

        <router-link class="link" :to="{ name: 'index' }"> index</router-link>
        <p v-for="i in 100">{{ i }}</p>
    </div>
</template>
<style scoped lang="scss">
.menu {
    @apply leading-none;
}
.title {
    @apply px-4 pt-5 pb-2;
    @apply text-cool-gray-400 capitalize text-sm;
}
.link {
    @apply block p-4;
    @apply capitalize font-bold text-cool-gray-600;
    @apply hover:bg-cool-gray-200;
}
.router-link-active,
.router-link-active:hover {
    // @apply bg-cool-gray-400;
    @apply bg-blue-400;
    @apply text-white;
}
</style>
