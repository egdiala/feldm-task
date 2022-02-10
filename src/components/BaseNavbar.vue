<template>
  <nav class="navbar">
    <div class="container mx-auto">
      <div class="flex items-center justify-between">
        <div>FeldM</div>
        <div>Home</div>
        <div>Me</div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseNavbar',
  setup () {
    return {}
  }
})
</script>

<style scoped>

</style>