/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-10-31 16:59:41
 * @LastEditTime: 2022-10-31 17:09:23
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\vite.config.js
 */
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import { chromeExtension } from "vite-plugin-chrome-extension";

import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), chromeExtension()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      input: "src/manifest.json",
    },
  }
})
