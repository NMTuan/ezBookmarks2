<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-11-08 11:54:19
 * @LastEditTime: 2022-11-11 16:40:17
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\src\content-scripts\components\create.vue
-->
<template>
    <BaseDialog :show="show" title="New Bookmark">
        <form action="" @submit.prevent="handleSubmit">
            <BaseInput v-model="formData.name" placeholder="Site Title" />
            <BaseInput v-model="formData.url" disabled placeholder="Site Url" />
            <BaseInput ref='el' v-model="tags" placeholder="Tags(commas or spaces are automatically split)" />
            <BaseButton class=":uno: flex-1 bg-sky-500/50 hover:bg-sky-500" :loading="loading">
                Create
            </BaseButton>
            <pre>{{ formatedTags }}</pre>
            <pre>{{ formData }}</pre>
        </form>
    </BaseDialog>
</template>
<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import log from "@/utils/log";

import BaseDialog from './baseDialog.vue';
import BaseInput from './baseInput.vue';
import BaseButton from './baseButton.vue';

const props = defineProps({
    show: {
        type: Boolean,
        default: false
    }
})
const emits = defineEmits(['update:show'])

const formData = ref({
    name: '',
    url: ''
})
const tags = ref('')
const loading = ref(false)
const el = ref()

const showState = computed(() => props.show)

// 处理 输入框中的 tags
const formatedTags = computed(() => {
    return tags.value.replace(/\s/g, ' ')
        // 分割
        .split(/[,， ]/)
        // 去重
        .reduce((total, tag) => {
            // 存在且不重复
            if (tag && total.indexOf(tag) < 0) {
                total.push(tag)
            }
            return total
        }, [])
        // 整理数据格式
        // tags.name 为主键，因为想要它能自动创建或关联已存在数据。
        // 这里传参要注意，第一层为关联表中字段的名字，第二层为tags表的主键。
        .reduce((total, tag) => {
            total.push({
                tags_name: {
                    name: tag
                }
            })
            return total
        }, [])
})

const handleSubmit = () => {
    if (loading.value) {
        return
    }
    loading.value = true
    chrome.runtime.sendMessage({
        type: 'createBookmark',
        payload: {
            name: formData.value.name,
            url: formData.value.url,
            tags: formatedTags.value,
            date_updated: new Date().toISOString()
        }
    }, ({ errors, data }) => {
        log('[errors]', errors);
        log('[data]', data);
        loading.value = false
        emits('update:show', false)
    })
}

onMounted(() => {
    formData.value.name = document.title
    formData.value.url = location.href
})

watch(showState, (val) => {
    if (val) {
        nextTick(() => {
            setTimeout(() => {
                el.value.focus()
            }, 200)
        })
    }
})
</script>
