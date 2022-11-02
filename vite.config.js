/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-11-02 13:36:26
 * @LastEditTime: 2022-11-02 13:48:43
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezBookmarks2\vite.config.js
 */
import { resolve } from "path";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { chromeExtension } from "vite-plugin-chrome-extension";
import transformerCompileClass from "@unocss/transformer-compile-class";
// import ViteComponents from "vite-plugin-components";

// import ViteIcons, { ViteIconsResolver } from "vite-plugin-icons";

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
    // ViteComponents({
    //   extensions: ["vue"],
    //   // auto import icons
    //   customComponentResolvers: [
    //     // https://github.com/antfu/vite-plugin-icons
    //     ViteIconsResolver({
    //       componentPrefix: ""
    //       // enabledCollections: ['carbon']
    //     })
    //   ]
    // }),
    // ViteIcons(),
    Unocss({
      /* options */
      transformers: [transformerCompileClass()]
    }),
    chromeExtension()
  ]
});
