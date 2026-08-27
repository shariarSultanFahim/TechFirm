# @repo/api — NestJS + MongoDB API Service

Production-ready NestJS REST API featuring MongoDB with Mongoose, JWT authentication with httpOnly cookie sessions, server-side Role-Based Access Control (RBAC), DTO validation via `class-validator`, and auto-generated Swagger documentation.

---

## 🚀 Tech Stack

- **Framework**: [NestJS 11](https://nestjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Authentication**: JWT with `httpOnly` secure cookies & token rotation
- **Authorization**: Role-Based Access Control (`admin`, `user`)
- **Documentation**: Swagger / OpenAPI (`/api/docs` & `/api/docs.json`)
- **Validation**: `class-validator` + `class-transformer`

---

## 📦 Directory Architecture

```
apps/api/src/
├── common/
│   ├── decorators/      # @Roles, @CurrentUser, @Public
│   ├── filters/         # ApiExceptionFilter (Uniform error handling)
│   ├── guards/          # JwtAuthGuard, RolesGuard (RBAC)
│   └── interceptors/    # TransformInterceptor (Uniform ApiResponse)
├── modules/
│   ├── auth/            # AuthModule (Register, Login, Refresh, Logout, Me)
│   │   ├── dto/
│   │   ├── strategies/  # JwtStrategy (Cookie + Bearer token extraction)
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   └── auth.module.ts
│   └── users/           # UsersModule (User CRUD + Schema template)
│       ├── dto/
│       ├── schemas/     # Mongoose UserSchema
│       ├── users.controller.ts
│       ├── users.service.ts
│       └── users.module.ts
├── scripts/
│   └── seed.ts          # Database seed script for test accounts
├── app.module.ts        # Root module with MongooseModule & ConfigModule
└── main.ts              # Application bootstrap & Swagger configuration
```

---

## ⚙️ Environment Configuration

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

| Variable | Description | Default |
| :--- | :--- | :--- |
| `PORT` | API Server Port | `5000` |
| `MONGODB_URI` | MongoDB Connection URI | `mongodb://localhost:27017/fullstack_assessment_db` |
| `JWT_ACCESS_SECRET` | Secret key for short-lived access JWT | Min 32 chars |
| `JWT_ACCESS_EXPIRES_IN` | Access token lifespan | `15m` |
| `JWT_REFRESH_SECRET` | Secret key for long-lived refresh JWT | Min 32 chars |
| `JWT_REFRESH_EXPIRES_IN` | Refresh token lifespan | `7d` |
| `CORS_ORIGINS` | Comma-separated list of allowed origins | `http://localhost:3000,http://localhost:3001,http://admin.localhost:3001` |
| `ENABLE_API_DOCS` | Force-enable Swagger docs in production | `true` |

---

## 🛠️ Scripts

- `npm run dev`: Start API in watch mode
- `npm run build`: Compile TypeScript into `dist/`
- `npm run seed`: Seed MongoDB with Admin and User accounts
- `npm run typecheck`: Run TypeScript type-checking
- `npm run lint`: Run ESLint checks

---

## 🛡️ Endpoints Matrix

All endpoints prefixed with `/api/v1`:

### Authentication (`/api/v1/auth`)
- `POST /auth/register` — Register user & set httpOnly auth cookies
- `POST /auth/login` — Login user & set httpOnly auth cookies
- `POST /auth/refresh` — Rotate access & refresh tokens via cookie
- `POST /auth/logout` — Invalidate session & clear cookies
- `GET /auth/me` — Retrieve currently logged-in user profile

### Users (`/api/v1/users`)
- `GET /users` — List users with pagination and search (`admin` only)
- `GET /users/:id` — Get user profile (`admin` or owner)
- `PATCH /users/:id` — Update user profile (`admin` or owner)
- `DELETE /users/:id` — Remove user (`admin` only)

### Documentation
- `GET /api/docs` — Interactive Swagger UI
- `GET /api/docs.json` — Raw OpenAPI JSON specification
