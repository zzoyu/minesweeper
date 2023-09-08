<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { GameState } from './types'
import { useGameStore } from './stores/game'

const game = useGameStore()
</script>

<template>
  <header>
    <img
      v-if="game.gameState === GameState.ready || game.gameState === GameState.playing"
      alt="logo"
      class="logo"
      src="@/assets/normal.png"
      width="150"
    />
    <img
      v-else-if="game.gameState === GameState.won"
      alt="logo"
      class="logo"
      src="@/assets/won.png"
      width="150"
    />
    <img v-else alt="logo" class="logo" src="@/assets/lost.png" width="150" />

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
