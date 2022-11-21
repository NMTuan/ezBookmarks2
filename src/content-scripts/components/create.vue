<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-11-08 11:54:19
 * @LastEditTime: 2022-11-21 13:30:03
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\src\content-scripts\components\create.vue
-->
<template>
    <BaseDialog :show="show" @update:show="handleClose" title="New Bookmark">
        <form action="" @submit.prevent="handleSubmit">
            <BaseInput v-model="formData.name" placeholder="Site Title" />
            <BaseInput v-model="formData.url" disabled placeholder="Site Url" />
            <BaseInput ref='el' v-model="tags" placeholder="Tags(commas or spaces are automatically split)" />
            <div class="flex">
                <BaseButton class=":uno: flex-1 bg-sky-500/50 hover:bg-sky-500" :loading="loading">
                    {{ formData.id ? 'Update' : 'Create' }}
                </BaseButton>
                <BaseButton v-if="formData.id" class=":uno: ml-3 bg-red-500/50 hover:bg-red-800" type="button"
                    @click="handleDelete">
                    <IconDeleteBin5Line />
                </BaseButton>
            </div>
        </form>
    </BaseDialog>
</template>
<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import log from "@/utils/log";

import BaseDialog from './baseDialog.vue';
import BaseInput from './baseInput.vue';
import BaseButton from './baseButton.vue';
import IconDeleteBin5Line from './iconDeleteBin5Line.vue'

const props = defineProps({
    show: {
        type: Boolean,
        default: false
    }
})
const emits = defineEmits(['update:show'])

const formData = ref({
    id: '',
    name: '',
    url: ''
})
const tags = ref('')
const deleteTagsId = ref([])    // 要移除的tagsId
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

const handleClose = () => {
    emits('update:show', false)
}

const handleSubmit = () => {
    if (loading.value) {
        return
    }
    loading.value = true

    if (formData.value.id) {
        // 编辑书签
        chrome.runtime.sendMessage({
            type: 'updateBookmark',
            payload: {
                id: formData.value.id,
                name: formData.value.name,
                // url: formData.value.url,
                tags: {
                    create: formatedTags.value,
                    delete: deleteTagsId.value
                }
                // tags: ,
            }
        }, ({ errors, data }) => {
            log('[errors]', errors);
            log('[data]', data);
            loading.value = false
            emits('update:show', false)
        })
    } else {
        // 创建书签
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


}

const handleDelete = () => {
    const action = confirm(`Data cannot be recovered after deletion. Are you sure you want to delete [${formData.value.name}]`)
    if (!action) {
        return
    }

    chrome.runtime.sendMessage({
        type: 'deleteBookmark',
        payload: {
            id: formData.value.id
        }
    }, ({ errors, data }) => {
        log('[errors]', errors);
        log('[data]', data);
        emits('update:show', false)
        formData.value = { id: '', name: '', url: '' }
        tags.value = ''
        deleteTagsId.value = []
    })
}

watch(showState, (val) => {
    log('xxx', val)
    if (!val) {
        return
    }
    // 查询当前数据
    chrome.runtime.sendMessage({
        type: 'fetchBookmark',
        payload: {
            filter: JSON.stringify({
                url: {
                    _eq: location.href
                }
            })
        }

    }, ({ errors, data }) => {
        log('[errors]', errors);
        log('[data]', data);
        if (!errors && data.length > 0) {
            formData.value.id = data[0].id
            formData.value.name = data[0].name
            formData.value.url = data[0].url
            tags.value = data[0].tags.reduce((total, item) => {
                deleteTagsId.value.push(item.id)
                total.push(item.tags_name)
                return total
            }, []).join(' ')
        } else {
            formData.value.name = document.title
            formData.value.url = location.href

        }
        loading.value = false
    })


    // 聚焦 tags 输入框
    nextTick(() => {
        setTimeout(() => {
            el.value.focus()
        }, 200)
    })
})
</script>
