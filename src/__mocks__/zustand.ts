import { act } from '@testing-library/react'
import { vi } from 'vitest'
import * as zustand from 'zustand'

const { create: actualCreate, createStore: actualCreateStore } = await vi.importActual<typeof zustand>('zustand')


export const storeResetFns = new Set<() => void>()

const createUncurried = <T>(stateCreator: zustand.StateCreator<T>) => {
  const store = actualCreate<T>(stateCreator)
  const initialState = store.getState()

  storeResetFns.add(() => {
    store.setState(initialState, true)
  })
  return store
}

export const create = (<T>(stateCreator: zustand.StateCreator<T>) => {
  return typeof stateCreator === "function" ? createUncurried(stateCreator) : createUncurried
}) as typeof zustand.create

export const createStoreUncurried = <T>(stateCreator: zustand.StateCreator<T>) => {
  const store = actualCreateStore(stateCreator)
  const initialState = store.getState()

  storeResetFns.add(() => {
    store.setState(initialState, true)
  })

  return store
}

export const createStore = (<T>(stateCreator: zustand.StateCreator<T>) => {
  return typeof stateCreator === "function" ? createStoreUncurried(stateCreator) : createStoreUncurried
})

afterEach(() => {
  act(() => {
    storeResetFns.forEach(fn => fn())
  })
}) 