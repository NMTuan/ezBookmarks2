<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-12-19 16:27:49
 * @LastEditTime: 2022-12-29 16:58:12
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\options\router\index\index.vue
-->
<template>
    <div class="text-base leading-8">
        <h3 class="text-lg mt-12 mb-4">## 简单书签2</h3>
        <p>这是一个简约浏览器扩展。</p>
        <p>让你无压的使用浏览器的书签。</p>
        <p>目前所有数据源于您当前浏览器，没有任何网络请求。</p>
        <h3 class="text-lg mt-12 mb-4">## 无压搜索书签</h3>
        <p>
            在浏览网页的同时，你可以使用 `Alt+F`
            键快速呼出搜索对话框，检索你的书签。可以使用 `↑/↓`
            去快速移动高亮的选项，按`Enter`键后会在新标签中打开所选书签。同时，你可以使用
            `Alt+Enter` 去对应的搜索引擎中搜索你输入的关键字。
        </p>
        <p>
            如果快捷键无效或想要更换快捷键，请访问这里：
            <a href="chrome://extensions/shortcuts" target="_blank">
                chrome://extensions/shortcuts
            </a>
        </p>
        <h3 class="text-lg mt-12 mb-4">## 管理书签中的重复数据</h3>
        <p>
            该扩展会对比你所有书签数据，找到并列出那些 url
            地址相同的书签，由你去处理它们。
        </p>
        <p>注意：该功能会直接操作你浏览器中的书签，一旦删除变无法找回。</p>
    </div>
</template>
<script>
export default {
    icon: 'i-ri-bookmark-3-line'
}
</script>
