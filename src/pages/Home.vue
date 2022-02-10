<template>
    <div class="container mx-auto py-2.5 px-4 lg:px-0">
        <div class="flex items-center justify-between">
            <h1 class="text-3xl font-semibold text-gray-900">API Data</h1>
            <BaseButton label="Random" regular></BaseButton>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Home',
    setup() {
        return {};
    }
})
</script>

<style scoped>

</style>