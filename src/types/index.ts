export enum State {
  hidden,
  flagged,
  question,
  revealed,
  exploded
}

export interface Cell {
  state: State
  isMine: boolean
  neighbor: number
}

export enum GameState {
  ready,
  playing,
  won,
  lost
}

export type FieldInformation = {
  width: number
  height: number
  mines: number
}

export const Difficulty = {
  easy: {
    width: 9,
    height: 9,
    mines: 10
  },
  normal: {
    width: 16,
    height: 16,
    mines: 40
  },
  hard: {
    width: 30,
    height: 16,
    mines: 99
  }
}
