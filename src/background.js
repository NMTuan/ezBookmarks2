/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-11-02 13:36:26
 * @LastEditTime: 2022-11-02 16:30:59
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezBookmarks2\src\background.js
 */

// 点击扩展小图标
chrome.action.onClicked.addListener(async tab => {
  if (tab.id) {
    chrome.tabs.sendMessage(tab.id, "icon");
  }
});

// 获取当前窗口信息
async function getCurrentTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  console.log({ tab });
  return tab;
}

// 消息处理
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.type) {
    case "POPUP_INIT":
      getCurrentTab().then(sendResponse);
      return true;
    default:
      break;
  }
});

// 按键处理
chrome.commands.onCommand.addListener(command => {
  console.log("[command]", command);
  // 向当前窗口发送消息
  getCurrentTab().then(tab => {
    chrome.tabs.sendMessage(tab.id, command);
  });
});
