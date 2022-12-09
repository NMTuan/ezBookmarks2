/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-11-22 14:09:20
 * @LastEditTime: 2022-12-09 16:38:54
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezBookmarks2\src\dialog\dialog.js
 */

import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './Dialog.vue'
import 'uno.css'
import '@unocss/reset/tailwind.css'

const routes = [
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
const app = createApp(App)
app.use(router)
app.mount('#app')
