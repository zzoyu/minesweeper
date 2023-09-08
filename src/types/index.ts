export enum State {
  hidden,
  revealed,
  flagged
}

export type Cell = {
  state: State
  isMine: boolean
  around: number
}

export type MapInformation = {
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
