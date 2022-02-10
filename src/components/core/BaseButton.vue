<template>
    <button v-bind="$attrs" type="button" :class="classes">
        <span v-if="label">{{ label }}</span>
    </button>
</template>

<script lang="ts">
import { defineComponent, computed, reactive } from 'vue'

export default defineComponent({
    name: 'BaseButton',
    props: {
        label: {
            type: String,
            default: ''
        },
        regular: {
            type: Boolean,
            default: false
        },
        outlined: {
            type: Boolean,
            default: false
        },
        text: {
            type: Boolean,
            default: false
        },
    },
    setup (props) {
        props = reactive(props);
        return {
            classes: computed(() => ({
                'button': true,
                "button--regular": props.regular,
                "button--outlined": props.outlined,
                "button--text": props.text
            }))
        }
    }
})
</script>

<style scoped>
@import url(./../../index.css);
.button {
    @apply font-normal text-sm rounded-lg cursor-pointer select-none text-center justify-center inline-flex items-center space-x-2.5 py-2.5 px-3.5 !important;
}
.button--regular {
    @apply text-white bg-blue-600 focus:ring focus:ring-blue-200 transition duration-300 ease-in !important;
}
.button--outlined {
    @apply text-gray-600 bg-transparent border border-gray-600 focus:ring focus:ring-gray-200 transition duration-300 ease-in !important;
}
.button--text {
    @apply text-gray-600 hover:text-gray-900 bg-transparent focus:bg-gray-100 transition duration-300 ease-in !important;
}
</style>