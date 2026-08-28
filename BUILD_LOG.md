# TechFirm Monorepo Architecture & Build Log

## Overview
This document logs key architectural decisions, design token mappings, API specifications, and implementation steps across the TechFirm monorepo.

---

## 1. Design Token System
Extracted from Figma Desktop MCP Server (file `Wx7YR2r48y5wW57mrJZo9d`):
- **Deep Navy / Black**: `#12121C` / `#141432`
- **Vibrant Accent Teal**: `#2DD4BF` (Primary brand highlight)
- **Deep Teal**: `#0D9488` (Hover states & dark badges)
- **Soft Teal Tint**: `#E5FBF6` (Light badges & tag backgrounds)
- **Neutral Backgrounds**: `#FFFFFF`, `#F9FAFB` (gray-50), `#F3F4F6` (gray-100)
- **Border Grays**: `#E5E7EB` (gray-200), `#1F2937` (gray-800)
- **Font Families**: Inter, Outfit, Geist Sans

---

## 2. Monorepo Architecture
- **`packages/types`**: TypeScript data contracts (`IPlan`, `IPost`, `IPostAuthor`, `IContactMessage`, `IUser`, `BillingPeriod`, `UserRole`).
- **`packages/validators`**: Zod schemas (`createPlanSchema`, `updatePlanSchema`, `createPostSchema`, `updatePostSchema`, `createContactMessageSchema`, `updateContactMessageSchema`).
- **`packages/ui`**: Shared UI primitives (buttons, badges, inputs, dialogs, cards).
- **`apps/api`**: NestJS backend service (Port 5000) with Mongoose / MongoDB schemas, controllers, DTOs, seeder, JWT auth, and RBAC guards.
- **`apps/web`**: Next.js 16 public web portal (Port 3000) containing all 13 Figma frames.
- **`apps/dashboard`**: Next.js 16 administrator control console (Port 3001) for managing plans, blog posts, contact inquiries, and users.

---

## 3. Implemented Web Routes (`apps/web`)

### Tier 1 (Core Conversion Pages)
1. **Homepage (`/`)** [Frame `02` / `3:14692`]
   - Hero section with badge & domain search bar
   - TLD pricing matrix (`.com`, `.net`, `.org`, `.io`, `.co`)
   - 4-column metrics counter (`250+`, `99.99%`, `45+`, `15m`)
   - 3-column Service highlights row
   - 3-tier Pricing Plan preview
   - Enterprise Case Studies carousel
   - Client Testimonials
   - Categorized FAQ Accordion
   - Dark CTA Band (`Ready to Modernize Your Infrastructure?`)
2. **Our Services (`/services`)** [Frame `11_Our_Services` / `3:44246`]
   - 2x3 grid of all 6 core services
   - 3-step structured implementation workflow
   - Custom IT Package consultation teaser
3. **Our Pricing Plan (`/pricing`)** [Frame `19_Our_Pricing_Plan` / `3:50115`]
   - Dynamic monthly / annual pricing toggle (with 20% annual discount)
   - Dynamic fetch against backend `/api/plans` with seamless static fallback
   - Trusted partner logo ticker
   - Customer review cards and pricing FAQ accordion
4. **Our FAQs (`/faqs`)** [Frame `20_Our_FAQs` / `3:50597`]
   - Real-time search query filtering
   - Category filtering pills (All, Cloud, Security, Pricing, General)
   - Animated expandable accordion answers
   - 24/7 dedicated support card
5. **Contact Us (`/contact`)** [Frame `21_Contact_Us` / `3:50889`]
   - Office location cards (Rotterdam HQ, Phone, Email)
   - Validated React Hook Form with Zod validation
   - Interactive Google Map embed

### Tier 2 (Authority & Content Pages)
6. **About Us (`/about`)** [Frame `10_About_Us` / `3:42980`]
   - Engineering philosophy and company history
   - Metric counters and high-availability SLA details
   - Phased implementation process
   - Case study highlights & customer quotes
7. **Our Team (`/team`)** [Frame `15_Our_Team` / `3:48712`]
   - 8-member senior leadership & solutions architect grid
   - Social links, email triggers, and specialty tags
   - "Join Our Engineering Pod" hiring callout
8. **The TechFirm Blog (`/blog`)** [Frame `17_Our_Blog` / `3:49254`]
   - Dynamic fetch against backend `/api/posts`
   - Category filter pills and live search bar
   - Article cards with author badges and reading time

### Tier 3 (Deep Content & Detail Views)
9. **Our Portfolio (`/portfolio`)** [Frame `13_Our_Portfolio` / `3:47454`]
   - Categorized case studies (Banks & Insurance, Cloud Migration, IoT)
   - Key business metric badges
10. **Service Details (`/services/[slug]`)** [Frame `12_Service_Details` / `3:47001`]
    - SSG pre-rendered detail view for all services
    - Problem overview, features checklist, workflow, and FAQ
    - Downloadable technical brochure widget and emergency phone card
11. **Blog Details (`/blog/[slug]`)** [Frame `18_Blog_Details` / `3:49736`]
    - Formatted article body with pull quotes, code blocks, and takeaways
    - Author biography card, tags, and category metadata
12. **Team Details (`/team/[slug]`)** [Frame `16_Team_Details` / `3:48971`]
    - Senior architect profile with competencies & animated skill bars
    - Direct contact and consultation booking triggers
13. **Portfolio Details (`/portfolio/[slug]`)** [Frame `14_Portfolio_Details` / `3:48458`]
    - Detailed case study narrative (Challenge, Solution, Quantitative Outcomes)
    - Project metadata bar (Client, Industry, Timeline, Status)

---

## 4. Admin Dashboard (`apps/dashboard`)
1. **Login (`/login`)**: Secure admin authentication against `/auth/login` with default seeded credentials (`admin@techfirm.com` / `Admin123!`).
2. **Overview (`/overview`)**: Live counts for Plans, Posts, Unread Messages, and Registered Users with quick management shortcuts.
3. **Plans Management (`/plans`)**: Table of all active and inactive plans with order, pricing, features editor modal, and delete actions.
4. **Posts Management (`/posts`)**: Blog content management with markdown/text editor, category selector, cover image preview, and publish toggles.
5. **Contact Messages (`/messages`)**: Inbox for reviewing incoming inquiries, toggling read/unread status, and reading messages in a modal.
6. **Users Management (`/users`)**: User list with RBAC promote/demote actions between `User` and `Admin`.

---

## 5. Verification
- `npm run typecheck`: **PASSED (0 errors across 6 packages)**
- `npm run lint`: **PASSED (0 errors across 3 apps)**
- `npm run build`: **PASSED (All static and server routes built successfully)**
