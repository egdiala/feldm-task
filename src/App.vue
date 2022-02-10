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
  <img alt="Vue logo" src="./assets/logo.png" />
</template>

<style>
#app {
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>