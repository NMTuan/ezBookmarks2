/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-11-03 16:05:26
 * @LastEditTime: 2022-11-07 14:20:31
 * @LastEditors: NMTuan
 * @Description: 异步处理
 * @FilePath: \ezBookmarks2\src\api\fetch.js
 */
import api from "./index";
import log from "@/utils/log";
import storageData from "@/utils/storage";

const defaultHeader = { "Content-Type": "application/json" };

const _fetch = ({
  path,
  method = "get",
  query = null,
  data = null,
  headers = null
}) => {
  let fetchPath = `${import.meta.env.VITE_HOST}/${path}`;

  if (query) {
    fetchPath += `?${new URLSearchParams(query)}`;
  }
  log("[query]", query);
  log("[fetchPath]", fetchPath);

  const fetchParams = {};
  fetchParams.method = method;

  if (method === "post" && data) {
    fetchParams.body = JSON.stringify(data);
  }

  if (headers) {
    // 如果传参，则用传参
    fetchParams.headers = Object.assign({}, defaultHeader, headers);
  } else if (storageData.access_token) {
    // 如果有 access_token 则用
    fetchParams.headers = Object.assign({}, defaultHeader, {
      Authorization: `Bearer ${storageData.access_token}`
    });
  } else {
    // 否则用 default
    fetchParams.headers = Object.assign({}, defaultHeader);
  }

  return fetch(fetchPath, fetchParams)
    .then(res => res.json())
    .then(res => {
      log("[fetch:res]", res);
      // 如果 token 过期，则需要刷新
      if (res.errors && res.errors[0].extensions.code === "TOKEN_EXPIRED") {
        // 刷新 token
        return api.auth
          .refresh({
            refresh_token: storageData.refresh_token
          })
          .then(res => {
            log("[fetch:refresh]", res);
            if (res.errors) {
              // 如果刷新 token 还报错，则清理记录的 token
              chrome.storage.sync.set({
                access_token: "",
                refresh_token: "",
                logged: false
              });
              return res;
            } else {
              // 记录新 token
              chrome.storage.sync.set(res.data);
              // 重新请求
              fetchParams.headers = Object.assign({}, defaultHeader, {
                Authorization: `Bearer ${res.data.access_token}`
              });
              return fetch(fetchPath, fetchParams);
            }
          });
      } else {
        return res;
      }
    });
};

const getData = params => _fetch(params);
const postData = params => _fetch({ method: "post", ...params });

export { getData, postData };
