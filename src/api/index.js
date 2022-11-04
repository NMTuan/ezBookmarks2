/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-11-03 16:09:06
 * @LastEditTime: 2022-11-04 11:36:12
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
  }
};

export default api;
