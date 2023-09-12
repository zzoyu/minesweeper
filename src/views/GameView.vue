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
    <div class="information">
      <div class="information-item">
        <div>
          {{ game.fieldInformation.mines }}
        </div>
        <div>
          <span>지뢰 수</span>
        </div>
      </div>
      <div class="information-item">
        <div>
          {{ game.flaggedCount }}
        </div>
        <div>
          <span>깃발 수</span>
        </div>
      </div>
    </div>
    <MineBase v-model="game.field" />
  </main>
</template>

<style scoped>
.information {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 0.5rem;
}
.information-item {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.information-item > div:first-child {
  font-size: 2rem;
  font-weight: bold;
}
.information-item > div:last-child {
  font-size: 1rem;
  font-weight: bold;
  background-color: slategray;
  color: white;
  border-radius: 0.5rem;
  padding: 0px 0.5rem;
}
</style>
