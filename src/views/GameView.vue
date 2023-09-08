<script setup lang="ts">
import MineBase from '@/components/MineBase.vue'
import { useGameStore } from '@/stores/game'
import { Difficulty } from '@/types/'

console.log(Difficulty.easy)

const game = useGameStore()
game.newGame(Difficulty.easy)
</script>

<template>
  <main>
    <MineBase v-model="game.field" />
  </main>
</template>
@/types/type
