/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-11-22 14:09:20
 * @LastEditTime: 2022-12-29 14:59:41
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezBookmarks2\pages\search\index.js
 */

import { createApp } from 'vue'
import App from './App.vue'
import 'uno.css'
import '@unocss/reset/tailwind.css'
import pinia from '/utils/usePinia'


const app = createApp(App)
app.use(pinia)
app.mount('#app')
