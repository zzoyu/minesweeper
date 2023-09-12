import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { State, type Cell, type FieldInformation, Difficulty, GameState } from '@/types'

const directions = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1]
]

export const useGameStore = defineStore('game', () => {
  const field = ref<Cell[][]>([])
  const fieldInformation = ref<FieldInformation>(Difficulty.easy)

  const gameState = ref<GameState>(GameState.ready)

  const makeField = (width: number, height: number) => {
    const field: Cell[][] = []
    for (let y = 0; y < height; y++) {
      const row: Cell[] = []
      for (let x = 0; x < width; x++) {
        row.push({
          isMine: false,
          state: State.hidden,
          neighbor: 0
        })
      }
      field.push(row)
    }
    return field
  }

  const placeMines = (field: Cell[][], mines: number) => {
    for (let i = 0; i < mines; i++) {
      const y = Math.floor(Math.random() * fieldInformation.value.height)
      const x = Math.floor(Math.random() * fieldInformation.value.width)

      if (!field[y][x].isMine) {
        field[y][x].isMine = true
      } else {
        i--
      }
    }

    for (let y = 0; y < fieldInformation.value.height; y++) {
      for (let x = 0; x < fieldInformation.value.width; x++) {
        field[y][x].neighbor = countNeighbor(field, x, y)
      }
    }
  }

  const countNeighbor = (field: Cell[][], x: number, y: number) => {
    let neighbor = 0
    for (const direction of directions) {
      const targetY = y + direction[0]
      const targetX = x + direction[1]

      if (!isValidCell(field, targetX, targetY)) {
        continue
      }
      if (field[targetY][targetX].isMine) neighbor++
    }

    return neighbor
  }

  const revealCell = (x: number, y: number) => {
    if (field.value[y][x].state !== State.hidden) return

    if (field.value[y][x].isMine) {
      field.value[y][x].state = State.exploded
      gameState.value = GameState.lost
      revealAll()
      return
    }

    if (field.value[y][x].neighbor > 0) {
      field.value[y][x].state = State.revealed
    } else {
      spreadCell(field.value, [{ x, y }], [])
    }

    if (isClear()) {
      gameState.value = GameState.won
      revealAll()
    }
  }

  const revealAll = () => {
    for (let y = 0; y < fieldInformation.value.height; y++) {
      for (let x = 0; x < fieldInformation.value.width; x++) {
        if (field.value[y][x].state === State.flagged) {
          if (!field.value[y][x].isMine) field.value[y][x].state = State.flaggedWrong
        } else field.value[y][x].state = State.revealed
      }
    }
  }

  const isClear = () => {
    let count = 0
    for (let y = 0; y < fieldInformation.value.height; y++) {
      for (let x = 0; x < fieldInformation.value.width; x++) {
        if (field.value[y][x].state !== State.revealed && !field.value[y][x].isMine) {
          count++
        }
      }
    }
    if (count) {
      return false
    }
    return true
  }

  const isValidCell = (field: Cell[][], x: number, y: number) => {
    if (x < 0 || y < 0 || x >= fieldInformation.value.width || y >= fieldInformation.value.height) {
      return false
    }
    return true
  }

  const spreadCell = (
    field: Cell[][],
    next: { x: number; y: number }[],
    visited: { x: number; y: number }[]
  ) => {
    const current = next.pop()
    if (!current) return

    field[current.y][current.x].state = State.revealed
    visited.push(current)

    for (const direction of directions) {
      const targetY = current.y + direction[0]
      const targetX = current.x + direction[1]
      if (
        isValidCell(field, targetX, targetY) &&
        field[targetY][targetX].state !== State.revealed
      ) {
        if (
          visited.some((cell) => {
            cell.x === targetX && cell.y === targetY
          })
        )
          continue
        if (field[targetY][targetX].neighbor > 0) {
          field[targetY][targetX].state = State.revealed
          continue
        }
        next.push({ x: targetX, y: targetY })
      }
    }
    spreadCell(field, next, visited)
  }

  const newGame = (_fieldInformation: FieldInformation) => {
    gameState.value = GameState.ready
    fieldInformation.value = _fieldInformation
    field.value = makeField(_fieldInformation.width, _fieldInformation.height)
    placeMines(field.value, _fieldInformation.mines)
  }

  const retry = () => {
    newGame(fieldInformation.value)
  }

  const flaggedCount = computed(() => {
    return field.value.reduce((count, row) => {
      return (
        row.filter((cell) => {
          cell.state === State.flagged
        }).length + count
      )
    }, 0)
  })

  return { field, newGame, revealCell, retry, gameState, fieldInformation, flaggedCount }
})
