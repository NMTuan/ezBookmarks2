/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-12-20 11:00:28
 * @LastEditTime: 2022-12-20 11:00:38
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezBookmarks2\src\utils\getFaviconUrl.js
 */
function getFaviconUrl(url, size = 32) {
    return `/_favicon/?pageUrl=${encodeURIComponent(url)}&size=${size}`
}

export default getFaviconUrl
