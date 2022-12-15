/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-12-15 08:27:35
 * @LastEditTime: 2022-12-15 08:30:18
 * @LastEditors: NMTuan
 * @Description: 把 bookmarks 基于 children 的 object 数据，处理成一维数组
 * @FilePath: \ezBookmarks2\src\utils\flatTree.js
 */

// children 上级书签的所有子集  
// parentTitles 上级目录名字的集合
const flatTree = (children = [], parentTitles = []) => {
    return children.reduce((total, item) => {
        if (item.children && item.children.length > 0) {
            // 如果有 children，把当前 title 插入 parentTitles 中，继续递归
            const titles = [...parentTitles]
            if (item.title && item.id !== '0' && item.parentId !== '0') {
                titles.push(item.title)
            }
            // 把递归回来的数据，合并到 total 中
            total = total.concat(flatTree(item.children, titles))
        } else if (item.url) {
            // 没有 children 并且有 url，则当一条数据插入 total
            total.push({
                title: item.title,
                url: item.url,
                date_created: item.dateAdded,
                date_updated: item.dateAdded,
                hits: 0,
                parentTitles: [...parentTitles]
            })
        }
        return total
    }, [])
}
