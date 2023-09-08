<script setup lang="ts" generic="T extends Cell">
import type { Cell } from '@/types'

const props = defineProps<{
  value: T
}>()

const emit = defineEmits<{
  reveal: [value: T]
}>()
</script>

<template>
  <button>{{ value.isMine ? '💣' : '' }}</button>
</template>

<style scoped>
button {
  width: 40px;
  height: 40px;
  border: 1px solid #ccc;
  background-color: #fff;
  font-size: 20px;
  color: #333;
  outline: none;
}
</style>
@/types/type
