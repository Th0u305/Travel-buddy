import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { FullUserProfile, SmallProfileZustand, TravelBuddiesTs, TravelListTs } from '../types/types' 

interface UserStore {
  userData: SmallProfileZustand | null
  setUserData: (userData: SmallProfileZustand) => void 
  removeUserData: () => void
  isLoggedIn : boolean
  setIsLoggedIn: (state: boolean) => void
  hasHydrated : boolean
  setHasHydrated: (state: boolean) => void

  travelLists : TravelListTs[]
  setTravelLists: (travelLists: TravelListTs[]) => void,

  singleTravelList : TravelListTs | null
  setSingleTravelList: (singleTravelList: TravelListTs) => void,

  travelBuddies : TravelBuddiesTs[]
  setTravelBuddies: (travelBuddies: TravelListTs[]) => void,

  fullUserProfile : FullUserProfile | null
  setFullUserProfile: (fullUserProfile: FullUserProfile) => void,
}

// export const useUserStore = create<UserStore>()((set) => ({
//   isLoggedIn : false,
//   userData: {} as UserTs,
//   setUserData: (userData: UserTs) => set({ userData, isLoggedIn: true }),
//   removeUserData: () => set({ userData: {} as UserTs, isLoggedIn: false }),
//   setIsLoggedIn: (state: boolean) => set({ isLoggedIn: state }),
//   hasHydrated : false,
//   setHasHydrated: (state: boolean) => set({ hasHydrated: state }),
//   travelLists : [],
//   setTravelLists: (travelLists: TravelListTs[]) => set({ travelLists }),

//   singleTravelList : null,
//   setSingleTravelList: (singleTravelList: TravelListTs) => set({ singleTravelList }),

//   travelBuddies : [],
//   setTravelBuddies: (travelBuddies: TravelListTs[]) => set({ travelBuddies }),
// }))


export const useUserStore = create<UserStore>()(
  
  persist(
    (set) => ({
      isLoggedIn : false,
      setIsLoggedIn: (state: boolean) => set({ isLoggedIn: state }),
      userData: null,
      setUserData: (userData: SmallProfileZustand) => set({ userData, isLoggedIn: true}),
      removeUserData: () => set({ userData: null, isLoggedIn: false }),

      hasHydrated : false,
      setHasHydrated: (state: boolean) => set({ hasHydrated: state }),

      travelLists : [],
      setTravelLists: (travelLists: TravelListTs[]) => set({ travelLists }),

      singleTravelList : null,
      setSingleTravelList: (singleTravelList: TravelListTs) => set({ singleTravelList }),

      travelBuddies : [],
      setTravelBuddies: (travelBuddies: TravelBuddiesTs[]) => set({ travelBuddies }),

      fullUserProfile : null,
      setFullUserProfile: (fullUserProfile: FullUserProfile) => set({ fullUserProfile }),
    }),
    {
      name: "hello-world",
      // storage: createJSONStorage(() => localStorage),
      partialize: () => ({}),
      onRehydrateStorage : ()=> (state) => {
        if (state?.userData) {
          state?.setIsLoggedIn(true);
        }else{
          state?.setIsLoggedIn(false)
          state?.removeUserData()
        }
        state?.setHasHydrated(true);
      },
    },
  )
)

