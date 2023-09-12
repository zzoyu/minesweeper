<script setup lang="ts">
import { onMounted, ref } from 'vue'

const props = defineProps<{
  texts: string[]
}>()

class Confetti {
  x: number
  y = Math.random() * ((window.innerHeight / 3) * 2)
  vector: { x: number; y: number }
  size = Math.round(Math.random() * 40 + 20)
  text: string
  degree: number

  constructor(
    texts: string[],
    public direction: 'left' | 'right'
  ) {
    this.x =
      direction === 'left'
        ? Math.random() * 100 + window.innerWidth + 50
        : Math.random() * 100 - 150
    this.degree = 10

    this.vector = {
      x: Math.random() * 2 + 1,
      y: Math.random() - 0.5
    }

    if (direction === 'left') {
      this.vector.x *= -1
      this.degree *= -1
    }

    this.text = texts[Math.floor(Math.random() * texts.length)]
  }
}

const canvas = ref<HTMLCanvasElement>()
const confetti = ref([
  ...new Array(30).fill(0).map(() => new Confetti(props.texts, 'left')),
  ...new Array(30).fill(0).map(() => new Confetti(props.texts, 'right'))
])

const render = () => {
  const ctx = canvas.value?.getContext('2d')
  if (!ctx) return

  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

  for (const particle of confetti.value) {
    ctx.save()
    ctx.beginPath()
    ctx.translate(particle.x - particle.size / 2, particle.y - particle.size / 2)
    ctx.rotate(particle.degree * (Math.PI / 180))
    ctx.font = `${particle.size}px serif`
    ctx.fillText(particle.text, 0, 0)
    ctx.restore()

    particle.y += particle.vector.y + Math.max(particle.y * 0.01, 0.5)
    particle.x += particle.vector.x

    particle.vector.y += Math.max(particle.y * 0.0001, 0.001)

    particle.degree += particle.direction === 'left' ? -1 : 1
  }

  removeConfetti()

  requestAnimationFrame(render)
}

const removeConfetti = () => {
  confetti.value = confetti.value.filter((particle) => particle.y < window.innerHeight)
}

onMounted(() => {
  canvas.value!.width = window.innerWidth
  canvas.value!.height = window.innerHeight

  render()

  window.addEventListener('resize', () => {
    canvas.value!.width = window.innerWidth
    canvas.value!.height = window.innerHeight
  })
})
</script>

<template>
  <canvas ref="canvas"></canvas>
</template>

<style scoped>
canvas {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 9999;
  width: 100vw;
  height: 100vh;
}
</style>
