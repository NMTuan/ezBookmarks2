/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-11-02 13:36:26
 * @LastEditTime: 2022-11-02 15:25:24
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezBookmarks2\vite.config.js
 */
import { resolve } from "path";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { chromeExtension } from "vite-plugin-chrome-extension";
import transformerCompileClass from "@unocss/transformer-compile-class";

import Unocss from "unocss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src")
    }
  },
  build: {
    rollupOptions: {
      input: "src/manifest.json"
    }
  },
  plugins: [
    vue(),
    Unocss({
      /* options */
      transformers: [
        transformerCompileClass({
          trigger: "ez",
          classPrefix: "ez-"
        })
      ]
    }),
    chromeExtension()
  ]
});
