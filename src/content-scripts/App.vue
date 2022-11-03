<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-11-02 13:36:26
 * @LastEditTime: 2022-11-03 16:28:37
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\src\content-scripts\App.vue
-->
<template>
  <div>
    <Login />
    <div class=":uno: fixed inset-0 w-full h-full bg-black bg-opacity-10 z-50" v-show="visible">
      <div class=":uno: absolute top-4 right-4 bg-white shadow-lg p-4 rounded-md w-72">
        <h1>Legen...wait for it..dary</h1>
        <pre>{{ state.currentTab }}</pre>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import Login from './components/login.vue'

const visible = ref(false);
const state = reactive({
  currentTab: null
});

const handleMessage = ({ type = '', action = '', payload = {} }) => {
  console.log('[message]', type, action, payload);
  if (type === 'action') {
    visible.value = !visible.value
  }
}

// 初始化
onMounted(() => {
  // 通知后台，POPUP_INIT
  // 让后台取当前窗口信息
  chrome.runtime.sendMessage({ type: "POPUP_INIT" }, async tab => {
    state.currentTab = await tab;
    console.log(state.currentTab);
  });
});

defineExpose({ handleMessage })

</script>
<style lang="scss">
#ezBookmarks2 {
  // @apply text-base;
  @apply bg-neutral-700;

  * {
    @apply box-border;
    @apply text-base font-normal not-italic;
  }

  input,
  button {
    @apply border-none;
    @apply bg-transparent;
  }
}
</style>
