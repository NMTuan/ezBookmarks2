/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-11-03 16:09:06
 * @LastEditTime: 2022-11-18 17:23:42
 * @LastEditors: NMTuan
 * @Description: 接口
 * @FilePath: \ezBookmarks2\src\api\index.js
 */
import { getData, postData, patchData, deleteData } from "./fetch";
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
    create: data => postData({ path: "items/bookmarks", data }),
    update: data => {
      const id = data.id;
      const payload = Object.assign({}, data);
      if (id === undefined) {
        return patchData({ path: "items/bookmarks", data });
      }
      delete payload.id;
      console.log("payload", payload);
      return patchData({ path: `items/bookmarks/${id}`, data: payload });
    },
    delete: data => deleteData({ path: `items/bookmarks/${data.id}` })
  }
};

export default api;
