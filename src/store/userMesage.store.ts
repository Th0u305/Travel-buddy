import { create } from "zustand";
import { ChatUsersTs } from "../types/types";

export interface Message {
  id: string;
  room_id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  type?: string;
  metadata?: Record<string, unknown>;
  is_deleted?: boolean;
  created_at: string;
  updated_at: string;
}

interface UserMessageStore {
  roomId: string | null;
  setRoomId: (roomId: string) => void;

  chatUsers:ChatUsersTs[];
  setChatUsers: (chatUsers: ChatUsersTs[]) => void; 
}

export const useUserMessageStore = create<UserMessageStore>((set) => ({

  roomId: null,
  setRoomId: (roomId) => set({ roomId }),
  chatUsers: [],
  setChatUsers: (chatUsers) => set({ chatUsers }),
  
}));