/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-12-15 10:59:32
 * @LastEditTime: 2023-02-01 16:08:53
 * @LastEditors: NMTuan
 * @Description: 找出数据中 url 相同的数据。
 * @FilePath: \ezBookmarks2\utils\findDuplicate.js
 */

const findDuplicate = (data) => {
    const urls = {}
    // 1.循环数据，按照url把数据整理一遍。
    data.forEach((item) => {
        if (typeof urls[item.url] === 'undefined') {
            urls[item.url] = []
        }
        urls[item.url].push(item)
    })
    // 2.找到数量>1的，返回
    return Object.keys(urls).reduce((total, url, index) => {
        if (urls[url].length > 1) {
            total.push({
                url,
                data: urls[url]
            })
        }
        return total
    }, [])
}

export default findDuplicate
