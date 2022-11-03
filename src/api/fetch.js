/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-11-03 16:05:26
 * @LastEditTime: 2022-11-03 16:18:25
 * @LastEditors: NMTuan
 * @Description: 异步处理
 * @FilePath: \ezBookmarks2\src\api\fetch.js
 */
const getData = () => {};
const postData = (path, payload = {}) => {
  return fetch(`${import.meta.env.VITE_HOST}/${path}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  }).then(res => res.json());
};

export { getData, postData };
