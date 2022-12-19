/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-12-13 16:48:13
 * @LastEditTime: 2022-12-19 15:15:20
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezBookmarks2\src\options\router.js
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import { treeRoutes } from '../utils'
// console.log(treeRoutes)

const router = createRouter({
    history: createWebHashHistory(),
    routes: treeRoutes
})

export default router
