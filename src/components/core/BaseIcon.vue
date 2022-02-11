<template>
    <Icon :icon="icon" v-bind="$attrs" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Icon } from '@iconify/vue';

export default defineComponent({
    name: 'BaseIcon',
    components: { Icon },
    props: {
        icon: {
            type: String,
            required: true
        },
    },
    setup () {
        return {

        }
    }
})
</script>