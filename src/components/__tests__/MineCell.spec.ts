import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import MineCell from '../MineCell.vue'

import { type Cell, State } from '@/types'

describe('Cell', () => {
  it('hidden', () => {
    const wrapper = mount(MineCell, {
      props: {
        value: Object({
          isMine: true,
          state: State.hidden,
          neighbor: 4
        }) as Cell
      }
    })
    expect(wrapper.text()).toBe('')
  })
  it('revealed but no neighbor', () => {
    const wrapper = mount(MineCell, {
      props: {
        value: Object({
          isMine: false,
          state: State.revealed,
          neighbor: 0
        }) as Cell
      }
    })
    expect(wrapper.text()).toBe('')
  })
  it('revealed and has neighbor', () => {
    const wrapper = mount(MineCell, {
      props: {
        value: Object({
          isMine: false,
          state: State.revealed,
          neighbor: 1
        }) as Cell
      }
    })
    expect(wrapper.text()).toBe('1')
  })
  it('revealed and mine', () => {
    const wrapper = mount(MineCell, {
      props: {
        value: Object({
          isMine: true,
          state: State.revealed,
          neighbor: 0
        }) as Cell
      }
    })
    expect(wrapper.text()).toBe('💣')
  })
  it('mine and exploded', () => {
    const wrapper = mount(MineCell, {
      props: {
        value: Object({
          isMine: true,
          state: State.exploded,
          neighbor: 0
        }) as Cell
      }
    })
    expect(wrapper.text()).toBe('💥')
  })
})
