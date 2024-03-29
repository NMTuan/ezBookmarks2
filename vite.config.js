/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-11-22 10:18:29
 * @LastEditTime: 2022-12-29 15:44:50
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezBookmarks2\vite.config.js
 */
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.json' // Node 14 & 16
import Unocss from 'unocss/vite'
import { presetAttributify, presetUno } from 'unocss'
import presetIcons from '@unocss/preset-icons'
import transformerDirectives from '@unocss/transformer-directives'
import presetRemToPx from '@unocss/preset-rem-to-px'

const presets = [
    presetAttributify(),
    presetUno(),
    presetIcons(),
    presetRemToPx()
]

const transformers = [
    transformerDirectives(),
  ]

// https://vitejs.dev/config/
export default defineConfig({
    optimizeDeps: {
        esbuildOptions: {
            define: {
                global: "globalThis",
            }
        }
    },
    plugins: [
        vue(),
        crx({ manifest }),
        Unocss({
            mode: 'shadow-dom',
            include: ['content-scripts/*'],
            presets,
            transformers
        }),
        Unocss({
            include: ['options/**/*', 'pages/**/*'],
            presets,
            transformers
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    build: {
        rollupOptions: {
            input: {
                search: 'pages/search.html'
            }
        }
    }
})
