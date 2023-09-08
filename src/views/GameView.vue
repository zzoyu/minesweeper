<script setup lang="ts">
import MineBase from '@/components/MineBase.vue'
import { useGameStore } from '@/stores/game'
import { Difficulty } from '@/types/'
import { useRoute } from 'vue-router'

const game = useGameStore()

const difficulty = Difficulty?.[(useRoute().query?.level as keyof typeof Difficulty) ?? 'easy']
if (!difficulty) throw new Error('Invalid difficulty')
game.newGame(difficulty)
</script>

<template>
  <main>
    <MineBase v-model="game.field" />
  </main>
</template>
@/types/type
