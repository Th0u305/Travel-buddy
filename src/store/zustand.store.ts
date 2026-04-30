import { create } from "zustand";
import {
  FullUserProfile,
  SmallProfile,
  TravelBuddiesTs,
  TravelListTs,
} from "../types/types";

interface UserStore {
  userData: SmallProfile | null;
  setUserData: (userData: SmallProfile) => void;
  removeUserData: () => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (state: boolean) => void;

  travelLists: TravelListTs[];
  setTravelLists: (travelLists: TravelListTs[]) => void;

  singleTravelList: TravelListTs | null;
  setSingleTravelList: (singleTravelList: TravelListTs) => void;

  travelBuddies: TravelBuddiesTs[];
  setTravelBuddies: (travelBuddies: TravelBuddiesTs[]) => void;

  viewUserProfile: FullUserProfile | null;
  setViewUserProfile: (viewUserProfile: FullUserProfile) => void;

  userFullProfile: FullUserProfile | null;
  setUserFullProfile: (userFullProfile: FullUserProfile) => void;

}

export const useUserStore = create<UserStore>()((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (state: boolean) => set({ isLoggedIn: state }),
  userData: null,
  setUserData: (userData: SmallProfile) =>
    set({ userData, isLoggedIn: true }),
  removeUserData: () => set({ userData: null, isLoggedIn: false }),

  travelLists: [],
  setTravelLists: (travelLists: TravelListTs[]) => set({ travelLists }),

  singleTravelList: null,
  setSingleTravelList: (singleTravelList: TravelListTs) =>
    set({ singleTravelList }),

  travelBuddies: [],
  setTravelBuddies: (travelBuddies: TravelBuddiesTs[]) =>
    set({ travelBuddies }),

  viewUserProfile: null,
  setViewUserProfile: (viewUserProfile: FullUserProfile) =>
    set({ viewUserProfile }),

  userFullProfile: null,
  setUserFullProfile: (userFullProfile: FullUserProfile) =>
    set({ userFullProfile }),

}));
