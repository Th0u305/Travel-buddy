

import { create } from 'zustand'
import { UserTs } from '../types/types'


interface UserStore {
  userData: UserTs
  setUserData: (userData: UserTs) => void
  removeUserData: () => void
  isAuthenticated : boolean
}

export const useUserStore = create<UserStore>()((set) => ({
  isAuthenticated : false,
  userData: {} as UserTs,
  setUserData: (userData: UserTs) => set({ userData, isAuthenticated: true }),
  removeUserData: () => set({ userData: {} as UserTs, isAuthenticated: false }),
}))

