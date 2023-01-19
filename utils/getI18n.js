/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-12-19 10:59:45
 * @LastEditTime: 2022-12-19 15:27:09
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezBookmarks2\src\utils\getI18n.js
 */
const getI18n = (key) => {
    if (key) {
        return chrome.i18n.getMessage(key) || `{{${key}}}`
    } else {
        return key
    }
}

export default getI18n
