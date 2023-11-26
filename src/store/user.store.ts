import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import { IUserDTO } from '../interfaces/UserDTO'

type UserStoreProps = {
  user: IUserDTO | null
  setUser: (user: IUserDTO) => void
  removeUser: () => void
  createdAt: Date
}

export const userStore = create<UserStoreProps>()(devtools(persist(set => ({
  user: null,
  createdAt: new Date(),
  setUser(user) {
    set(state => ({ ...state, user }))
  },
  removeUser() {
    set(state => ({ ...state, user: null }))
  },
}), {
  name: "@user-storage",
  storage: createJSONStorage(() => sessionStorage)
})))