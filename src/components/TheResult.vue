<script setup lang="ts">
import { useGameStore } from '@/stores/game'

defineProps<{
  message: string
}>()

const retry = () => {
  useGameStore().retry()
}
</script>

<template>
  <div>
    <h1>{{ message }}</h1>
    <button @click="retry()">다시하기</button>
  </div>
</template>

<style scoped>
div {
  position: fixed;
  z-index: 9999;
  padding: 2rem;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 2rem;
}

button {
  padding: 1rem;
  border-radius: 1rem;
  background-color: white;

  font-size: large;
}
</style>
