<template>
    <div class="text-left">
        <label v-if="label" class="mb-1 label">{{ label }}</label>
        <div class="relative block">
            <span v-if="icon" class="absolute inset-y-0 flex items-center left-0 pl-4">
                <BaseIcon :icon="icon" class="fill-slate-300 text-gray-400" />
            </span>
            <select v-bind="{...$attrs, onChange: ($event) => { $emit('update:modelValue', $event.target.value) } }" :value="modelValue" :class="classes">
              <option v-for="option in options" :key="option" :value="option" :selected="option === modelValue">{{ option }}</option>
            </select>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue'

export default defineComponent({
    name: 'BaseSelect',
    props: {
        icon: {
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
        },
        options: {
            type: Array,
            required: true
        }
    },
    setup(props) {
        props = reactive(props);
        const inputPadding = computed(() => {
            if (props.icon) {
                return 'pl-10';
            }
        });
        return {
            classes: computed(() => ({
                'select': true,
                [`${inputPadding.value}`]: true
            }))
        }
    },
})
</script>

<style scoped>
  .select {
    @apply placeholder-gray-500 text-base bg-transparent text-gray-700 font-normal;
  }
</style>