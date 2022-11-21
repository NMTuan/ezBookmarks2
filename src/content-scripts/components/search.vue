<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-11-07 13:21:12
 * @LastEditTime: 2022-11-21 14:49:25
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\src\content-scripts\components\search.vue
-->
<template>
    <BaseDialog :show="show" @update:show="handleClose" no-header closeOnClickMask closeOnPressEscape>
        <BaseInput ref='el' v-model="q" class="!mb-0"></BaseInput>
        <div class="mt-3" v-if="lists.length > 0">
            <ListItem v-for="(item, index) in lists" :item="item" :active="index === active"
                @mouseenter="handleActive(index)" @reload="fetch()"></ListItem>
        </div>
    </BaseDialog>
</template>
<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import log from '@/utils/log'

import BaseDialog from './baseDialog.vue';
import BaseInput from './baseInput.vue'
import ListItem from './listItem.vue'

const el = ref()
const q = ref('')   // 关键字
const lists = ref([])
const active = ref(0)   // 高亮项目

const props = defineProps({
    'show': {
        type: Boolean,
        default: false
    }
})
const emits = defineEmits(['update:show'])

const showState = computed(() => props.show)

// 处理高亮
const handleActive = (index) => {
    active.value = index
}

const fetch = () => {
    chrome.runtime.sendMessage({
        'type': 'fetchBookmarks',
        payload: { q: q.value } // 这里注意，如果直接传 q，那在 q=='' 的时候传过去变成 {}
    }, ({ errors, data }) => {
        log('[errors]', errors);
        log('[data]', data);
        if (errors) {
            alert(errors.message)
            lists.value = []
        } else {
            lists.value = data
        }
    })
}

const handleClose = () => {
    emits('update:show', false)
}

// 显示时聚焦搜索框
watch(showState, (val) => {
    if (val) {
        // 如果列表空，且没搜过，则取一次数据
        if (q.value === '' && lists.value.length === 0) {
            fetch()
        }
        nextTick(() => {
            // 由于弹层位置调整已经是在nextTick中触发，所以这里再加个延时
            setTimeout(() => {
                el.value.focus()
            }, 200)
        })
    }
})

// 监听搜索内容
watch(q, () => {
    fetch()
})

</script>
