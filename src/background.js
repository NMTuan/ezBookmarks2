/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-11-02 13:36:26
 * @LastEditTime: 2022-11-03 16:24:14
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezBookmarks2\src\background.js
 */

import api from "./api";

// 点击扩展小图标
chrome.action.onClicked.addListener(async tab => {
  if (tab.id) {
    chrome.tabs.sendMessage(tab.id, { type: "action" });
  }
});

// 获取当前窗口信息
async function getCurrentTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  console.log({ tab });
  return tab;
}

// 登录
function login(payload) {
  return api.auth.login(payload).then(res => {
    console.log("[res]", res);
    return res;
  });
}

// 消息处理
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.type) {
    case "POPUP_INIT":
      getCurrentTab().then(sendResponse);
      break;
    case "login":
      login(request.payload).then(sendResponse);
      break;
    default:
      break;
  }
  return true;
});

// 按键处理
chrome.commands.onCommand.addListener(command => {
  console.log("[command]", command);
  // 向当前窗口发送消息
  getCurrentTab().then(tab => {
    chrome.tabs.sendMessage(tab.id, {
      type: "command",
      action: command
    });
  });
});
