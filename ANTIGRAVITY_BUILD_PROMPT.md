# Build Task: TechFirm — Full Figma Frontend + Functional Admin Dashboard

## ⚠️ Read this first — how to operate on this task

You are running **unattended overnight**. I will not be available to answer
questions or confirm decisions. This changes how you should work compared to
a normal session:

- **Never stop and wait for confirmation.** Every place earlier setup docs in
  this repo said "confirm with me before proceeding" no longer applies here —
  make the call yourself, using the defaults and priorities in this document,
  and keep going.
- **Log every non-trivial decision** to `BUILD_LOG.md` at the repo root as you
  go (create it if missing): what you decided, why, and what the alternative
  would have been. I will read this first thing in the morning.
- **If something is genuinely blocking** (missing credentials, a tool that
  won't connect, a contradiction in this spec you can't resolve reasonably),
  do NOT stop the whole task. Write it to `BLOCKERS.md` at the repo root,
  make a reasonable assumption, note the assumption, and continue building
  everything else around it.
- **Work in checkpoints.** Commit (or at least save working state) after each
  major page/module is functional, not just at the very end — if something
  later in the list fails, I want everything before it intact and usable.
- **Prioritize working over polished.** A page that renders correctly with
  slightly simplified visuals beats a pixel-perfect page that's broken. If
  you're running low on the session and have to cut something, cut from the
  bottom of the page priority list (see Part C), not from auth/admin
  functionality.
- Maintain a `PROGRESS.md` checklist (page/module → status: not started /
  in progress / done / done-with-caveats) and keep it updated live, not just
  at the end.

---

## Context — what already exists

This is the TechFirm monorepo (Turborepo). By the time you run this task,
the earlier setup phase should already be done:
- `apps/api` — NestJS + Mongoose/MongoDB, with `auth` and `users` modules,
  JWT access+refresh via httpOnly cookies, `RolesGuard` + `@Roles()`, global
  response interceptor/exception filter, Swagger at `/api/docs`.
- `apps/web` — Next.js 16, Tailwind CSS 4, Shadcn/UI, shared packages wired.
- `apps/dashboard` — Next.js 16 admin app skeleton, port 3001.
- Shared packages: `@repo/tsconfig`, `@repo/eslint-config`, `@repo/types`,
  `@repo/validators`, `@repo/ui`.

**Before doing anything else**, inspect the actual repo state (`apps/api`,
`apps/web`, `apps/dashboard`, `packages/*`) rather than assuming the above is
fully in place — if any piece is missing or partial, finish it first using
the same conventions (module pattern, response contract, RBAC) before moving
to the design work below. Don't rebuild what already works.

---

## Figma MCP usage

Use the connected Figma MCP server to pull real node data (frames,
auto-layout, spacing, color styles, text styles, component instances) for
every page/section listed in Part C, rather than working from visual
impression alone. Prefer exact values (hex, px, font weights) from Figma's
data over estimating them from the JPEG exports. Where Figma nodes and the
design tokens listed in Part B disagree, **Figma nodes win** — Part B is a
fallback for anything not cleanly readable from Figma (e.g. if a node isn't
named/exported clearly).

If the Figma MCP tool is not connected/available when you start, don't block
on it — fall back to the JPEG-derived spec in Part B and C below, note this
in `BLOCKERS.md`, and proceed.

### Frame name → page mapping

Use this table to resolve each page to its exact Figma frame/page name before
building it — don't guess by visual similarity or free-text search alone.
These names come directly from the exported file names, so the Figma file's
top-level frames should match (or closely match) them. If a frame name in
Figma doesn't match what's listed here, search for the closest match by
number prefix first (the numbering reflects the file's own page order), then
by content, and log the actual name you used in `BUILD_LOG.md` so it's
traceable.

| Tier | Page (this doc) | Figma frame name to look up |
|---|---|---|
| 1 | Homepage | `02` |
| 1 | Our Services | `11_Our_Services` |
| 1 | Our Pricing Plan | `19_Our_Pricing_Plan` |
| 1 | Our FAQs | `20_Our_FAQs` |
| 1 | Contact Us | `21_Contact_Us` |
| 2 | About Us | `10_About_Us` |
| 2 | Our Team | `15_Our_Team` |
| 2 | The Techfirm Blog | `17_Our_Blog` |
| 3 | Our Portfolio | `13_Our_Portfolio` |
| 3 | Service Details | `12_Service_Details` |
| 3 | Blog Details | `18_Blog_Details` |
| 3 | Team Details | `16_Team_Details` |
| 3 | Portfolio Details | `14_Portfolio_Details` *(not exported as JPEG — if this frame exists in Figma under this or a similar name, use it as the source of truth instead of the Tier 3 fallback description in Part C)* |

Work through frames in the order given by each page's **Tier**, not by the
numeric prefix — the numbering reflects Figma's internal page order, not
build priority. When you open a frame via MCP, also check for and read any
nested/linked component frames (e.g. a shared "Pricing Card" component used
across `02` and `19_Our_Pricing_Plan`) so shared components (Part B) are
built from the actual component definition rather than reconstructed
per-instance from each page separately.

---

## Part A — Repository rules to follow throughout

These apply to every file you write, on top of anything already established
in `.agent/instructions.md` / `.cursor/rules` / `.github/copilot-instructions.md`
— read those files first and follow them; this section adds frontend-build-
specific rules on top.

1. **Component structure**: page (route) → feature component → UI primitive.
   Every visual pattern that repeats across ≥2 pages (badges, section
   headings, stat cards, process steps, pricing cards, testimonial cards,
   the dark CTA band, footer, navbar) must be a single reusable component in
   `packages/ui` (or `apps/web/components/ui` if `packages/ui` isn't wired
   for app consumption — check first), never copy-pasted per page.
2. **No inline hex colors or magic pixel values** in components — define
   design tokens (Tailwind theme extension or CSS variables) once, from
   Part B, and reference them everywhere.
3. **TypeScript strict**, no `any` unless truly unavoidable (and commented
   why). Reuse `@repo/types` for anything that crosses the API boundary.
4. **Data over hardcoding where it's cheap to do properly**: pricing plans,
   FAQ items, team members, blog posts, and testimonials should be fetched
   from the NestJS API (see Part D for which of these get real backend
   models) — not hardcoded arrays in the component file — for every page you
   fully build. For pages you only stub (see Part C priority tiers), static
   placeholder content is fine.
5. **Responsive at 375px / 768px / 1280px+** for every page you build, not
   just the homepage. Navbar collapses to a hamburger below `lg`. Grids
   reflow (3-col → 2-col → 1-col as appropriate per section).
6. **Loading and empty states** on every data-fetching component — skeleton
   or spinner while loading, a real empty state (not a blank div) if a list
   is empty.
7. **Accessibility basics**: semantic HTML, alt text on images, visible
   focus states, form labels — don't skip this to save time.
8. **Commit style**: Conventional Commits, matching the existing Husky/
   commitlint config. Commit per logical unit (one page, one shared
   component set, one API module), not one giant commit at the end.

---

## Part B — Design system (extracted from the Figma exports)

Use this as the baseline token set; correct against live Figma MCP data
where they differ.

### Color palette
| Token | Approx value | Usage |
|---|---|---|
| `bg-surface` | `#FFFFFF` | Page background, cards |
| `bg-muted` | `#F5F6FA` | Alternating section backgrounds |
| `bg-dark` | `#12121C` (near-black navy) | Navbar-adjacent dark sections, CTA band, footer top rule areas, dark hero cards, dark pricing "most popular" card |
| `text-heading` | `#141432` (deep navy, near-black) | All headings |
| `text-body` | `#6B7280` (mid gray) | Body copy |
| `accent-teal` | `#2DD4BF` / `#14B8A6` | Primary buttons, icons, checkmarks, badges, links, progress bars, "most popular" card border |
| `accent-indigo` | `#3B1F92`–`#1E1B4B` (deep indigo/navy-purple) | Secondary buttons ("Sign Up", some "Get Started" CTAs), dark accent badges |
| `pastel-peach` | `#FDECE3` | Feature/stat card background variant |
| `pastel-blue` | `#E7F0FD` | Feature/stat card background variant |
| `pastel-lavender` | `#EFEAFB` | Feature/stat card background variant |
| `pastel-mint` | `#E5FBF6` | Feature/stat card background variant |
| `gradient-hero` | linear-gradient red → purple → blue, diagonal | Service Details page hero banner, one blog card |
| `star-gold` | `#F5A623` | Rating stars |

Dark mode is not required for this build unless it's trivial via existing
Shadcn theming — don't spend time on it if not.

### Typography
- Headings: bold, geometric sans-serif (Figma will specify the exact family
  — likely Space Grotesk, Sora, or similar; check Figma text styles). Large
  scale: H1 ~48–56px on desktop hero sections, H2 ~36–40px section titles,
  scaling down proportionally on mobile (min ~28px for H1, ~24px for H2).
- Eyebrow labels: small, uppercase or mixed-case pill badges above section
  headings (mint/teal background, dark or teal text, small lightning-bolt
  icon prefix — e.g. "⚡ OUR SERVICES", "⚡ Our Case Studies").
- Body: regular weight, gray, comfortable line-height (~1.6).

### Recurring structural patterns (build each as ONE shared component)
- **TopUtilityBar** — thin light-gray strip above the navbar: support phone,
  email, location, social icons right-aligned, language switcher. Present
  on every page. Can be static content (from a site-config constant), not
  DB-backed.
- **Navbar** — logo left, nav links with dropdown carets (Home, Pages,
  Services, Projects, News, Contact), search icon, cart icon, pill-shaped
  "Get Started Now" button with check icon, right-aligned. Sticky. Collapses
  to hamburger on mobile/tablet.
- **SectionHeading** — eyebrow badge (centered or left, varies by section) +
  large heading + optional short subtitle.
- **StatCounter** — large number + label, in a bordered card; one variant
  highlighted with `bg-dark` + white text (used for the "hero" stat among a
  row of 3–4).
- **IconFeatureCard** — icon (teal, simple line/duotone icons) + title +
  2-line description, used in 2×3 and 3×1 grids across Home/Services pages.
- **ProcessStep** — numbered circular badge (teal, "01"/"02"/"03") + card
  with icon, title, description; used identically on Home, Services, and
  Service Details pages — build once, reuse three times.
- **PricingCard** — plan name, price, billing period, feature checklist
  (checked/unchecked states), CTA button; "most popular"/highlighted variant
  uses `bg-dark` card with teal border and elevated shadow. Monthly/Annual
  toggle switch above the card row.
- **TestimonialCard** — quote mark icon, quote text, avatar, name, role.
  Also a variant with an embedded "Watch Video" play button over a photo.
- **FaqAccordionItem** — question row with +/− icon, expands to answer text;
  one open by default per Figma.
- **CaseStudyCard** — multiple visual variants (light pastel background with
  isometric illustration; full dark background with phone mockups; 2-up
  split layout) — build a single flexible `CaseStudyCard` component with a
  `variant` prop (`light` | `dark` | `phones`) rather than 3 separate
  components.
- **TeamMemberCard** — grayscale photo, role eyebrow, name, hover state
  optional.
- **BlogPostCard** — image, "Posted by" avatar chip with external-link icon,
  category tag, date + comment count, title, excerpt.
- **DarkCtaBand** — "Ready to Launch with Techfirm?" — appears near the
  bottom of literally every page. 3-column (Write Us / Fill Out Form / Call
  Us) each with icon, label, detail line, and a centered teal "Leave A
  Request" button overlapping the band edge. Build this once, use
  everywhere — do not rebuild per page.
- **Footer** — 4 columns (Collaborate, My Account, Service, Newsletter
  signup with TechFirm logo) + bottom bar (copyright, Faqs/Setting/Privacy/
  Contact links, scroll-to-top button).

---

## Part C — Pages to build, in priority order

Build in this order. Everything above the line marked **STOP HERE IF
RUNNING LOW ON TIME** must be fully functional and responsive before you
touch anything below it. If Figma MCP gives you extra pages/frames not
listed here, ignore them — this list is the scope.

### Tier 1 — Core (must be fully done, real data where noted)
1. **Homepage** — hero (headline, rating badge, CTA, server illustration,
   mini donut-chart card), domain-search bar module (UI only, no real
   lookup), "Cloud Server Control Panel" 2-up feature block, icon feature
   row (4 items), pricing-plan carousel/selector ("Pick your perfect web
   hosting plan"), testimonial strip + client logos, services icon-card row
   + stats, pricing section, FAQ accordion, dark CTA band, footer.
2. **Our Services** — hero image banner, "Everything You Get" 2×3 icon
   grid, "Work Process" 3-step section, dark CTA band, footer.
3. **Our Pricing Plan** — full pricing card set (Free/Advanced/Enterprise,
   monthly/annual toggle) **backed by the real `plans` API module** (see
   Part D) so admin-edited plans actually reflect here, client logo trust
   strip, testimonials grid, FAQ teaser, dark CTA band, footer.
4. **Our FAQs** — full accordion list, dark CTA band, footer.
5. **Contact Us** — contact info column + form (client-side validated,
   submits to a real `contact` API endpoint that stores messages — see Part
   D), embedded map (use a static map image or a simple embed; don't spend
   time on a real maps API integration), footer.

### Tier 2 — Important, build fully if time allows
6. **About Us** — hero with image + badge, stat counters, "Working Process"
   3-step, case-study/portfolio preview cards, testimonials, video banner
   (poster image + play button is enough, no real video needed), pricing
   preview, blog preview, dark CTA band, footer.
7. **Our Team** — team grid (8 members), dark CTA band, footer. Team data
   can be static (not worth a DB model unless trivial).
8. **The Techfirm Blog** — blog post grid (9 posts) **backed by a real
   `posts` API module** (Part D) so admin-created posts appear here.

### Tier 3 — Build if Tier 1 and 2 are solid and done well; otherwise stub
9. **Our Portfolio** — case study card grid, all 3 `CaseStudyCard` variants
   represented.
10. **Service Details** — gradient hero, 2-up content blocks with stats,
    checklist rows, work process (reuse `ProcessStep`), testimonial,
    dark CTA band.
11. **Blog Details** — single post view: hero image, tags, article body,
    pull-quote block, numbered how-to list, prev/next post nav, comments
    list + comment form (comment form can post to the real API if `posts`
    module supports comments; otherwise UI-only with a "coming soon" toast).
12. **Team Details** — single member profile: photo, About Me, info list,
    skill progress bars, volunteer experience text block.
13. **Portfolio Details** *(image not supplied but implied by nav)* — if you
    reach this tier, model it after Blog Details' structure (hero, content,
    results) rather than guessing further; keep it simple.

**STOP HERE IF RUNNING LOW ON TIME.** If you don't reach Tier 3, that's
fine — leave those routes either absent or as a simple "Coming soon" page
using the shared `SectionHeading` + `DarkCtaBand` + `Footer`, not a broken
link. Note in `PROGRESS.md` exactly which tier you completed.

For any page you don't fully build, do NOT remove its nav link — route it
to a lightweight placeholder so the site never 404s from its own nav menu.

---

## Part D — What gets real backend data (NestJS + Mongoose)

Only build these as real DB-backed modules — everything else in Part C can
use static/seeded content in the frontend to save time, since the
assessment/demo value is in proving the full stack works end-to-end, not in
making every single page dynamic.

| Module | Schema fields (minimum) | Used by |
|---|---|---|
| `plans` | `name, price, billingPeriod(monthly/annual), features[], isPopular, isActive, order` | Pricing page (public GET), Admin CRUD |
| `posts` | `title, slug, excerpt, body, coverImage, category, author, publishedAt, isPublished` | Blog list/detail (public GET), Admin CRUD |
| `contact-messages` | `name, email, message, createdAt, isRead` | Contact form (public POST), Admin list/mark-read view |
| `users` (already exists from setup phase) | — | Admin user management screen |

All public GET endpoints for these must work without auth. All
create/update/delete endpoints must be admin-only via the existing
`RolesGuard`. Seed at least 3 plans, 6 posts, and a couple of sample contact
messages so the admin dashboard and public pages both have real content to
show immediately, not empty states everywhere.

---

## Part E — Admin Dashboard (`apps/dashboard`)

### Base setup
Run `npx shadcn@latest add sidebar-04` inside `apps/dashboard` as the
starting shell (collapsible sidebar + header layout), then adapt its colors/
typography to the TechFirm design tokens from Part B (`bg-dark` sidebar or
light — your call, but keep the teal accent as the active-state/primary
color throughout so it visibly matches the brand, not a generic shadcn
theme). Keep the copy/branding TechFirm-specific (logo, name) rather than
leaving shadcn placeholder text anywhere.

### Required screens (all must be genuinely functional, not mockups)
1. **Login** — admin-role login using the existing `/auth/login` endpoint;
   redirect non-admins with a clear message; redirect unauthenticated users
   away from every other dashboard route via middleware.
2. **Overview/Dashboard home** — real stat cards pulled from the API: total
   plans, published posts, unread contact messages, total users (counts
   are enough, no need for charts unless a shadcn chart component is
   trivial to wire to real numbers — if so, do it, e.g. a simple
   messages-per-day or posts-published-over-time chart).
3. **Plans management** — table (sidebar-04's data table pattern or a
   simple shadcn `Table`) listing all plans, with create/edit (dialog or
   dedicated route) and delete (with confirm), toggling `isActive` and
   `isPopular` inline where reasonable. Changes must be reflected on the
   public Pricing page (no caching that would hide them).
4. **Posts management** — table of posts with create/edit/delete, a publish/
   unpublish toggle, and a basic rich-enough editor for `body` (a plain
   `textarea` is acceptable — do not lose time building a rich text editor).
5. **Contact messages** — read-only list/table of submitted messages, with a
   mark-as-read action and unread-count badge in the sidebar nav.
6. **Users** — list of registered users with their role; ability to
   promote/demote role (admin/user) via the existing RBAC endpoints, if
   such an endpoint exists or is trivial to add — otherwise read-only list
   is acceptable and note it in `BUILD_LOG.md`.

### Non-negotiables
- Every admin route protected server-side (middleware/session check), not
  just hidden client-side.
- Every mutating action calls the real NestJS API — no local-state-only
  fake CRUD.
- Sidebar nav shows unread-message count and is visually on-brand (teal
  accent, TechFirm logo, consistent with the public site's type/color
  system so it reads as "the same product," just an internal density).
- Responsive down to tablet width at minimum (full mobile admin support is
  nice-to-have, not required — sidebar-04 usually collapses reasonably by
  default; verify it doesn't break, but don't over-invest here).

---

## Part F — Definition of done for this session

Before you consider the task complete (or before you run out of time),
`PROGRESS.md` should show:
- [ ] Tier 1 pages: fully built, responsive, real data where specified
- [ ] Tier 2 pages: attempted, ideally fully built
- [ ] Tier 3 pages: attempted or clearly stubbed, nothing 404s
- [ ] `plans`, `posts`, `contact-messages` modules live in `apps/api`,
      seeded, with public GET + admin CRUD working
- [ ] Admin dashboard: all 6 screens functional against the real API
- [ ] Public Pricing page reflects admin-edited plan data live
- [ ] Public Blog page reflects admin-published posts live
- [ ] Contact form submissions appear in the admin messages list
- [ ] `npm run build`, `npm run lint`, `npm run typecheck` all pass at the
      root before you stop
- [ ] `BUILD_LOG.md` and `BLOCKERS.md` are up to date
- [ ] Root `README.md` updated with: what was built, what wasn't, how to
      run everything, and admin login credentials for the seeded admin user

Work through Part C and Part E in parallel where it makes sense (e.g. get
`plans`/`posts` API modules done early since both the public site and admin
depend on them), rather than strictly finishing all frontend before starting
admin work.