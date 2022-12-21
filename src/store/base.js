/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-12-20 16:42:40
 * @LastEditTime: 2022-12-21 13:29:22
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezBookmarks2\src\store\base.js
 */
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { flatTree } from '../utils'

export const useBaseStore = defineStore('baseStore', () => {
    // const count = ref(0)
    // const inc = () => {
    //     console.log('inc')
    //     count.value++
    // }
    // return { count, inc }

    const loading = ref(false)

    /** 从浏览器中读到的书签数据
     *
     * [
     *     {
     *         children: [
     *             {
     *                 dateAdded: 1618465573232,
     *                 id: '1210',
     *                 index: 0,
     *                 parentId: '1209',
     *                 title: 'FydeOS - 面向未来的云驱动操作系统 | 为中国用户打造的 Chrome OS',
     *                 url: 'https://fydeos.com/'
     *             }
     *         ]
     *     }
     * ]
     */
    const bookmarksTree = ref([])

    /** 以一维数组的形式展示 bookmarksTree
     *
     * [
     *     {
     *         id: '1210',
     *         index: 0,
     *         parentId: '1209',
     *         title: 'FydeOS - 面向未来的云驱动操作系统 | 为中国用户打造的 Chrome OS',
     *         url: 'https://fydeos.com/',
     *         dateAdded: 1618465573232,
     *         parentTitles: ['新1', '操作系统']
     *     }
     * ]
     */
    const bookmarksFlat = ref([])

    // 获取浏览器书签
    const fetchChromeBookmarks = () => {
        loading.value = true
        chrome.bookmarks.getTree(async (res) => {
            bookmarksTree.value = res
            const flatData = flatTree(res)
            bookmarksFlat.value = flatData
            await handleVisits(flatData)
            loading.value = false
        })
    }

    // 获取访问记录
    const fetchVisits = (url) => {
        if (!url) {
            return ''
        }
        return chrome.history
            .getVisits({
                url
            })
            .then((res) => {
                return res
            })
    }

    // 循环处理
    const handleVisits = async (data) => {
        for (let i = 0; i < data.length; i++) {
            const visits = await fetchVisits(data[i].url)
            data[i].visits = visits
        }
    }

    fetchChromeBookmarks()

    return {
        loading,
        bookmarksTree,
        bookmarksFlat
    }
})
