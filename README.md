# 🌍 Travel & Community Platform - Frontend

A modern, high-performance frontend application built for planning trips, finding travel buddies, and engaging with a global community. 

This application is built using the **Next.js App Router**, leveraging Route Groups for clean layout management and authentication separation.

## 🚀 Tech Stack

- **Framework:** [Next.js (App Router)](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) && Shadch ui
- **State Management (Server):** [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **State Management (Client/UI):** [Zustand](https://zustand-demo.pmnd.rs/)
- **Backend/Realtime/Auth:** [Supabase](https://supabase.com/) & Hono API

## 📂 Architecture & Routing

This project uses Next.js Route Groups (folders in parentheses like `(public)`) to share layouts across multiple routes without adding those folders to the URL path.

### Directory Structure

```text
src/app/
├── (dashboard)               # 🔒 Protected Routes (Requires Authentication)
│   └── dashboard/
│       ├── my-trips/         # User's saved/booked trips
│       ├── profile/          # Private user profile management
│       ├── settings/         # Account and app settings
│       ├── page.tsx          # Dashboard overview
│       ├── DashboardLayout.tsx # Shared layout wrapper (sidebar/nav)
│       └── layout.tsx        # Dashboard group layout logic
│
└── (public)                  # 🌐 Publicly Accessible Routes
    ├── auth/                 # Auth callbacks/handling
    ├── community/            # Public forum or community feed
    ├── create-travel-plan/   # Trip builder wizard
    ├── findBuddies/          # Travel companion search
    ├── home/                 # Main landing page
    ├── login/                # Authentication
    ├── price/                # Pricing or subscription tiers
    ├── profile/              # Public-facing user profiles
    ├── register/             # Account creation
    ├── reset-password/       # Password recovery flow
    ├── trips/                # Publicly visible trips or itineraries
    ├── layout.tsx            # Standard public layout (Navbar/Footer)
    └── page.tsx              # Root landing page (redirects or hero)
```

## ✨ Key Features

- **Route Segregation:** Public pages and protected dashboard pages have entirely separate layouts and authentication checks.
- **Real-Time Community:** Built-in real-time chat and community features powered by Supabase WebSockets.
- **Optimistic UI:** Instant message delivery and UI updates using TanStack Query cache mutations.
- **Travel Planning:** Interactive flows for creating and managing complex travel itineraries.

## 🛠️ Getting Started

### Prerequisites

Make sure you have Node.js (v18.17+ recommended) installed.

### 1. Clone & Install
```bash
git clone <your-repo-url>
cd frontend
npm install
```

### 2. Environment Variables
Create a `.env.local` file in the root directory and add the following keys. You will need these to connect to your Supabase instance and Hono backend.

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Backend API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8787 # Or your deployed Hono URL
```

### 3. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
