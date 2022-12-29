/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-12-05 11:55:03
 * @LastEditTime: 2022-12-29 14:26:44
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezBookmarks2\src\background.js
 */

// 获取当前窗口信息
async function getCurrentTab() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    return tab
}

// 按键处理
chrome.commands.onCommand.addListener((command) => {
    console.log('[background:command]', command)
    // 向当前窗口发送消息
    getCurrentTab().then((tab) => {
        chrome.tabs.sendMessage(tab.id, {
            type: 'command',
            action: command
        })
    })
})

// 点击扩展图标
chrome.action.onClicked.addListener(() => {
  chrome.runtime.openOptionsPage();
});
