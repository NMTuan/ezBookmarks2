/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-12-13 16:48:13
 * @LastEditTime: 2022-12-29 16:23:58
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezBookmarks2\options\router.js
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import { treeRoutes } from '/utils'

const router = createRouter({
    history: createWebHashHistory(),
    routes: treeRoutes
})

export default router
