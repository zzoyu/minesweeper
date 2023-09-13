import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach } from 'vitest'
import { useGameStore } from './game'
import { Difficulty } from '@/types'

describe('Game Store', () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia())
  })

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
