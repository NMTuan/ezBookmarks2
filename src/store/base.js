/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-12-20 16:42:40
 * @LastEditTime: 2022-12-20 16:57:13
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezBookmarks2\src\store\base.js
 */
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useBaseStore = defineStore('baseStore', () => {
    const count = ref(0)

    const inc = () => {
        console.log('inc')
        count.value++
    }

    return { count, inc }
})
