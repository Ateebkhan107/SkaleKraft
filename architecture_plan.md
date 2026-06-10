# SkaleKraft Project Architecture & Implementation Plan

This document outlines the complete architectural vision, folder structure, database schema, and implementation plan for SkaleKraft, an enterprise-grade AI, Software, and Growth Agency website.

## 1. Technology Stack Selection

*   **Frontend**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Framer Motion (for UI animations), GSAP (for complex scroll/timeline animations), React Three Fiber (for 3D elements), Shadcn UI.
*   **Backend**: Next.js Server Actions & API Routes. *(Chosen over a separate Express backend to maximize synergy with Vercel deployment, provide seamless end-to-end type safety, and reduce infrastructure complexity).*
*   **Database**: PostgreSQL hosted on Supabase.
*   **Authentication**: Supabase Auth.
*   **Email**: Resend (for contact forms, newsletters, and proposal generation emails).
*   **Hosting**: Vercel.

## 2. Complete Folder Structure

We will use a unified Next.js repository structure that handles both the frontend UI and the backend logic securely.

```text
SkaleKraft/
├── src/
│   ├── app/                    # Next.js App Router (Pages & Layouts)
│   │   ├── (marketing)/        # Group for public pages
│   │   │   ├── page.tsx        # Homepage (Hero, Services, Portfolio, etc.)
│   │   │   ├── about/
│   │   │   ├── services/
│   │   │   ├── portfolio/
│   │   │   ├── case-studies/
│   │   │   ├── contact/
│   │   │   ├── blog/
│   │   │   ├── ai-consultant/
│   │   │   ├── website-analyzer/
│   │   │   └── proposal-generator/
│   │   ├── (admin)/            # Protected Admin Dashboard
│   │   │   └── dashboard/      
│   │   ├── api/                # Next.js API Routes (Webhooks, 3rd party integrations)
│   │   ├── layout.tsx          # Root Layout (Fonts, Providers, SEO)
│   │   └── globals.css         # Tailwind & GSAP global styles
│   │
│   ├── components/             # Reusable UI Components
│   │   ├── layout/             # Navbar, Footer, SectionWrappers
│   │   ├── hero/               # 3D Hero, Particle Backgrounds
│   │   ├── services/           # Hover expanding cards, interactive ecosystem
│   │   ├── portfolio/          # 3D project cards
│   │   ├── testimonials/       # Auto-moving carousel
│   │   ├── animations/         # GSAP ScrollTrigger wrappers, Framer Motion HOCs
│   │   ├── forms/              # Contact, Proposal, Analyzer forms
│   │   ├── ai/                 # AI Consultant interactive UI
│   │   └── ui/                 # Shadcn UI base components
│   │
│   ├── lib/                    # Core utilities and configs
│   │   ├── supabase/           # Supabase client (server & browser)
│   │   ├── utils.ts            # Tailwind merge, common helpers
│   │   └── validations/        # Zod schemas for forms & API requests
│   │
│   ├── server/                 # Backend Logic (Server Actions)
│   │   ├── actions/            # Form submissions, DB mutations
│   │   ├── queries/            # DB data fetching
│   │   ├── ai/                 # OpenAI integration logic
│   │   └── email/              # Resend templates and sending logic
│   │
│   ├── hooks/                  # Custom React hooks (e.g., useGSAP, useLenis)
│   ├── types/                  # TypeScript interfaces and DB schema types
│   ├── constants/              # Static data (Navigation links, Tech stack logos)
│   └── store/                  # Zustand (Global state, if needed)
│
├── public/                     # Static assets (fonts, images, 3D models)
├── supabase/
│   ├── migrations/             # SQL Migration files
│   └── seed.sql                # Initial seed data
├── tailwind.config.ts          # Tailwind tokens (Colors, Typography)
├── next.config.ts
└── package.json
```

## 3. Database Schema (Supabase PostgreSQL)

We will implement the following relational schema to manage the platform's data.

### Tables & Relationships

*   **`users`**: Extends Supabase auth.users. Role-based access (admin, client).
*   **`services`**: Stores service offerings (e.g., "App Development", "AI Agents").
*   **`portfolio_categories`**: E.g., "Web3", "Ecommerce", "AI".
*   **`projects`**: Portfolio items. Linked to categories. Contains hero_image, overview, challenges, solutions, results.
*   **`testimonials`**: Client reviews, ratings, and company logos.
*   **`blog_categories`** & **`blog_posts`**: Content management for the blog.
*   **`contact_submissions`**: Standard contact form entries.
*   **`strategy_calls`**: Bookings for consultation.
*   **`lead_magnets`**: Downloads/Interactions with lead generation tools.
*   **`website_analysis_requests`**: Logs of URLs analyzed by the Website Analyzer tool.
*   **`proposal_requests`**: Leads generated from the Proposal Generator tool.
*   **`newsletter_subscribers`**: Email list management.

### Example SQL Initialization Script (Preview)

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  role TEXT DEFAULT 'client',
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  overview TEXT,
  challenges TEXT,
  solutions TEXT,
  results TEXT,
  hero_image_url TEXT,
  technologies TEXT[], -- Array of strings
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE contact_submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  service_interest TEXT,
  budget TEXT,
  project_description TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 4. Design System & Aesthetics

**Theme**: Premium Dark / Futuristic Luxury
*   **Primary Accent**: `#00E5FF` (Cyan/Neon Blue - represents tech, AI, speed)
*   **Secondary Accent**: `#8B5CF6` (Vivid Purple - represents creativity, intelligence)
*   **Background**: `#050816` (Deep space void - high contrast)
*   **Cards/Surface**: `#0F172A` (Slate 900 - glassmorphism layers)
*   **Text**: `#FFFFFF` (Primary), `#94A3B8` (Muted/Secondary)

**Typography**:
*   *Headings*: **Space Grotesk** (Tech-forward, geometric, premium).
*   *Body*: **Inter** (Highly legible, modern standard).

**Animation Philosophy (60 FPS Target)**:
1.  **React Three Fiber**: Used sparingly in the Hero section (e.g., an abstract rotating 3D mesh or particle field) to immediately establish a "$50M startup" feel.
2.  **GSAP ScrollTrigger**: Used for heavy scroll-linked animations, pinning sections (like the 6-step "How We Work" timeline), and revealing items dynamically.
3.  **Framer Motion**: Used for micro-interactions (hover states, layout transitions, modals, page routing).

## 5. API & Backend Architecture (Next.js Server Actions)

Instead of traditional REST API endpoints, we will heavily utilize Next.js **Server Actions** for form submissions and data mutations. This ensures zero client-side JavaScript bundle bloat for forms and provides end-to-end type safety with Zod.

*   `submitContactForm(data: ContactFormData)`: Validates input, inserts into Supabase, triggers Resend email to admin.
*   `generateAiProposal(data: ProposalData)`: Calls OpenAI API with system prompts tailored for SkaleKraft, saves lead to Supabase, returns streaming text response to UI.
*   `analyzeWebsite(url: string)`: Triggers a server-side fetch to Lighthouse API / Puppeteer, calculates scores, saves request to DB.

## 6. Environment Variables (`.env.local`)

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_key

# OpenAI (AI Consultant & Proposal Generator)
OPENAI_API_KEY=your_openai_api_key

# Resend (Emails)
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL_TO=hello@skalekraft.com

# System
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 7. Deployment Guide

1.  **Vercel**: Link GitHub repository to Vercel. Vercel automatically detects Next.js.
2.  **Environment Variables**: Add all `.env.local` keys to the Vercel project settings.
3.  **Supabase**: Run the final SQL migration scripts in the Supabase SQL Editor to provision tables.
4.  **Resend**: Verify the domain `skalekraft.com` on Resend to enable production email sending.
5.  **Build**: Vercel will handle the `next build` command. The App Router architecture ensures maximum Edge caching and fast delivery.

---

### Next Steps

If you approve of this architecture and plan, I will begin by:
1. Initializing the Next.js 15 project with Tailwind CSS and TypeScript.
2. Setting up the folder structure.
3. Configuring the design system (fonts, colors, Tailwind config).
4. Building out the UI layer starting with the layout and homepage.

Please let me know if you would like to adjust any of the architectural decisions or if we should proceed with code generation!
