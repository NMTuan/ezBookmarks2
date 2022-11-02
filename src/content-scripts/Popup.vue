<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-11-02 13:36:26
 * @LastEditTime: 2022-11-02 13:49:12
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\src\content-scripts\Popup.vue
-->
<script>
import { defineComponent, ref, onMounted, reactive, toRefs } from "vue";

export default defineComponent({
  setup() {
    const visible = ref(false);

    const state = reactive({
      currentTab: null
    });

    onMounted(() => {
      chrome.runtime.sendMessage({ type: "POPUP_INIT" }, async tab => {
        state.currentTab = await tab;
        console.log(state.currentTab);
      });
    });

    return {
      visible,
      ...toRefs(state)
    };
  }
});
</script>
<template>
  <div class=":uno: fixed inset-0 w-full h-full bg-black bg-opacity-10 z-50" v-show="visible">
    <div class=":uno: absolute top-4 right-4 bg-white shadow-lg p-4 rounded-md w-72">
      <h1>Legen...wait for it..dary</h1>
      <pre>{{ currentTab }}</pre>
    </div>
  </div>
</template>
