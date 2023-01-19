<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-12-19 16:27:49
 * @LastEditTime: 2023-01-19 15:14:16
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\options\router\index\index.vue
-->
<template>
    <div class="text-base leading-8">
        <h1># {{ getI18n('ext_name') }}</h1>
        <p>{{ getI18n('index_intro_1') }}</p>
        <p>{{ getI18n('index_intro_2') }}</p>
        <p>{{ getI18n('index_intro_3') }}</p>

        <h2>## {{ getI18n('index_title2') }}</h2>
        <p>{{ getI18n('index_title2_p1') }}</p>
        <p>
            {{ getI18n('index_title2_p2') }}
            <a
                href="chrome://extensions/shortcuts"
                target="_blank"
                class="text-blue-400"
                @click="openNewTab('chrome://extensions/shortcuts')"
            >
                chrome://extensions/shortcuts
            </a>
        </p>
        <h2>## {{ getI18n('index_title3') }}</h2>
        <p>{{ getI18n('index_title3_p1') }}</p>
        <p>{{ getI18n('index_title3_p2') }}</p>
    </div>
</template>
<script setup>
import { getI18n } from '../../../utils'
const openNewTab = (url) => {
    if (url) {
        chrome.tabs.create({ url })
    }
}
</script>
<script>
export default {
    icon: 'i-ri-bookmark-3-line'
}
</script>
