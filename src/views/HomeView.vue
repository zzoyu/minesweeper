<script setup lang="ts"></script>

<template>
  <main>
    <h1>난이도 선택</h1>
    <div>
      <RouterLink to="game?level=easy">쉬움</RouterLink>
      <RouterLink to="game?level=normal">보통</RouterLink>
      <RouterLink to="game?level=hard">어려움</RouterLink>
    </div>
  </main>
</template>

<style scoped>
div {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

a {
  height: 100px;
  width: 200px;
  border: 1px solid #ccc;
  background-color: #fff;
  font-size: 20px;
  color: #333;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
}

a:hover {
  background-color: #ccc;
}
</style>
