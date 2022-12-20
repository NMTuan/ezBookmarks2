/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-11-22 17:17:10
 * @LastEditTime: 2022-12-20 16:46:44
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezBookmarks2\src\options\options.js
 */
import { createApp } from 'vue'
import App from './App.vue'
import 'uno.css'
import '@unocss/reset/tailwind.css'
import router from './router'
import pinia from './pinia'
import db from './db'

const app = createApp(App)
app.use(router)
app.use(pinia)
app.provide('db', db)
app.mount('#app')
