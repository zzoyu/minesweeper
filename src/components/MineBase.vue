<script setup lang="ts" generic="T extends Cell">
import { State, type Cell, GameState } from '@/types'
import MineCell from './MineCell.vue'
import { useGameStore } from '@/stores/game'

defineProps<{
  modelValue: T[][]
}>()

const game = useGameStore()

const handleClick = (x: number, y: number) => {
  game.revealCell(x, y)
}

const handleRightClick = (cell: Cell) => {
  if (cell.state === State.revealed) return

  if (cell.state === State.question) {
    cell.state = State.hidden
  } else {
    cell.state++
  }
}
</script>

<template>
  <div class="mine-base">
    <div class="mine-base-row" v-for="(row, i) in modelValue" :key="i">
      <MineCell
        v-for="(item, j) in row"
        :key="j"
        :value="item"
        @right-click="handleRightClick(item)"
        @click="handleClick(j, i)"
      />
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
