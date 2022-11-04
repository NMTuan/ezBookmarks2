import { def } from "@vue/shared";

/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-11-03 16:05:26
 * @LastEditTime: 2022-11-04 11:42:03
 * @LastEditors: NMTuan
 * @Description: 异步处理
 * @FilePath: \ezBookmarks2\src\api\fetch.js
 */
let access_token = "";

chrome.storage.sync.get(["access_token"]).then(res => {
  access_token = res.access_token || "";
});

chrome.storage.sync.onChanged.addListener(res => {
  if (typeof res.access_token !== "undefined") {
    access_token = res.access_token;
  }
});

const defaultHeader = { "Content-Type": "application/json" };

const _fetch = ({ path, method = "get", data = null, header = null }) => {
  const fetchPath = `${import.meta.env.VITE_HOST}/${path}`;

  const fetchParams = {};
  fetchParams.method = method;

  if (method === "post" && data) {
    fetchParams.body = JSON.stringify(data);
  }

  if (header) {
    // 如果传参，则用传参
    fetchParams.headers = Object.assign({}, defaultHeader, header);
  } else if (access_token) {
    // 如果有 access_token 则用
    fetchParams.headers = Object.assign({}, defaultHeader, {
      Authorization: `Bearer ${access_token}`
    });
  } else {
    // 否则用 default
    fetchParams.headers = Object.assign({}, defaultHeader);
  }

  return fetch(fetchPath, fetchParams).then(res => res.json());
};

const getData = params => _fetch(params);
const postData = params => _fetch({ method: "post", ...params });

export { getData, postData };
