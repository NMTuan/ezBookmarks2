/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-12-13 16:48:13
 * @LastEditTime: 2022-12-19 11:22:51
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezBookmarks2\src\options\router.js
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import { getI18n } from '../utils'

const routes = [
    {
        path: '/',
        name: 'index',
        meta: {
            name: getI18n('menu_index')
        },
        component: () => import('./router/index.vue')
    },
    {
        path: '/tags',
        name: 'tags',
        meta: {
            name: getI18n('menu_tags')
        },
        component: () => import('./router/tags.vue')
    },
    {
        path: '/setting',
        name: 'setting',
        meta: {
            name: getI18n('menu_setting')
        },
        component: () => import('./router/setting.vue')
    },
    {
        path: '/import',
        name: 'import',
        meta: {
            name: getI18n('menu_import')
        },
        component: () => import('./router/import.vue')
    },
    {
        path: '/login',
        name: 'login',
        meta: {
            name: getI18n('menu_login')
        },
        component: () => import('./router/login.vue')
    },
    {
        path: '/create',
        name: 'create',
        meta: {
            name: getI18n('menu_create')
        },
        component: () => import('./router/create.vue')
    },
    {
        path: '/search',
        name: 'search',
        meta: {
            name: getI18n('menu_search')
        },
        component: () => import('./router/search.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
