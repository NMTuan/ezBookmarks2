/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-12-20 16:42:40
 * @LastEditTime: 2023-02-02 14:24:34
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezBookmarks2\store\base.js
 */
import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { flatTree, findDuplicate } from '/utils'

export const useBaseStore = defineStore('baseStore', () => {
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

    // 重复数据
    const bookmarksDuplicate = ref([])

    // 获取浏览器书签
    const fetchChromeBookmarks = () => {
        // loading.value = true
        chrome.bookmarks.getTree(async (res) => {
            bookmarksTree.value = res

            // const flatData = flatTree(res)
            // bookmarksFlat.value = flatData
            // bookmarksDuplicate.value = findDuplicate(flatData)
            // await handleVisits(flatData)
            // handleSort()
            // loading.value = false
        })
    }

    // 获取访问记录
    // const fetchVisits = (url) => {
    //     if (!url) {
    //         return ''
    //     }
    //     return chrome.history
    //         .getVisits({
    //             url
    //         })
    //         .then((res) => {
    //             return res
    //         })
    // }

    // 循环处理
    // const handleVisits = async (data) => {
    //     for (let i = 0; i < data.length; i++) {
    //         const visits = await fetchVisits(data[i].url)
    //         data[i].visits = visits
    //     }
    // }

    // 排序
    const handleSort = () => {
        bookmarksFlat.value.sort((a, b) => {
            // 有访问时间的, 拿最后一次访问时间做比较
            // 没有访问时间的, 拿创建时间做比较
            const aDate =
                a.visits.length > 0
                    ? a.visits[a.visits.length - 1].visitTime
                    : a.dateAdded
            const bDate =
                b.visits.length > 0
                    ? b.visits[b.visits.length - 1].visitTime
                    : b.dateAdded
            return bDate - aDate
        })
    }

    // 删除书签
    const removeByItems = async (items = []) => {
        for (let i = 0; i < items.length; i++) {
            if (items[i].id) {
                await removeById(items[i].id)
            }
        }
    }
    const removeById = async (id) => {
        bookmarksFlat.value = bookmarksFlat.value.filter((i) => i.id !== id)
        await chrome.bookmarks.remove(id)
    }

    fetchChromeBookmarks()

    watch(
        bookmarksTree,
        (val) => {
            bookmarksFlat.value = flatTree(val)
        },
        {
            deep: true
        }
    )
    watch(
        bookmarksFlat,
        async (val) => {
            bookmarksDuplicate.value = findDuplicate(val)
            // await handleVisits(val)
            handleSort(val)
        },
        { deep: true }
    )

    // chrome.bookmarks.onChanged.addListener(fetchChromeBookmarks)
    // chrome.bookmarks.onCreated.addListener(fetchChromeBookmarks)
    // chrome.bookmarks.onMoved.addListener(fetchChromeBookmarks)
    // chrome.bookmarks.onRemoved.addListener(fetchChromeBookmarks)
    // chrome.history.onVisited.addListener(fetchChromeBookmarks)

    return {
        loading,
        bookmarksTree,
        bookmarksFlat,
        bookmarksDuplicate,
        removeByItems,
        removeById
    }
})
