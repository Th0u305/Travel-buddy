export interface UserTs {
  data: {
    avatar_url: string | null;
    bio: string | null;
    created_at: string;
    current_location: string | null;
    email: string;
    full_name: string | null;
    id: string;
    is_admin: boolean;
    is_premium: boolean;
    is_verified: boolean;
    profile_picture: string | null;
    stripe_customer_id: string | null;
    subscription_expires_at: string | null;
    subscription_tier: string | null;
    travel_interests: string | null;
    updated_at: string;
    visited_countries: string | null;
    is_deleted: boolean;
  };
}
