<template>
    <div class="p-0 border-0 shadow-none text-left">
        <label v-if="label" class="nova-label mb-1">{{ label }}</label>
        <div class="relative block">
            <span v-if="icon" :class="`absolute inset-y-0 flex items-center ${iconRight}`">
                <BaseIcon v-if="iconPosition == 'left'" :icon="icon" class="fill-slate-300 text-gray-400" />
            </span>
            <input type="text" v-bind="$attrs" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :class="classes"  />
            <slot></slot>
            <span v-if="icon" :class="`absolute inset-y-0 flex items-center ${iconRight}`">
                <BaseIcon v-if="iconPosition == 'right'" :icon="icon" class="fill-slate-300 text-gray-400" />
            </span>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue'

export default defineComponent({
    name: 'BaseInput',
    props: {
        icon: {
            type: String,
            required: false
        },
        iconPosition: {
            type: String,
            required: false
        },
        label: {
            type: String,
            required: false,
        },
        modelValue: {
            type: [String, Number],
            default: ''
        }
    },
    setup(props) {
        props = reactive(props);
        const iconRight = computed(() => {
            if (props.icon) {
                return props.iconPosition == 'right' ? 'right-0 pr-4' : 'left-0 pl-4';
            }
        });
        const inputPadding = computed(() => {
            if (props.icon) {
                return props.iconPosition == 'right' ? 'pr-10' : 'pl-10';
            } else {
                return 'px-3.5';
            }
        });
        return {
            classes: computed(() => ({
                'input': true,
                [`${inputPadding.value}`]: true
            })),
            iconRight,
        }
    },
})
</script>

<style scoped>
@import url(./../../index.css);
.input {
    @apply placeholder-gray-500 text-base bg-transparent text-gray-700 font-normal;
}
</style>