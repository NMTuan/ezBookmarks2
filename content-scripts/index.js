/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-11-22 11:23:06
 * @LastEditTime: 2022-12-12 16:53:13
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezBookmarks2\src\content\content.js
 */
    
import { defineCustomElement } from 'vue' 
import App from './Content.ce.vue' 
const AppShadow = defineCustomElement(App)     

const id = Math.floor(Math.random() * 100000)
customElements.define(`ext-app-${id}`, AppShadow) 
document.body.append(new AppShadow({}))
