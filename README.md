# 🚀 TechFirm — Full-Stack Monorepo Assessment

A production-grade full-stack monorepo built for a technical assessment, featuring a **Public Web Application** (`apps/web`), a dedicated **Admin Management Dashboard** (`apps/dashboard`), and a scalable **NestJS + MongoDB REST API** (`apps/api`) orchestrated with **Turborepo**.

---

## 🌐 Live Deployments

> [!NOTE]
> The backend is hosted on Render's free tier. If the service is asleep, **please allow 30–50 seconds for the initial cold start** by opening the backend URL or loading the app.

| Component                  | Platform | Live URL                                                                                 |
| :------------------------- | :------- | :--------------------------------------------------------------------------------------- |
| **Public Website**         | Vercel   | [https://techfirm.vercel.app](https://techfirm.vercel.app)                               |
| **Admin Dashboard**        | Vercel   | [https://admin-techfirm.vercel.app](https://admin-techfirm.vercel.app)                   |
| **Backend REST API**       | Render   | [https://techfirm-api.onrender.com](https://techfirm-api.onrender.com)                   |
| **Interactive Swagger UI** | Render   | [https://techfirm-api.onrender.com/api/docs](https://techfirm-api.onrender.com/api/docs) |

### 🔐 Demo Credentials (Admin Console)

- **URL**: [https://admin-techfirm.vercel.app/login](https://admin-techfirm.vercel.app/login)
- **Email**: `admin@techfirm.com`
- **Password**: `Admin123!`

---

## 💻 Local Development Setup

Follow these steps to clone and run all 3 applications locally on your machine.

### Prerequisites

- **Node.js**: `v20.0.0` or higher ([Download](https://nodejs.org/))
- **npm**: `v9.0.0` or higher
- **MongoDB**: Local MongoDB instance (`mongodb://localhost:27017`) or free [MongoDB Atlas](https://www.mongodb.com/atlas) connection URI.

---

### Step 1: Clone the Repository

```bash
git clone https://github.com/shariarSultanFahim/TechFirm.git
cd TechFirm
```

---

### Step 2: Install Monorepo Dependencies

```bash
npm install
```

---

### Step 3: Configure Environment Variables

Create the `.env` files for each application based on their `.env.example` templates:

#### 1. Backend (`apps/api/.env`)

```bash
# In apps/api/.env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/fullstack_assessment_db
JWT_ACCESS_SECRET=your_super_secret_jwt_access_key_min_32_chars_123456
JWT_ACCESS_EXPIRES_IN=1d
JWT_REFRESH_SECRET=your_super_secret_jwt_refresh_key_min_32_chars_123456
JWT_REFRESH_EXPIRES_IN=7d
COOKIE_SAME_SITE=lax
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001,http://admin.localhost:3001
CORS_ORIGINS=http://localhost:3000,http://localhost:3001,http://admin.localhost:3001
ENABLE_API_DOCS=true
```

#### 2. Public Web (`apps/web/.env`)

```bash
# In apps/web/.env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

#### 3. Admin Dashboard (`apps/dashboard/.env`)

```bash
# In apps/dashboard/.env
NEXT_PUBLIC_SITE_URL=http://localhost:3001
NEXT_PUBLIC_APP_URL=http://localhost:3001
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_WEB_URL=http://localhost:3000
```

---

### Step 4: Seed the Database

Run the automated seeder script to populate your database with plans, team members, blog posts, testimonials, FAQs, and the default admin user:

```bash
npm run seed
```

---

### Step 5: Start All Applications

Run the Turbo development command from the repository root:

```bash
npm run dev
```

The services will start simultaneously:

- 🌐 **Public Website**: [http://localhost:3000](http://localhost:3000)
- 🖥️ **Admin Dashboard**: [http://localhost:3001](http://localhost:3001)
- ⚙️ **Backend API**: [http://localhost:5000/api/v1](http://localhost:5000/api/v1)
- 📖 **Swagger Documentation**: [http://localhost:5000/api/docs](http://localhost:5000/api/docs)

---

## 🏗️ Architecture & Monorepo Structure

```
fullstack-turborepo-starter-kit/
├── apps/
│   ├── web/                     # Public Next.js 16 Website (Port 3000)
│   │   ├── src/app/             # App Router pages (Home, Services, Portfolio, Blog, Contact, etc.)
│   │   ├── src/components/      # UI sections, video modals, search overlays, inquiry form
│   │   └── src/hooks/           # TanStack Query hooks consuming REST API
│   │
│   ├── dashboard/               # Next.js 16 Admin Dashboard (Port 3001)
│   │   ├── src/app/(protected)/ # Data tables & CRUD (Plans, Team, Posts, Portfolio, FAQs, Testimonials, Messages)
│   │   ├── src/components/      # AppSidebar with unread message badge, dynamic breadcrumbs, dialogs
│   │   └── src/hooks/           # TanStack Query & Mutation hooks (with optimistic updates & 30s background sync)
│   │
│   └── api/                     # NestJS 11 + MongoDB REST API (Port 5000)
│       ├── src/modules/         # Auth (RBAC), Users, Plans, Posts, Portfolio, FAQs, Testimonials, ContactMessages
│       ├── src/common/          # JWT Guards, Role Guards, Exception Filters, Transform Interceptors
│       └── src/scripts/seed.ts  # Database seeder with mock data and admin account
│
└── packages/
    ├── types/                   # @repo/types - Shared TypeScript interfaces & API contracts
    ├── validators/              # @repo/validators - Shared Zod validation schemas
    ├── ui/                      # @repo/ui - Shared UI component library (shadcn/ui + Tailwind v4)
    ├── tsconfig/                # @repo/tsconfig - Base TypeScript configurations
    └── eslint-config/           # @repo/eslint-config - ESLint shared rules
```

---

## ⚡ Tech Stack

- **Monorepo Engine**: [Turborepo](https://turbo.build/repo) + npm workspaces
- **Frontend Frameworks**: [Next.js 16](https://nextjs.org/) (App Router, Server & Client Components) + [React 19](https://react.dev/)
- **Styling & UI**: [Tailwind CSS v4](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/), Lucide Icons, Sonner Toasts
- **Data Fetching & State**: [TanStack Query v5](https://tanstack.com/query/latest), React Hook Form, Zod
- **Backend Framework**: [NestJS 11](https://nestjs.com/) (Modular Architecture, Dependency Injection)
- **Database & ODM**: [MongoDB Atlas](https://www.mongodb.com/atlas) with [Mongoose 8](https://mongoosejs.com/)
- **Authentication & Security**: `httpOnly` secure cookies, JWT (Access & Refresh tokens), RBAC guards, Helmet, CORS allowlisting
- **API Documentation**: OpenAPI 3.0 / [Swagger UI](https://swagger.io/tools/swagger-ui/)

---

## 🚀 Key Features Implemented

1. **Public Web Application (`apps/web`)**:
   - **Hero & Interactive Services**: Dynamic service catalog, tabbed solutions, interactive stat counters.
   - **Plans & Pricing**: Monthly/Annual pricing toggle with feature comparison matrix.
   - **Dynamic Portfolio & Case Studies**: Categorized showcase with custom slug detail pages.
   - **TechFirm Blog**: Article feeds, tag filtering, reading time estimates, and rich detail views.
   - **Video Testimonial Bento**: Interactive video testimonial player modal.
   - **API-Driven Contact System**: Real-time validated inquiry form with instant submission to backend.
   - **Global Search**: Modal search dialog for quick navigation across services and articles.

2. **Admin Dashboard (`apps/dashboard`)**:
   - **Role-Based Access Control (RBAC)**: Secure server-side middleware restriction to `admin` role.
   - **AppSidebar & Dynamic Header**: Auto-collapsing responsive sidebar (optimized for <=1024px displays), dynamic shadcn Breadcrumb header, `/auth/me` user profile card, and real-time unread messages badge.
   - **Full Management CRUD Slices**:
     - 💳 **Plans & Pricing**: Tier configuration, price points, feature lists, popular badges.
     - 👥 **Team Members**: Bios, roles, social links, status toggles.
     - 📝 **Blog Posts**: Markdown/Rich content publishing, excerpt management, cover images.
     - 💼 **Portfolio Case Studies**: Metric highlights, client info, industry classification.
     - 💬 **Testimonials**: Rating control, video modal URL management.
     - ❓ **FAQs**: Categorized Q&A builder.
     - ✉️ **Contact Messages & Inquiries**: Real-time table tracking incoming leads with read/unread flags.
     - ⚙️ **Site Config**: Global contact details, announcement bar, social URLs.

3. **Backend API (`apps/api`)**:
   - Strictly versioned REST endpoints under `/api/v1/`.
   - Global standard response wrapper: `{ success: true, statusCode: 200, message: "...", data: ... }`.
   - Centralized validation pipes and formatted error responses.
   - Self-documenting Swagger UI at `/api/docs`.

---

## 🛠️ Monorepo Scripts Reference

All commands can be executed from the monorepo root:

| Command                 | Description                                                            |
| :---------------------- | :--------------------------------------------------------------------- |
| `npm run dev`           | Starts all apps (`web`, `dashboard`, `api`) concurrently in watch mode |
| `npm run dev:web`       | Starts only the Next.js public website                                 |
| `npm run dev:dashboard` | Starts only the Next.js admin dashboard                                |
| `npm run dev:api`       | Starts only the NestJS backend                                         |
| `npm run build`         | Builds all packages and apps for production                            |
| `npm run typecheck`     | Validates TypeScript across all 6 workspaces with `tsc --noEmit`       |
| `npm run lint`          | Runs ESLint across all projects                                        |
| `npm run format`        | Formats the entire codebase using Prettier                             |
| `npm run seed`          | Seeds the MongoDB database with initial sample data and admin user     |
| `npm run clean`         | Cleans build artifacts (`.next`, `dist`, `.turbo`)                     |

---

## 📄 License & Attribution

This project was developed by **Shariar Sultan Fahim** as part of a Full-Stack Assessment.
