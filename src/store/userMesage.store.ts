import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { FullUserProfile, TravelBuddiesTs, TravelListTs } from '../types/types' 

interface UserStore {

}


export const useUserMessageStore = create<UserStore>()(
  
  persist(
    (set) => ({}),
    {
      name: "hello-world",
      partialize: () => ({}),
    },
  )
)

