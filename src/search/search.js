/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-11-22 14:09:20
 * @LastEditTime: 2022-12-28 14:16:03
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezBookmarks2\src\search\search.js
 */

import { createApp } from 'vue'
import App from './App.vue'
import 'uno.css'
import '@unocss/reset/tailwind.css'
import pinia from '@/options/pinia'

const app = createApp(App)
app.use(pinia)
app.mount('#app')
