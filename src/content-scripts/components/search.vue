<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-11-07 13:21:12
 * @LastEditTime: 2022-11-21 16:33:34
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\src\content-scripts\components\search.vue
-->
<template>
    <BaseDialog :show="show" @update:show="handleClose" no-header closeOnClickMask closeOnPressEscape>
        <BaseInput ref='el' v-model="q" class=":uno: !mb-0"></BaseInput>
        <div class="mt-3" v-if="lists.length > 0">
            <ListItem v-for="(item, index) in lists" :item="item" :active="index === active" ref="items"
                @mouseenter="handleActive(index)" @reload="fetch"></ListItem>
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
const items = ref([])
const active = ref(0)   // 高亮项目
const correction = 50   // 上下滚动时，距边的修正值

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

const fetch = (close) => {
    chrome.runtime.sendMessage({
        'type': 'fetchBookmarks',
        payload: { q: q.value } // 这里注意，如果直接传 q，那在 q=='' 的时候传过去变成 {}
    }, ({ errors, data }) => {
        log('[errors]', errors);
        log('[data]', data);
        if (errors) {
            alert(errors.message)
            lists.value = []
            return
        }
        active.value = 0    // 每次获取数据，重置高亮项
        lists.value = data
        if (close) {
            handleClose()
        }
    })
}

const handleClose = () => {
    emits('update:show', false)
}

// 处理按键
const handleKeydown = (e) => {

    log('keydown', e.key)
    // 高亮 向上
    if (e.key === 'ArrowUp' && active.value > 0) {
        e.preventDefault();
        active.value--
        handleActiveCanBeSee()
    }
    // 高亮 向下
    if (e.key === 'ArrowDown' && active.value < lists.value.length - 1) {
        e.preventDefault();
        active.value++
        handleActiveCanBeSee()
    }
    // 回车
    if (e.key === 'Enter') {
        items.value[active.value].handleClick()
    }
}

// 保证高亮项目能看到
const handleActiveCanBeSee = () => {
    nextTick(() => {
        const target = items.value[active.value]
        const scrollTop = document.querySelector('.simplebar-content-wrapper').scrollTop

        if (active.value === 0) {
            // 顶
            document.querySelector('.simplebar-content-wrapper').scrollTop = 0
        } else if (target.$el.offsetTop + target.$el.clientHeight > scrollTop + window.innerHeight) {
            // 下边
            document.querySelector('.simplebar-content-wrapper').scrollTop = target.$el.offsetTop + target.$el.clientHeight - window.innerHeight + correction

        } else if (target.$el.offsetTop < scrollTop) {
            // 上边
            document.querySelector('.simplebar-content-wrapper').scrollTop = target.$el.offsetTop - correction
        }


    })
}

// 显示时聚焦搜索框
watch(showState, (val) => {
    if (val) {
        window.addEventListener('keydown', handleKeydown) // 监听按键

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
    } else {
        window.removeEventListener('keydown', handleKeydown)    // 取消监听按键
    }
})

// 监听搜索内容
watch(q, () => {
    fetch()
})

</script>
