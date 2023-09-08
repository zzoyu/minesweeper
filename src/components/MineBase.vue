<script setup lang="ts" generic="T extends Cell[][]">
import type { Cell } from '@/types'
import MineCell from './MineCell.vue'

const props = defineProps<{
  modelValue: T
}>()
</script>

<template>
  <div class="mine-base">
    <div class="mine-base-row" v-for="(row, i) in modelValue" :key="i">
      <MineCell v-for="(item, j) in modelValue" :key="j" :value="item" />
    </div>
  </div>
</template>

<style scoped>
.mine-base {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.mine-base-row {
  display: flex;
  flex-direction: row;
}
</style>
@/types/type
