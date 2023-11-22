import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { IUserDTO } from '../interfaces/UserDTO'

type UserStoreProps = {
  user: IUserDTO | null
  setUser: (user: IUserDTO) => void
  removeUser: () => void
}

export const userStore = create<UserStoreProps>()(devtools(persist(set => ({
  user: null,
  setUser(user) {
    set(state => ({ ...state, user }))
  },
  removeUser() {
    set(state => ({ ...state, user: null }))
  },
}), {
  name: "@user-storage"
})))