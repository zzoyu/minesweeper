<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { GameState } from './types'
import { useGameStore } from './stores/game'
import Confetti from './components/TheConfetti.vue'

const game = useGameStore()
</script>

<template>
  <header>
    <Confetti v-if="game.gameState === GameState.lost" :texts="['💣', '💣', '💣', '💥']" />
    <Confetti v-else-if="game.gameState === GameState.won" :texts="['🌼', '🎉', '🎊', '🎈']" />
    <div :class="GameState[game.gameState].toString()" alt="logo" class="logo" />
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
  background-image: url(@/assets/sprite.png);
  background-repeat: no-repeat;
  background-position: 0 0;
  background-size: auto 173px;
  width: 150px;
  height: 173px;
  background-color: transparent;
}

.logo.lost {
  background-position: -150px 0;
}
.logo.won {
  background-position: -300px 0;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
