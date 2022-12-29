/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-12-16 16:07:43
 * @LastEditTime: 2022-12-16 16:12:49
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezBookmarks2\src\options\components\LayoutPin.js
 */
import { ref } from 'vue'

export const pin = ref(false)
// 切换 pin 状态
export const togglePin = () => {
    pin.value = !pin.value
    localStorage.setItem('ezBookmarks2-pin', pin.value ? 1 : 0)
}
// localstorage 读取 pin 状态
pin.value = localStorage.getItem('ezBookmarks2-pin') === '1' ? true : false
