import { act } from '@testing-library/react'
import { vi } from 'vitest'
import { IUserDTO } from '../interfaces/UserDTO'
import { mockUser } from '../mocks/user'
import { userStore } from './user.store'

vi.mock("zustand", async () => {
  const actual = await vi.importActual("zustand") as typeof import("zustand");
  return {
    ...actual,
    createStore: vi.fn(() => ({
      ...actual.createStore(),
      setState: vi.fn(),
    })),
  }
})

const initialState = userStore.getState()

describe("user store test suite", () => {
  beforeEach(() => {
    userStore.setState(initialState)
  })

  it("Should test setUser", () => {

    act(() => {
      initialState.setUser(mockUser as IUserDTO)
    })

    expect(userStore.getState().user).toEqual(mockUser)
  })

  it("Should test remove user", () => {

    act(() => {
      initialState.setUser(mockUser as IUserDTO)
    })

    act(() => {
      initialState.removeUser()
    })

    expect(userStore.getState().user).toEqual(null)
  })
})