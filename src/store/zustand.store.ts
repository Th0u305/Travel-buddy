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

  viewUserProfile : FullUserProfile | null
  setViewUserProfile: (viewUserProfile: FullUserProfile) => void,

  userFullProfile : FullUserProfile | null
  setUserFullProfile: (userFullProfile: FullUserProfile) => void,

  updateError : boolean
  setUpdateError: (updateError: boolean) => void,
}


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

      viewUserProfile : null,
      setViewUserProfile: (viewUserProfile: FullUserProfile) => set({ viewUserProfile }),

      userFullProfile : null,
      setUserFullProfile: (userFullProfile: FullUserProfile) => set({ userFullProfile }),

      updateError : false,
      setUpdateError: (updateError: boolean) => set({ updateError }),
    }),
    {
      name: "hello-world",
      // storage: createJSONStorage(() => localStorage),
      partialize: () => ({}),
      onRehydrateStorage : ()=> (state) => {
        if (state?.userData) {
          if(!state?.userData?.data?.avatar_url){
            state?.setUpdateError(true)
          }else{
            state?.setUpdateError(false)
          }
          state?.setIsLoggedIn(true);
        }else{
          state?.setUpdateError(false)
          state?.setIsLoggedIn(false)
          state?.removeUserData()
          state?.setHasHydrated(true);
        }
      },
    },
  )
)

