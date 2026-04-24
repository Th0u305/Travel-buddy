export interface FullUserProfile {
  data: {
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
    stripe_customer_id: string | null;
    subscription_expires_at: string | null;
    subscription_tier: string | null;
    travel_interests: string | null;
    updated_at: string;
    visited_countries: string | null;
    is_deleted: boolean;
    username_slug: string | null;
  };
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
  looking_for_buddy : boolean;
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
  participantsId : string[];
}
export interface SmallProfile {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string;
  username_slug: string | null;
}
export interface SmallProfileZustand {
  data: SmallProfile
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
