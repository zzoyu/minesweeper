import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach } from 'vitest'
import { useGameStore } from './game'
import { Difficulty, type Cell, State } from '@/types'

describe('Game Store', () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia())
  })

  it.each([
    [100, 100],
    [1000, 1000],
    [3000, 3000]
  ])('2d array with Array.from %i*%i', (width, height) => {
    const field = Array.from(new Array(height), () =>
      Array.from(new Array(width), () => ({
        isMine: false,
        state: State.hidden,
        neighbor: 0
      }))
    )
  })

  it.each([
    [100, 100],
    [1000, 1000],
    [3000, 3000]
  ])('2d array case with for statement %i*%i', (width, height) => {
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
  })

  it.each([
    [Difficulty.easy],
    [Difficulty.normal],
    [Difficulty.hard],
    [
      {
        width: 100,
        height: 100,
        mines: 9999
      }
    ]
  ])(
    'placing mines with fisher-yates to field $width*$height with $mines mines',
    ({ width, height, mines }) => {
      const store = useGameStore()
      const field = store.makeField(width, height)

      const count = width * height

      const candidates: number[] = []

      for (let i = 0; i < count; i++) candidates.push(i)

      const resultRandomNumbers = []

      for (let i = candidates.length - 1; i >= count - mines; i--) {
        const k = Math.floor(Math.random() * (i + 1))
        resultRandomNumbers.push(candidates[k])
      }

      for (const item of resultRandomNumbers) {
        field[Math.floor(item / width)][item % width].isMine = true
      }

      expect(resultRandomNumbers.length).toBe(mines)
    }
  )
  it.each([
    [Difficulty.easy],
    [Difficulty.normal],
    [Difficulty.hard],
    [
      {
        width: 100,
        height: 100,
        mines: 9999
      }
    ]
  ])(
    'placing mines with random to field $width*$height with $mines mines',
    ({ width, height, mines }) => {
      const store = useGameStore()
      const field = store.makeField(width, height)

      for (let i = 0; i < mines; i++) {
        const y = Math.floor(Math.random() * height)
        const x = Math.floor(Math.random() * width)

        if (!field[y][x].isMine) {
          field[y][x].isMine = true
        } else {
          i--
        }
      }
    }
  )

  it('new game', () => {
    const game = useGameStore()
    game.newGame(Difficulty.hard)
    expect(game.field.length).toBe(Difficulty.hard.height)
    expect(game.field[0].length).toBe(Difficulty.hard.width)

    let mines = 0
    for (let y = 0; y < Difficulty.hard.height; y++) {
      for (let x = 0; x < Difficulty.hard.width; x++) {
        if (game.field[y][x].isMine) {
          mines++
        }
      }
    }
    expect(mines).toBe(Difficulty.hard.mines)
  })

  it('mine count is correct', () => {
    const game = useGameStore()

    game.newGame(Difficulty.hard)
    game.field.map((row, y) => {
      row.map((cell, x) => {
        if (cell.isMine) return
        let count = 0
        game.field[y - 1]?.[x - 1]?.isMine && count++
        game.field[y - 1]?.[x]?.isMine && count++
        game.field[y - 1]?.[x + 1]?.isMine && count++

        game.field[y]?.[x - 1]?.isMine && count++
        game.field[y]?.[x + 1]?.isMine && count++

        game.field[y + 1]?.[x - 1]?.isMine && count++
        game.field[y + 1]?.[x]?.isMine && count++
        game.field[y + 1]?.[x + 1]?.isMine && count++

        expect(cell.neighbor).toBe(count)
      })
    })
  })
})
