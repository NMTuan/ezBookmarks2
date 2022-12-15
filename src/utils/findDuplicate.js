/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-12-15 10:59:32
 * @LastEditTime: 2022-12-15 15:06:13
 * @LastEditors: NMTuan
 * @Description: 找出数据中 url 相同的数据。
 * @FilePath: \ezBookmarks2\src\utils\findDuplicate.js
 */

const findDuplicate = (data) => {
    return data.reduce((total, item, index)=>{
        // 找 data 里面是否有跟当前 item.url 相同的数据。
        const duplicateData = data.filter(bm=> bm.url === item.url)
        if(duplicateData.length > 1){
            // 重复数据的 url 是否已经在 total 中记录过
            const exits = total.find(bm=>bm.url === item.url)
            if(exits){
                // 有记录，需要把重复数据记录进去
                duplicateData.forEach(item => {
                    exits.data = exits.data.filter(bm=>bm.id !== item.id)
                    exits.data.push({...item})
                });
            } else {
                // 没记录，则记录
                total.push({
                    url: item.url,
                    data: [...duplicateData]
                })
            }
        }
        return total
    }, [])
}

export default findDuplicate
