/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-11-03 16:09:06
 * @LastEditTime: 2022-11-03 16:18:17
 * @LastEditors: NMTuan
 * @Description: 接口
 * @FilePath: \ezBookmarks2\src\api\index.js
 */
import { getData, postData } from "./fetch";
const api = {
  auth: {
    login: payload => postData("auth/login", payload)
  }
};

export default api;
