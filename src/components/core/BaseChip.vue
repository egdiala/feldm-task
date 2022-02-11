<template>
  <div v-if="show" class="flex items-center space-x-1 font-medium pl-2.5 pr-2 py-0.5 rounded-2xl bg-blue-50 ">
    <span class="text-sm text-blue-700">{{ label }}</span>
    <button type="button" class="bg-transparent cursor-pointer border-none text-blue-400 text-xs chip-close" @click="show = !show">
        <BaseIcon icon="feather:x"></BaseIcon>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'

export default defineComponent({
    name: "BaseChip",
    props: {
        label: {
            type: String,
            default: ''
        }
    },
    setup(props) {
        props = reactive(props)
        const show = ref(!!props.label);
        return {
            show
        }
    }
})
</script>

<style>
button.chip-close .iconify {
    width: 12px;
    height: 12px;
}
</style>