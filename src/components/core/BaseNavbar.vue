<template>
  <nav class="navbar">
    <div class="container mx-auto py-2.5 px-4 lg:px-0">
      <div class="flex items-center justify-between">
        <div class="text-2xl text-gray-900 font-medium">FeldM</div>
        <div class="flex items-center space-x-2">
          <BaseButton label="Home" text></BaseButton>
          <BaseButton label="API Health" text></BaseButton>
        </div>
        <div class="h-10 w-10 rounded-full border-2 border-indigo-200 overflow-clip">
          <img src="https://avatars.githubusercontent.com/u/46764458?s=48&v=4">
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: "BaseNavbar",
    setup() {
        return {};
    }
})
</script>

<style scoped>
@import url(./../../index.css);
.navbar {
  @apply top-0 right-0 left-0 h-16 flex items-center bg-white border-gray-200 px-2 sticky z-10 !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
</style>