/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-11-22 17:17:10
 * @LastEditTime: 2022-12-13 16:48:51
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezBookmarks2\src\options\options.js
 */
import { createApp } from 'vue'
import App from './App.vue'
import 'uno.css'
import '@unocss/reset/tailwind.css'
import router from './router'
import db from './db'

const app = createApp(App)
app.use(router)
app.provide('db', db)
app.mount('#app')

