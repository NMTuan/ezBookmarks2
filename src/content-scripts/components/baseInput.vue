<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-10-22 15:29:20
 * @LastEditTime: 2022-11-11 16:44:48
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\src\content-scripts\components\baseInput.vue
-->
<template>
    <div class=":uno:
        flex
        items-center
        flex-shrink-0 
        text-white
        bg-neutral-500
        rounded mb-3
       " :class="{
           'text-white/60': disabled
       }">
        <div v-if="$slots.prepend">
            <slot name="prepend" />
        </div>
        <input ref="el" class=":uno:
        flex-grow
        bg-transparent 
        px-4 py-3
        outline-none
        text-base
        placeholder-neutral-400
        " :class="{
            'cursor-not-allowed': disabled
        }" :type="type" :placeholder="placeholder" :autocomplete="autocomplete" :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)" :disabled="disabled" />
        <div v-if="$slots.append">
            <slot name="append" />
        </div>
    </div>
</template>

<script setup>
import {
    // defineProps,
    // defineEmits,
    ref,
    computed
} from "vue";
const props = defineProps({
    type: {
        type: String,
        default: "text"
    },
    placeholder: {
        type: String,
        default: ""
    },
    modelValue: {
        type: String,
        default: ""
    },
    disabled: {
        type: Boolean,
        default: false
    }
});
const emits = defineEmits(["update:modelValue"]);
const el = ref(null);
const autocomplete = computed(() => {
    return props.type === "password" ? "current-password" : "off";
});

const focus = () => {
    el.value.focus();
};
defineExpose({ focus });
</script>
