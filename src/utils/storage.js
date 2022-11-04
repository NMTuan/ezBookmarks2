/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-11-04 15:05:42
 * @LastEditTime: 2022-11-04 15:53:37
 * @LastEditors: NMTuan
 * @Description: 处理 storage
 * @FilePath: \ezBookmarks2\src\utils\storage.js
 */
import { reactive } from "vue";
import log from "@/utils/log";

const storageData = reactive({
  email: "", // 用户名
  logged: false, // 登录状态
  access_token: "",
  refresh_token: ""
});

// chrome.storage.sync.clear();

// 读取 storage.sync
chrome.storage.sync.get(null).then(res => {
  log("[storage:get]", JSON.stringify(res, null, 2));
  Object.keys(res).forEach(key => {
    storageData[key] = res[key];
  });
});

// 监听 storage.sync
chrome.storage.sync.onChanged.addListener(res => {
  log("[storage:changed]", res);
  Object.keys(res).forEach(key => {
    storageData[key] = res[key].newValue;
  });
});

export default storageData;
