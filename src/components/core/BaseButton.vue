<template>
    <button v-if="!to" v-bind="$attrs" type="button" :class="classes" :disabled="disabled">
        <BaseIcon :icon="icon" />
        <span v-if="label">{{ label }}</span>
    </button>
    <a v-if="to && isExternalLink" v-bind="$attrs" :href="to" target="_blank" :class="classes">
        <BaseIcon :icon="icon" />
        <span v-if="label">{{ label }}</span>
    </a>
    <router-link v-if="to && !isExternalLink" v-bind="$attrs" :to="to" type="button" :class="classes">
        <BaseIcon :icon="icon" />
        <span v-if="label">{{ label }}</span>
    </router-link>
</template>

<script lang="ts">
import { defineComponent, computed, reactive } from 'vue'

export default defineComponent({
    name: "BaseButton",
    props: {
        label: {
            type: String,
            default: ""
        },
        icon: {
            type: String,
            default: ""
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
        to: {
            type: String,
            default: ""
        },
        disabled: {
            type: Boolean,
            required: false
        },
    },
    setup(props) {
        props = reactive(props);
        const isExternalLink = computed(() => {
            return props.to.startsWith("http");
        });
        return {
            classes: computed(() => ({
                "button": true,
                "button--regular": props.regular,
                "button--outlined": props.outlined,
                "button--text": props.text,
                "button--disabled": props.text
            })),
            isExternalLink
        };
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
    @apply text-gray-600 bg-transparent border border-gray-300 hover:bg-gray-100 transition duration-300 ease-in !important;
}
.button--text {
    @apply text-gray-600 hover:text-gray-900 bg-transparent focus:bg-gray-100 transition duration-300 ease-in !important;
}
[type="button"]:disabled.button--outlined {
    @apply text-gray-300 bg-gray-200 border border-gray-300 hover:bg-gray-200 cursor-not-allowed !important;
}
.router-link-exact-active {
    @apply bg-gray-100 !important;
}
</style>