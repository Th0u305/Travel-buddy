import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { UserTs } from '../types/types' 

interface UserStore {
  userData: UserTs | null
  setUserData: (userData: UserTs) => void 
  removeUserData: () => void
  isLoggedIn : boolean
  setIsLoggedIn: (state: boolean) => void
  hasHydrated : boolean
  setHasHydrated: (state: boolean) => void
}

// export const useUserStore = create<UserStore>()((set) => ({
//   isLoggedIn : false,
//   userData: {} as UserTs,
//   setUserData: (userData: UserTs) => set({ userData, isLoggedIn: true }),
//   removeUserData: () => set({ userData: {} as UserTs, isLoggedIn: false }),
//   setIsLoggedIn: (state: boolean) => set({ isLoggedIn: state }),
//   hasHydrated : false,
//   setHasHydrated: (state: boolean) => set({ hasHydrated: state })
// }))


export const useUserStore = create<UserStore>()(
  
  persist(
    (set) => ({
      isLoggedIn : false,
      setIsLoggedIn: (state: boolean) => set({ isLoggedIn: state }),
      userData: null,
      setUserData: (userData: UserTs) => set({ userData, isLoggedIn: true}),
      removeUserData: () => set({ userData: null, isLoggedIn: false }),

      hasHydrated : false,
      setHasHydrated: (state: boolean) => set({ hasHydrated: state }),
    }),
    {
      name: "userData",
      // storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({userData: state.userData, isLoggedIn: true}),
      onRehydrateStorage : ()=> (state) => {
        if (state?.userData) {
          state.isLoggedIn = true;
        }else{
          state?.setIsLoggedIn(false)
          // state?.removeUserData()
        }
        // Signal that the store is ready
        state?.setHasHydrated(true);
      },
    },
  )
)

