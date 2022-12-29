/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-12-19 15:10:52
 * @LastEditTime: 2022-12-29 15:12:45
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezBookmarks2\utils\treeRoutes.js
 */
import { getI18n } from '/utils'

const files = import.meta.glob('/options/router/**/*.vue', {
    eager: true,
    import: 'default'
})

// 动态加载的文件转换成数组
const filesArray = Object.keys(files).reduce((total, key) => {
    const path = key.replace(/.*\/router\/(.*?)\.vue$/gi, '$1')
    total.push({
        key, // 原key
        path, // 路径
        icon: files[key]?.icon || '',
        sort: files[key]?.sort || 100000,
        level: path.split('/').length, // 层级
        component: files[key] // 文件
    })
    return total
}, [])

// 把一维数组转换为树结构，同时处理成 {route} 的格式
const flat2tree = (data, level = 1, path = '') => {
    const currentLevelData = data.filter(
        (item) => item.level === level && item.path.indexOf(path) === 0
    )
    return currentLevelData.reduce((total, item) => {
        const route = {
            path: `/${item.path.replace(/^index$/, '')}`, // 把 每级的首页过滤掉
            name: item.path.replaceAll('/', '_'),
            meta: {
                sort: item.path.endsWith('index') ? 100 : item.sort, // 如果以 index 结尾，则排序为 100
                icon: item.icon,
                name: getI18n(`menu_${item.path.replaceAll('/', '_')}`) // 取 menu_ 开头的翻译
            },
            component: item.component
        }
        const children = flat2tree(data, level + 1, item.path)
        if (children) {
            route.children = children.sort((a, b) => a.meta.sort - b.meta.sort)
        }
        total.push(route)
        return total
    }, [])
}

const treeRoutes = flat2tree(filesArray).sort(
    (a, b) => a.meta.sort - b.meta.sort
)

export default treeRoutes
