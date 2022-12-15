/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-12-13 16:48:13
 * @LastEditTime: 2022-12-15 07:30:26
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\src\options\router.js
 */
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'index',
        component: () => import('./router/index.vue')
    },
    {
        path: '/tags',
        name: 'tags',
        component: () => import('./router/tags.vue')
    },
    {
        path: '/setting',
        name: 'setting',
        component: () => import('./router/setting.vue')
    },
    {
        path: '/import',
        name: 'import',
        component: () => import('./router/import.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('./router/login.vue')
    },
    {
        path: '/create',
        name: 'create',
        component: () => import('./router/create.vue')
    },
    {
        path: '/search',
        name: 'search',
        component: () => import('./router/search.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
