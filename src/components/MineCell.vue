<script setup lang="ts">
import { State, type Cell } from '@/types'
import { computed } from 'vue'

const props = defineProps<{
  value: Cell
}>()

const emit = defineEmits<{
  click: [void]
  rightClick: [void]
}>()

const innerText = computed(() => {
  switch (true) {
    case props.value.state === State.hidden:
      return ''
    case props.value.state === State.flagged:
      return '🚩'
    case props.value.state === State.question:
      return '❓'
    case props.value.state === State.exploded:
      return '💥'
    case props.value.state === State.revealed:
      if (props.value.isMine) return '💣'
      else if (props.value.neighbor === 0) return ''
      else return props.value.neighbor.toString()
    default:
      return ''
  }
})
</script>

<template>
  <button
    @click="emit('click')"
    @contextmenu.prevent="emit('rightClick')"
    :class="State[value.state].toString()"
  >
    {{ innerText }}
  </button>
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
  backface-visibility: hidden;
  transform-style: preserve-3d;
}

.revealed,
.exploded {
  background-color: #ccc;
  animation: reveal 0.3s;
  position: relative;
}

.revealed::after {
  left: 0;
  top: 0;
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #fff;
  backface-visibility: hidden;
  transform: rotate3d(1, 0, 0, 180deg);
}

@keyframes reveal {
  from {
    background-color: #fff;
    /* flipped backward */
    transform: rotate3d(1, 0, 0, 180deg);
  }
  to {
    background-color: #ccc;
    transform: rotate3d(1, 0, 0, 0deg);
  }
}
</style>
