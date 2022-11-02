/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-11-02 13:36:26
 * @LastEditTime: 2022-11-02 16:32:25
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezBookmarks2\src\content-scripts\main.js
 */
import { createApp } from "vue";
import App from "./App.vue";
import "uno.css";

const MOUNT_EL_ID = "ezBookmarks2";

let mountEl = document.getElementById(MOUNT_EL_ID);
if (mountEl) {
  mountEl.innerHTML = "";
}
mountEl = document.createElement("div");
mountEl.setAttribute("id", MOUNT_EL_ID);
document.body.appendChild(mountEl);

const vm = createApp(App).mount(mountEl);

// 消息处理
chrome.runtime.onMessage.addListener(message => {
  vm.handleMessage(message);
});
