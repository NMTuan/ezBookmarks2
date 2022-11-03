/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-11-03 17:00:34
 * @LastEditTime: 2022-11-03 17:00:53
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezBookmarks2\src\utils\log.js
 */
const log = function() {
  if (import.meta.env.DEV) {
    console.log.apply(this, arguments);
  }
};

export default log;
