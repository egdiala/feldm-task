<template>
    <div v-if="loading" class="flex w-full">
        <lottie-player src="https://assets10.lottiefiles.com/packages/lf20_w6xlywkv.json"  background="transparent"  speed="1"  style="width: 100%; height: 300px;"  loop  autoplay></lottie-player>
    </div>
    <div v-else class="flex justify-center w-full">
        <span v-if="alive" class="text-gray-800 text-3xl underline decoration-green-500">Looks good!</span>
        <span v-else class="text-gray-800 text-3xl underline decoration-red-500">Not so good!</span>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'

export default defineComponent({
    name: 'Health',
    setup () {
        const loading = ref(false);
        // check API health status
        async function checkHealth() {
            loading.value = true;
            let url = import.meta.env.VITE_BASE_URL + "/health";
            try {
                let res = await fetch(url);
                let data = await res.json();
                alive.value = data
                loading.value = false;
            }
            catch (error) {
                console.log(error);
                loading.value = false;
            }
        };
        onMounted(() => {
            checkHealth();
        });
        const alive = ref()
        return {
            alive,
            loading
        }
    }
})
</script>

<style scoped>

</style>