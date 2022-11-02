<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-10-20 17:09:24
 * @LastEditTime: 2022-11-02 17:02:54
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\src\content-scripts\components\dialog.vue
-->
<template>
    <div class="ez text-neutral-300">
        <div class="ez absolute inset-0 z-10 bg-transparent backdrop-blur-sm" @click="clickMask">
            <BaseSimplebar class="ez h-full overflow-hidden">
                <div class="ez bg-neutral-700 mx-auto my-12vh overflow-hidden rounded p-4
                    w-90%
                    sm:w-80%
                    md:w-70% 
                    lg:w-50%
                    " @click.stop="clickContainer">
                    <div class="flex items-center text-lg">
                        <div class="flex-1">
                            {{ title }}
                        </div>
                        <div class="flex items-center justify-center rounded w-6 h-6 text-center cursor-pointer"
                            hover="bg-neutral-500/30" @click="clickCloseIcon">
                            <div class="i-ri-close-line"></div>
                        </div>
                    </div>
                    <div class="mt-6 mb-2">
                        <slot />
                    </div>
                    <div v-if="$slots.foot">
                        <slot name="foot" :close="close" />
                    </div>
                </div>
            </BaseSimplebar>
        </div>
    </div>
</template>
<script setup>
// const router = useRouter()
const props = defineProps({
    title: {
        type: String,
        default: ''
    },
    closeOnClickMask: {
        type: Boolean,
        default: false
    }
})

const close = () => {
    // router.back()
}
const clickMask = () => {
    if (props.closeOnClickMask) {
        close()
    }
}
const clickCloseIcon = () => {
    close()
}
const clickContainer = () => {
    return
}
</script>
