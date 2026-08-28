# TechFirm Feature Plan: Backend + Admin Dashboard Vertical Slices

This document serves as the master blueprint and source of truth for transitioning the TechFirm platform from static placeholder data to a full-stack, data-driven architecture across `apps/api`, `apps/dashboard`, and `apps/web`.

---

## Architecture & Universal Principles

1. **No Image Uploads**: Every image across the platform (logos, photos, thumbnails, avatars, covers) is stored and rendered as a plain `string` URL. Forms use text inputs for image URLs.
2. **Shared Packages**:
   - `packages/types` (`@repo/types`): TypeScript interfaces and response envelopes.
   - `packages/validators` (`@repo/validators`): Zod schemas for input validation.
   - `packages/ui` (`@repo/ui`): Shared presentational components with Tailwind CSS tokens.
3. **Backend API Standards (`apps/api`)**:
   - NestJS modules (Controller, Service, Schema, DTOs with `nestjs-zod`).
   - Standard response wrapping via `TransformInterceptor` (`ApiResponse<T>`).
   - Error normalization via `ApiExceptionFilter` (`ApiErrorResponse`).
   - Public `GET` endpoints (and contact `POST`) are unauthenticated.
   - Admin mutations (`POST`, `PATCH`, `DELETE`) are guarded by `JwtAuthGuard` + `RolesGuard('admin')`.
4. **Admin Dashboard Standards (`apps/dashboard`)**:
   - Built entirely on shadcn/ui components on top of the `sidebar-04` layout.
   - Compact CRUDs use slide-over `Sheet` components; rich editorial CRUDs (Posts, Portfolio) use dedicated full-page routes.
   - Live query management and cache invalidation via TanStack Query.
   - Responsive sidebar with live unread badge counters.
5. **Public Web Standards (`apps/web`)**:
   - Client-side data fetching via TanStack Query hooks with shadcn `Skeleton` placeholders and accessible error handling.
   - High-fidelity visual parity with zero layout shifts upon switching from static data to API data.

---

## Part C — Feature Breakdown (in Execution Order)

### 1. Site Configuration (Singleton)

- **Type**: Singleton (1 document)
- **Frontend Sources**:
  - `packages/ui/src/components/top-utility-bar.tsx`
  - `apps/web/src/components/layouts/footer/Footer.tsx`
  - `packages/ui/src/components/footer.tsx`
  - `apps/web/src/app/layout.tsx`
- **Field Inventory**:
  - `siteName` (`string`, required): Name of the brand (default: `"TechFirm"`).
  - `siteLogo` (`string`, required): URL to brand logo.
  - `tagline` (`string`, optional): Short slogan or subheading.
  - `contactEmail` (`string`, required): Email for support/inquiries (`contact@techfirm.com`).
  - `contactPhone` (`string`, required): Phone number (`+1 (555) 234-5678`).
  - `workingHours` (`string`, optional): Business hours string (`Mon - Fri: 9:00 AM - 6:00 PM`).
  - `address` (`string`, optional): Physical office address.
  - `socialLinks` (`object`, required):
    - `facebook` (`string`, optional)
    - `twitter` (`string`, optional)
    - `linkedin` (`string`, optional)
    - `instagram` (`string`, optional)
    - `github` (`string`, optional)
  - `topBar` (`object`, optional):
    - `announcement` (`string`, optional)
    - `isVisible` (`boolean`, default: `true`)
  - `ctaBand` (`object`, required):
    - `title` (`string`, required: `"Ready to Launch with Techfirm?"`)
    - `subtitle` (`string`, required)
    - `buttonText` (`string`, required: `"7-Day Free Trial"`)
    - `buttonHref` (`string`, required: `"#pricing"`)
    - `badges` (`string[]`, required: `["Lightning Speed", "Ironclad Security", "Scalable Hosting"]`)
  - `footer` (`object`, required):
    - `copyrightText` (`string`, required: `"Copyright @2026 BizanTheme All Rights Reserved"`)
    - `collaborateLinks` (`Array<{ label: string, href: string }>`, required)
    - `myAccountLinks` (`Array<{ label: string, href: string }>`, required)
    - `serviceLinks` (`Array<{ label: string, href: string }>`, required)
    - `bottomLinks` (`Array<{ label: string, href: string }>`, required)
- **API Endpoints**:
  - `GET /api/v1/site-config` (Public)
  - `PATCH /api/v1/site-config` (Admin guarded)
- **Admin UI**:
  - Route: `/site-config`
  - Tabbed settings interface:
    1. General & Contact Info
    2. Social Media Links
    3. Launch CTA Band Copy
    4. Footer Navigation Columns
- **Resolved Decisions**: Single settings document auto-upserted on seed; tabbed form updating via `PATCH`.

---

### 2. Testimonials (Collection)

- **Type**: Collection (Many documents)
- **Frontend Sources**:
  - `apps/web/src/data/techfirm-data.ts` (`testimonialsData`)
  - `apps/web/src/components/home/reviews-section.tsx`
  - `apps/web/src/app/about/page.tsx`
- **Field Inventory**:
  - `quote` (`string`, required): Testimonial text.
  - `authorName` (`string`, required): Full name of the reviewer.
  - `authorRole` (`string`, required): Job title / role.
  - `company` (`string`, optional): Client company name.
  - `avatar` (`string`, required): Plain URL to avatar photo.
  - `rating` (`number`, required, 1-5, default: 5): Star rating.
  - `tags` (`string[]`, default: `[]`): Badges e.g. `["Techfirm Horizons", "Best Quality"]`.
  - `hasVideo` (`boolean`, default: `false`): Whether a video review is available.
  - `videoUrl` (`string`, optional): Video link.
  - `posterImage` (`string`, optional): Plain URL for video thumbnail.
  - `iconBg` (`string`, optional): Gradient badge class or token.
  - `order` (`number`, default: `0`): Display order.
  - `isActive` (`boolean`, default: `true`): Visibility toggle.
- **API Endpoints**:
  - `GET /api/v1/testimonials` (Public, supports query params `isActive`, `limit`)
  - `POST /api/v1/testimonials` (Admin guarded)
  - `PATCH /api/v1/testimonials/:id` (Admin guarded)
  - `DELETE /api/v1/testimonials/:id` (Admin guarded)
- **Admin UI**:
  - Route: `/testimonials`
  - Table list view with avatar preview, rating stars, active status switch, and actions.
  - Create / Edit in a shadcn `Sheet` slide-over with validation.
  - Delete with `AlertDialog` confirmation.

---

### 3. FAQs (Collection)

- **Type**: Collection (Many documents)
- **Frontend Sources**:
  - `apps/web/src/data/techfirm-data.ts` (`faqsData`)
  - `apps/web/src/components/home/faq-section.tsx`
  - `apps/web/src/app/faqs/page.tsx`
- **Field Inventory**:
  - `question` (`string`, required): FAQ question.
  - `answer` (`string`, required): Detailed answer text.
  - `category` (`string`, required): Category tag (e.g. `"General"`, `"Services"`, `"Support"`, `"Pricing"`, `"Security"`).
  - `order` (`number`, default: `0`): Sorting order.
  - `isActive` (`boolean`, default: `true`): Active toggle.
- **API Endpoints**:
  - `GET /api/v1/faqs` (Public, filterable by `category`, `isActive`)
  - `POST /api/v1/faqs` (Admin guarded)
  - `PATCH /api/v1/faqs/:id` (Admin guarded)
  - `DELETE /api/v1/faqs/:id` (Admin guarded)
- **Admin UI**:
  - Route: `/faqs`
  - Table with category badges, order controls, and status toggle.
  - Create / Edit in a shadcn `Sheet`.

---

### 4. Team Members (Collection)

- **Type**: Collection (Many documents)
- **Frontend Sources**:
  - `apps/web/src/data/techfirm-data.ts` (`teamMembersData`)
  - `apps/web/src/components/team/team-data.ts` (`teamMembersData`)
  - `apps/web/src/app/team/page.tsx`
  - `apps/web/src/app/team/[slug]/page.tsx`
- **Field Inventory**:
  - `name` (`string`, required): Full name.
  - `role` (`string`, required): Position / title.
  - `slug` (`string`, required, unique): URL slug auto-generated from name via `@sindresorhus/slugify`.
  - `badgeRole` (`string`, optional): Uppercase role tag.
  - `photo` (`string`, required): URL to photo.
  - `bio` (`string`, required): Biography text.
  - `email` (`string`, required): Direct contact email.
  - `phone` (`string`, optional): Contact phone.
  - `experienceYears` (`string`, optional): E.g. `"5 Years"`.
  - `competencies` (`string[]`, default: `[]`): List of core competencies.
  - `skills` (`Array<{ name: string, percentage: number }>`, default: `[]`): Skill progress bars.
  - `experienceDescription` (`string[]`, default: `[]`): Detailed career background paragraphs.
  - `socials` (`object`, optional):
    - `facebook` (`string`, optional)
    - `twitter` (`string`, optional)
    - `linkedin` (`string`, optional)
    - `instagram` (`string`, optional)
    - `globe` (`string`, optional)
  - `signatureName` (`string`, optional): Display signature.
  - `order` (`number`, default: `0`): Display order.
  - `isActive` (`boolean`, default: `true`): Active status.
- **API Endpoints**:
  - `GET /api/v1/team-members` (Public list)
  - `GET /api/v1/team-members/:slug` (Public detail by slug)
  - `POST /api/v1/team-members` (Admin guarded)
  - `PATCH /api/v1/team-members/:id` (Admin guarded)
  - `DELETE /api/v1/team-members/:id` (Admin guarded)
- **Admin UI**:
  - Route: `/team`
  - Table with photo avatar, role badge, email, and order.
  - Create / Edit in a comprehensive shadcn `Sheet` with skill tag and percentage builders.

---

### 5. Plans / Pricing (Collection)

- **Type**: Collection (Many documents)
- **Frontend Sources**:
  - `apps/web/src/components/home/pricing-section.tsx`
  - `apps/web/src/app/pricing/page.tsx`
- **Field Inventory**:
  - `name` (`string`, required): Plan title (`"Free"`, `"Advanced"`, `"Enterprise"`).
  - `price` (`number`, required): Numeric monthly base price.
  - `billingPeriod` (`"monthly" | "annual"`, required): Billing cadence.
  - `features` (`string[]`, required): Array of included feature strings.
  - `isPopular` (`boolean`, default: `false`): Highlight / featured flag.
  - `isActive` (`boolean`, default: `true`): Active status flag.
  - `order` (`number`, default: `0`): Sequence order.
  - `description` (`string`, optional): Plan description text.
  - `buttonText` (`string`, default: `"Get Started"`): CTA button label.
  - `buttonHref` (`string`, default: `"#pricing"`): CTA destination link.
  - `bgColor` (`string`, optional): Card styling background token.
  - `borderColor` (`string`, optional): Card border color token.
- **API Endpoints**:
  - `GET /api/v1/plans` (Public, filterable by `billingPeriod`, `isActive`)
  - `POST /api/v1/plans` (Admin guarded)
  - `PATCH /api/v1/plans/:id` (Admin guarded)
  - `DELETE /api/v1/plans/:id` (Admin guarded)
- **Admin UI**:
  - Route: `/plans`
  - Table view with price, billing period, features count, popular badge, and active toggle.
  - Create / Edit in a shadcn `Sheet`.

---

### 6. Posts / Blog (Collection)

- **Type**: Collection (Many documents)
- **Frontend Sources**:
  - `apps/web/src/components/blog/blog-data.ts`
  - `apps/web/src/app/blog/page.tsx`
  - `apps/web/src/app/blog/[slug]/page.tsx`
- **Field Inventory**:
  - `title` (`string`, required): Post headline.
  - `slug` (`string`, required, unique): Auto-generated slug.
  - `excerpt` (`string`, required): Short summary.
  - `body` (`string`, required): Full markdown or HTML article content.
  - `coverImage` (`string`, required): Plain URL string.
  - `category` (`string`, required): Category tag.
  - `author` (`object`, required):
    - `name` (`string`, required)
    - `avatar` (`string`, optional)
    - `role` (`string`, optional)
  - `publishedAt` (`Date`, default: `Date.now`): Publication timestamp.
  - `isPublished` (`boolean`, default: `true`): Published toggle.
  - `readTime` (`string`, default: `"5 min read"`): Read time estimate.
  - `tags` (`string[]`, default: `[]`): Topic tags.
  - `commentsCount` (`number`, default: `0`): Number of comments.
- **API Endpoints**:
  - `GET /api/v1/posts` (Public list with pagination, category filter, search)
  - `GET /api/v1/posts/:slug` (Public detail)
  - `POST /api/v1/posts` (Admin guarded)
  - `PATCH /api/v1/posts/:id` (Admin guarded)
  - `DELETE /api/v1/posts/:id` (Admin guarded)
- **Admin UI**:
  - List route: `/posts` (Table with cover thumbnail, author, status, date, pagination).
  - Create route: `/posts/new` (Dedicated full-page editor).
  - Edit route: `/posts/[id]/edit` (Dedicated full-page editor).

---

### 7. Portfolio / Case Studies (Collection)

- **Type**: Collection (Many documents)
- **Frontend Sources**:
  - `apps/web/src/components/portfolio/portfolio-data.ts`
  - `apps/web/src/app/portfolio/page.tsx`
  - `apps/web/src/app/portfolio/[slug]/page.tsx`
- **Field Inventory**:
  - `title` (`string`, required): Project title.
  - `slug` (`string`, required, unique): Auto-generated slug.
  - `subtitle` (`string`, optional): Project tagline.
  - `category` (`string`, required): Category (e.g. `"Technology"`, `"Cloud Migration"`).
  - `industry` (`string`, optional): Industry (e.g. `"Banks & Insurance"`, `"Retail & FinTech"`).
  - `client` (`string`, optional): Client organization name.
  - `overview` (`string`, optional): Summary overview.
  - `image` (`string`, required): URL to hero/featured image.
  - `bgImage` (`string`, optional): URL to background image texture.
  - `isDark` (`boolean`, default: `false`): Card contrast styling flag.
  - `actionText` (`string`, default: `"Lounge Project"`): Link label.
  - `challengeText` (`string[]`, default: `[]`): Problem description paragraphs.
  - `solutionText` (`string[]`, default: `[]`): Solution implementation paragraphs.
  - `results` (`Array<{ title: string, description: string }>`, default: `[]`): Result bullet points.
  - `metrics` (`Array<{ label: string, value: string }>`, default: `[]`): Key stats (e.g. `38% Cost Savings`).
  - `order` (`number`, default: `0`): Display order.
  - `isActive` (`boolean`, default: `true`): Active status flag.
- **API Endpoints**:
  - `GET /api/v1/portfolio` (Public list, filterable by `category`, `isActive`)
  - `GET /api/v1/portfolio/:slug` (Public detail)
  - `POST /api/v1/portfolio` (Admin guarded)
  - `PATCH /api/v1/portfolio/:id` (Admin guarded)
  - `DELETE /api/v1/portfolio/:id` (Admin guarded)
- **Admin UI**:
  - List route: `/portfolio` (Table with image preview, client, category, actions).
  - Create route: `/portfolio/new` (Dedicated full-page editor).
  - Edit route: `/portfolio/[id]/edit` (Dedicated full-page editor).

---

### 8. Contact Messages (Collection, Inbound Only)

- **Type**: Collection (Inbound customer messages)
- **Frontend Sources**:
  - `apps/web/src/app/contact/page.tsx`
  - `apps/web/src/components/contact/*`
- **Field Inventory**:
  - `name` (`string`, required): Sender name.
  - `email` (`string`, required): Sender email.
  - `subject` (`string`, optional): Message subject.
  - `message` (`string`, required): Message text.
  - `isRead` (`boolean`, default: `false`): Read/unread status flag.
  - `createdAt` (`Date`, default: `Date.now`): Timestamp.
- **API Endpoints**:
  - `POST /api/v1/contact-messages` (Public inbound submission)
  - `GET /api/v1/contact-messages` (Admin guarded list with pagination & `isRead` filter)
  - `GET /api/v1/contact-messages/unread-count` (Admin guarded badge count)
  - `PATCH /api/v1/contact-messages/:id/read` (Admin guarded toggle read)
  - `DELETE /api/v1/contact-messages/:id` (Admin guarded)
- **Admin UI**:
  - Route: `/messages`
  - Unread count badge in the sidebar navigation.
  - Filter tabs (All / Unread / Read), view details in a read sheet, toggle read status, delete confirmation.

---

### 9. Users (Collection)

- **Type**: Collection (Admin users & registered accounts)
- **Frontend Sources**:
  - Admin Dashboard `/users` route.
- **Field Inventory**:
  - `name` (`string`, required): User display name.
  - `email` (`string`, required, unique): User email.
  - `role` (`"admin" | "user"`, default: `"user"`): Role enum.
  - `createdAt` (`Date`): Account creation date.
- **API Endpoints**:
  - `GET /api/v1/users` (Admin guarded list with pagination & search)
  - `PATCH /api/v1/users/:id/role` (Admin guarded promote / demote)
  - `DELETE /api/v1/users/:id` (Admin guarded delete account)
- **Admin UI**:
  - Route: `/users`
  - Table view with user avatar, name, email, role badge, promote/demote action dropdown.
