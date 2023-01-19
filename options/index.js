/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-11-22 17:17:10
 * @LastEditTime: 2022-12-29 15:35:46
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezBookmarks2\options\index.js
 */
import { createApp } from 'vue'
import App from './App.vue'
import 'uno.css'
import '@unocss/reset/tailwind.css'
import router from './router'
import pinia from '/utils/usePinia.js'
import db from './db'

const app = createApp(App)
app.use(router)
app.use(pinia)
app.provide('db', db)
app.mount('#app')
