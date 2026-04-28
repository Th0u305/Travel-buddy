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

  userProfileCompleted : boolean
  setUserProfileCompleted: (userProfileCompleted: boolean) => void,
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

      userProfileCompleted : false,
      setUserProfileCompleted: (userProfileCompleted: boolean) => set({ userProfileCompleted }),
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
          state?.setHasHydrated(true);
        }
        if(state?.userFullProfile){
          if (!state?.userFullProfile?.bio || !state?.userFullProfile?.avatar_url || !state?.userFullProfile?.country || !state?.userFullProfile?.travel_interests || !state?.userFullProfile?.phone) {
            state?.setUserProfileCompleted(true);
          }else{
            state?.setUserProfileCompleted(false)
          }
        }else{
          state?.setUserProfileCompleted(false)
        }
      },
    },
  )
)

