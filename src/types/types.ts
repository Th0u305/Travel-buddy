export interface FullUserProfile {
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
  country: string | null;
  email: string;
  full_name: string | null;
  id: string;
  is_admin: boolean;
  is_premium: boolean;
  is_verified: boolean;
  subscription_plan: string | null;
  subscription_expires_at: string | null;
  subscription_tier: string | null;
  travel_interests: string | null;
  updated_at: string;
  visited_countries: string | null;
  is_deleted: boolean;
  username_slug: string | null;
  travel_plans?: TravelListTs[];
  is_password: boolean;
  providers: string[];
  phone: string | null;
}

export interface CreateTravelPlanTs {
  cover_url: string;
  trip_title: string;
  country: string;
  city: string;
  travel_type: string;
  start_date: string;
  end_date: string;
  min_budget: number;
  max_budget: number;
  max_travelers: number;
  trip_description: string;
  looking_for_buddy: boolean;
  tags: string[];
}

export interface TravelListTs {
  id: string;
  user_id: string;
  image: string;
  title: string;
  country: string;
  city: string;
  travel_type: string;
  start_date: string;
  end_date: string;
  min_budget: number;
  max_budget: number;
  max_buddies: number;
  description: string;
  looking_for_buddy: boolean;
  tags: string[];
  created_at: string;
  updated_at: string;
  profiles: SmallProfile;
  slug: string;
  participantsId: string[];
  participants_info: { avatar_url: string | null; username_slug: string | null }[];
}
export interface SmallProfile {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string;
  username_slug: string | null;
  is_password: boolean;
  provider: string[];
  subscription_tier: string | null;
  subscription_plan: string | null;
  subscription_expires_at: Date | null;
  bio : string | null;
}

export interface TravelBuddiesTs {
  title: string;
  country: string;
  city: string;
  start_date: string;
  end_date: string;
  tags: string[];
  slug: string;
  travel_type: string;
  profiles: SmallProfile;
}

export interface ChatUsersTs {
 last_message_at: string
 room_id:string
 user: SmallProfile;
 content?:string;
 sender_id?:string
 id?:string;

} 


export interface MessageHistoryTs {
  room_id?: string;
  messages?: Array<{
    updated_at: string;
    type: string;
    sender_id: string;
    room_id: string;
    receiver_id: string;
    metadata: { url: string; fileName: string };
    is_deleted: boolean;
    id: string;
    created_at: string;
    content: string;
  }>;
}