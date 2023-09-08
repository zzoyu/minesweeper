import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { State, type Cell, type MapInformation } from '@/types'

export const useGameStore = defineStore('game', () => {
  const field = ref<Cell[][]>([])
  const difficulty = ref<MapInformation>()

  const makeField = (width: number, height: number) => {
    const field: Cell[][] = []
    for (let y = 0; y < height; y++) {
      const row: Cell[] = []
      for (let x = 0; x < width; x++) {
        row.push({
          isMine: false,
          state: State.hidden,
          around: 0
        })
      }
      field.push(row)
    }
    return field
  }

  const placeMines = (field: Cell[][], mines: number) => {
    for (let i = 0; i < mines; i++) {
      const y = Math.floor(Math.random() * field.length)
      const x = Math.floor(Math.random() * field.length)

      if (!field[y][x].isMine) {
        field[y][x].isMine = true
      } else {
        i--
      }
    }
  }

  const newGame = (difficulty: MapInformation) => {
    console.log(difficulty)
    field.value = makeField(difficulty.width, difficulty.height)
    placeMines(field.value, difficulty.mines)
  }

  return { field, newGame }
})
