/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-12-13 16:48:13
 * @LastEditTime: 2022-12-28 16:04:06
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
console.log(treeRoutes);

export default router
