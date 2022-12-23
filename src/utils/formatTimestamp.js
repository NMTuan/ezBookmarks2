/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-12-20 07:43:05
 * @LastEditTime: 2022-12-23 14:26:54
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\src\utils\formatTimestamp.js
 */
// 格式化时间戳
const formatTimestamp = (ts) => {
    const date = new Date(ts)
    return date.toLocaleDateString()
}

export default formatTimestamp
