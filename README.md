# 🚀 Next.js 16 + NestJS + MongoDB Turborepo Monorepo

A production-ready full-stack monorepo starter powered by **[Turborepo](https://turbo.build/repo)**, featuring **Next.js 16 (React 19, Tailwind CSS 4, Shadcn/UI)** on the public frontend (`apps/web`), **Next.js 16 Admin Dashboard** (`apps/dashboard` - subdomain-bound), and a **NestJS + MongoDB (Mongoose)** backend (`apps/api`) with secure `httpOnly` cookie-based JWT authentication and server-side Role-Based Access Control (RBAC).

---

## 🏗️ Monorepo Architecture

```
.
├── apps/
│   ├── web/                         # Next.js 16 Public App (@repo/web - Port 3000)
│   │   ├── src/
│   │   │   ├── app/account/         # 🔒 Protected user route placeholder
│   │   │   ├── lib/api-client.ts    # 🌐 Typed fetch API client (credentials: 'include')
│   │   │   └── middleware.ts        # 🛡️ Server-side auth & token validation
│   │   └── package.json
│   │
│   ├── dashboard/                   # Next.js 16 Admin App (@repo/dashboard - Port 3001)
│   │   ├── src/
│   │   │   ├── app/(protected)/     # 🔒 Protected admin routes (Overview, Users)
│   │   │   ├── components/          # 🖥️ AdminShell (sidebar nav + top bar + slot)
│   │   │   ├── lib/api-client.ts    # 🌐 Typed fetch API client
│   │   │   └── middleware.ts        # 🛡️ Server-side Admin RBAC enforcement
│   │   └── package.json
│   │
│   └── api/                         # NestJS + MongoDB Backend (@repo/api - Port 5000)
│       ├── src/
│       │   ├── common/              # Interceptors, Filters, Guards, Decorators
│       │   ├── modules/
│       │   │   ├── auth/            # 🔐 Register, Login, Refresh, Logout, Me
│       │   │   └── users/           # 👥 User Schema, Service, Controller & DTOs
│       │   ├── scripts/seed.ts      # 🌱 Database seed script (Admin & User accounts)
│       │   ├── app.module.ts
│       │   └── main.ts              # Global pipes, prefix (/api/v1), Swagger docs
│       └── package.json
│
├── packages/
│   ├── tsconfig/                    # @repo/tsconfig (base, nextjs, react-library configs)
│   ├── eslint-config/               # @repo/eslint-config (ESLint rules)
│   ├── types/                       # @repo/types (UserRole enum, IUser, ApiResponse contracts)
│   ├── validators/                  # @repo/validators (Zod validation schemas)
│   └── ui/                          # @repo/ui (Button, Badge, SectionHeading, Navbar, Footer)
│
├── package.json                     # Root npm workspaces manifest & scripts
├── turbo.json                       # Turborepo task pipeline & caching
└── README.md                        # Root documentation
```

---

## ⚡ Quick Start

### 1. Prerequisites

- **Node.js**: `v20.x` or later (v22 recommended)
- **npm**: `v9.x` or later
- **MongoDB**: Local MongoDB instance running on `mongodb://localhost:27017` (or MongoDB Atlas connection string)

### 2. Installation

Install all workspace dependencies:

```bash
npm install
```

### 3. Environment Configuration

Copy environment template files:

```bash
# Backend (.env)
cp apps/api/.env.example apps/api/.env

# Admin Dashboard (.env.local)
cp apps/dashboard/.env.example apps/dashboard/.env.local
```

### 4. Seed Database

Run the database seed script to populate the local database with pre-configured `admin` and `user` accounts:

```bash
npm run seed
```

### 5. Start Development

Run all applications in parallel with live reload:

```bash
npm run dev
```

| Service | Dev URL | Subdomain / Target | Purpose |
| :--- | :--- | :--- | :--- |
| **Public Web** | [http://localhost:3000](http://localhost:3000) | `example.com` | Public landing, marketing & client portal |
| **Admin Dashboard** | [http://localhost:3001](http://localhost:3001) | `admin.localhost:3001` | Dedicated administrative control room |
| **NestJS API** | [http://localhost:5000](http://localhost:5000) | `/api/v1` prefix | REST API & Database engine |
| **Swagger UI** | [http://localhost:5000/api/docs](http://localhost:5000/api/docs) | Interactive Docs | API explorer and schema tester |
| **OpenAPI Spec** | [http://localhost:5000/api/docs.json](http://localhost:5000/api/docs.json) | JSON Spec | Raw OpenAPI 3.0 document |

---

## 🔐 Auth & Role-Based Access Control (RBAC) Architecture

### 1. Token Lifecycle & Storage
- **Access Token**: Short-lived JWT (`15m` default), contains `{ sub, email, name, role }`.
- **Refresh Token**: Long-lived JWT (`7d` default), hashed in MongoDB for session validation and token rotation.
- **Zero LocalStorage Policy**: Both tokens are issued strictly as **`httpOnly`, `sameSite: 'lax'`, `secure: production`** cookies (`accessToken` and `refreshToken`). Neither token is exposed to client-side JavaScript, preventing XSS-based credential theft.

### 2. Guard Chain & Server-Side Enforcement
```
Incoming Request
       │
       ▼
[Next.js Server-Side Middleware]
  ├── Verify accessToken cookie presence
  ├── Inspect payload expiration & role claim
  └── For /dashboard: Strictly require role === 'admin'
       │
       ▼ (Passes)
[Next.js Server Component Page] (e.g. /account or /overview)
       │
       ▼ (Fetches Backend)
[NestJS Global Route Prefix: /api/v1]
  ├── CookieParser parses httpOnly cookies
  ├── JwtAuthGuard (Passport JwtStrategy extracts cookie / bearer)
  ├── RolesGuard (@Roles('admin' | 'user')) enforces granular permissions
  └── Controller / Service execution
```

### 3. Auth Endpoints Matrix (`/api/v1/auth`)

| Endpoint | Method | Access Level | Description |
| :--- | :--- | :--- | :--- |
| `/api/v1/auth/register` | `POST` | Public | Creates user, hashes password, sets auth cookies. |
| `/api/v1/auth/login` | `POST` | Public | Validates credentials, sets `accessToken` & `refreshToken` cookies. |
| `/api/v1/auth/refresh` | `POST` | Public (Cookie) | Reads `refreshToken` cookie, verifies against DB hash, rotates tokens. |
| `/api/v1/auth/logout` | `POST` | Authenticated | Clears DB refresh token and sets `maxAge: 0` on auth cookies. |
| `/api/v1/auth/me` | `GET` | Authenticated | Returns current authenticated user context (`{ id, email, name, role }`). |

### 4. Pre-Seeded Testing Accounts

Run `npm run seed` to initialize:

| Account Type | Email | Password | Role | Permitted Access |
| :--- | :--- | :--- | :--- | :--- |
| **Admin** | `admin@example.com` | `Admin123!` | `admin` | Full access (`web/account`, `dashboard/overview`, `/api/v1/users`) |
| **Standard User** | `user@example.com` | `User123!` | `user` | Standard portal only (`web/account`); blocked from `dashboard/*` |

---

## 🎨 Shared UI Primitives (`@repo/ui`)

Minimal structural primitives available in `packages/ui`:
- **`Button`**: Supports `primary`, `secondary`, `outline`, `ghost` variants across `light`/`dark` modes and responsive sizing (`sm`, `md`, `lg`).
- **`Badge`**: Status indicator with `default`, `secondary`, `outline`, `success`, `warning`, `destructive` states.
- **`SectionHeading`**: Structural heading wrapper with slots for `badge`, `title`, `description`, and alignment (`left`, `center`, `right`).
- **`Navbar`**: Responsive layout header with slots for `logo`, `links`, `actions`/CTA, and wired mobile toggle drawer.
- **`Footer`**: Multi-column responsive layout footer with slots for `brand`, navigation `links`, and `bottom` copyright bar.

---

## 📜 Available Scripts

| Script | Command | Description |
| :--- | :--- | :--- |
| `npm run dev` | `turbo dev` | Run all applications concurrently in watch mode |
| `npm run dev:web` | `turbo dev --filter=@repo/web` | Run public Next.js app only (Port 3000) |
| `npm run dev:dashboard` | `turbo dev --filter=@repo/dashboard` | Run admin Next.js app only (Port 3001) |
| `npm run dev:api` | `turbo dev --filter=@repo/api` | Run NestJS backend only (Port 5000) |
| `npm run build` | `turbo build` | Build all applications for production |
| `npm run seed` | `npm run seed --workspace=@repo/api` | Seed MongoDB with admin and test user accounts |
| `npm run typecheck` | `turbo typecheck` | Run TypeScript typechecking across all workspaces |
| `npm run lint` | `turbo lint` | Run ESLint across all workspaces |
| `npm run clean` | `turbo clean` | Clean build artifacts (`.next`, `dist`) |
