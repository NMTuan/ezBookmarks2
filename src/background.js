/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-11-02 13:36:26
 * @LastEditTime: 2022-11-04 15:46:40
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezBookmarks2\src\background.js
 */

import api from "./api";
import log from "./utils/log";
import storageData from "@/utils/storage";

// 点击扩展小图标
chrome.action.onClicked.addListener(async tab => {
  if (tab.id) {
    chrome.tabs.sendMessage(tab.id, { type: "action" });
  }
});

// 获取当前窗口信息
async function getCurrentTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  log({ tab });
  return tab;
}

// 消息处理
const handleMessage = {
  // 演示：点击扩展图标，显示当前 tab 信息
  POPUP_INIT: () => getCurrentTab(),

  // 登录
  login: payload => {
    return api.auth.login(payload).then(res => {
      log("[res]", res);
      // 登录成功，记录相关信息
      if (!res.errors) {
        chrome.storage.sync.set({
          email: payload.email,
          logged: true,
          access_token: res.data.access_token,
          refresh_token: res.data.refresh_token
        });
      }
      return res;
    });
  }
};

// 消息处理
// request: {type, payload}
// 找 handleMessage[type] 方法，并传参 payload。最后把返回通过 sendResponse 发回去。
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  log(`[onMessage:${request.type || ""}]`, request.payload);
  if (!request.type) {
    return;
  }
  if (typeof handleMessage[request.type] === "function") {
    handleMessage[request.type](request.payload || {}).then(sendResponse);
  }
  return true;
});

// 按键处理
chrome.commands.onCommand.addListener(command => {
  log("[command]", command);
  // 向当前窗口发送消息
  getCurrentTab().then(tab => {
    chrome.tabs.sendMessage(tab.id, {
      type: "command",
      action: command
    });
  });
});

// 如果取到 access_token，则尝试获取用户信息，确保用户登录状态
chrome.storage.sync.get(["access_token"]).then(res => {
  if (res.access_token) {
    api.users.me().then(res => {
      if (res.errors) {
        chrome.storage.sync.set({
          logged: false,
          access_token: "",
          refresh_token: ""
        });
      } else {
        chrome.storage.sync.set({
          logged: true
        });
      }
    });
  }
});
