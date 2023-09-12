<script setup lang="ts">
import MineBase from '@/components/MineBase.vue'
import TheResult from '@/components/TheResult.vue'
import { useGameStore } from '@/stores/game'
import { Difficulty, GameState } from '@/types/'
import { useRoute } from 'vue-router'

const game = useGameStore()

const difficulty = Difficulty?.[(useRoute().query?.level as keyof typeof Difficulty) ?? 'easy']
if (!difficulty) throw new Error('Invalid difficulty')
game.newGame(difficulty)
</script>

<template>
  <main>
    <TheResult v-if="game.gameState === GameState.lost" message="패배..." />
    <TheResult v-else-if="game.gameState === GameState.won" message="승리!" />
    <MineBase v-model="game.field" />
  </main>
</template>

<style scoped></style>
