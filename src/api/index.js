/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-11-03 16:09:06
 * @LastEditTime: 2022-11-11 15:04:43
 * @LastEditors: NMTuan
 * @Description: 接口
 * @FilePath: \ezBookmarks2\src\api\index.js
 */
import { getData, postData } from "./fetch";
const api = {
  auth: {
    // 登录
    login: data => postData({ path: "auth/login", data, headers: {} }),
    refresh: data => postData({ path: "auth/refresh", data, headers: {} })
  },
  users: {
    me: () => getData({ path: "users/me" })
  },
  bookmarks: {
    fetch: query => getData({ path: "items/bookmarks", query }),
    create: data => postData({path: 'items/bookmarks', data})
  }
};

export default api;
