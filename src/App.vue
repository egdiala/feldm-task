<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  setup () {
    return {}
  }
})
</script>

<template>
  <BaseNavbar />
  <main class="flex-1 py-8">
    <router-view></router-view>
  </main>
</template>

<style>
#app {
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>