# Cursor Rules — TechFirm Turborepo Monorepo

This is a full-stack Turborepo monorepo with:

- **`apps/web`** — Next.js 16 App Router public frontend (TypeScript, Tailwind CSS v4, shadcn/ui, TanStack Query)
- **`apps/dashboard`** — Next.js 16 App Router **admin** frontend, intended for a separate subdomain (TypeScript, Tailwind CSS v4, shadcn/ui `sidebar-04` base, TanStack Query)
- **`apps/api`** — **NestJS** backend (TypeScript, **Mongoose/MongoDB**, `nestjs-zod`, JWT via `@nestjs/passport`, `@nestjs/swagger`)
- **`packages/*`** — Shared configs, UI components (`@repo/ui`), validators (`@repo/validators`), types (`@repo/types`)

> **Migration note**: this repo previously ran Express + Prisma/PostgreSQL on
> `apps/api`. It has been migrated to NestJS + Mongoose/MongoDB. Any file,
> comment, or generated code referencing Prisma, `PrismaClient`, `.prisma`
> schemas, or Express-style `req/res/next` handlers is stale — do not pattern-
> match against it. This document reflects the current stack only.

---

## 0. Universal Rules (all files in the monorepo)

- Never use `any` — use `unknown`, generics, or explicit interfaces.
- Never commit `.env` with real values; only `.env.example` is committed.
- Remove unused imports and `console.log` before committing.
- Follow Conventional Commits: `feat:`, `fix:`, `refactor:`, `chore:`, `docs:`, `test:`.
- ESLint and Prettier are always enforced — no inline disables without a comment explaining why.
- Prettier: `singleQuote: false`, `trailingComma: "none"`, `printWidth: 100`.
- All secrets must come from environment variables; never hardcode credentials.
- Magic strings/numbers must be extracted into named constants.
- Functions must have a single responsibility and stay under ~60 lines.
- Every visual pattern reused across ≥2 pages/apps (cards, badges, section
  headings, CTA bands, etc.) must be a single shared component in
  `packages/ui` — never copy-pasted per page or per app.

---

## 1. Monorepo & Turborepo

- All shared code lives in `packages/` — never duplicate it inside `apps/`.
- Internal packages use `@repo/*` namespace.
- Types shared across apps → `packages/types`. Since `apps/api` now emits
  Mongoose-derived shapes instead of Prisma-derived ones, keep `@repo/types`
  in sync with the current Mongoose schemas — regenerate/update by hand
  whenever a schema changes, there is no Prisma-style auto-generated client
  to drift from silently.
- Zod schemas shared across apps → `packages/validators`. These are reused
  directly by `apps/api` via `nestjs-zod` (see §7) — do not maintain a
  parallel `class-validator` DTO set for the same shape.
- Build pipeline is defined in `turbo.json`; declare all tasks there for
  proper caching. `apps/dashboard` must have the same task entries
  (`dev`, `build`, `lint`, `typecheck`) as `apps/web`.
- Run everything from root: `npm run dev`, `npm run build`, `npm run lint`,
  `npm run typecheck`. Root `dev` runs all three apps concurrently
  (`web:3000`, `dashboard:3001`, `api:5000`).

---

## 2. TypeScript

- Strict mode is on everywhere, including `experimentalDecorators` and
  `emitDecoratorMetadata` in `apps/api`'s `tsconfig.json` (required by Nest's
  DI/decorator system).
- `interface` for object shapes, `type` for unions/intersections/mapped types.
- Frontend type names (`apps/web`, `apps/dashboard`): `PascalCase`, no `I`
  prefix (e.g., `User`, `LoginData`).
- Backend type names (`apps/api`): `PascalCase`, `I` prefix for interfaces
  (e.g., `IUser`, `ILoginData`) — existing convention, unchanged by the
  Nest migration.
- Type files: `kebab-case` naming (e.g., `auth.ts`, `user.ts`).
- Enums: `PascalCase` name, `SCREAMING_SNAKE_CASE` values. Mongoose schema
  enum fields (e.g. `role`) must reference the same shared enum, not a
  re-declared string union.

---

## 3. Naming Conventions

| Entity                   | Convention                        | Example                                        |
| ------------------------ | --------------------------------- | ---------------------------------------------- |
| Files & folders          | `kebab-case`                      | `auth.service.ts`, `user-list/`                |
| React components         | `PascalCase`                      | `UserList.tsx`                                 |
| shadcn/ui files          | `kebab-case`                      | `button.tsx`                                   |
| Hook files               | `kebab-case`, `use-` prefix       | `use-auth.ts`                                  |
| Hook functions           | `camelCase`, `use` prefix         | `useAuth()`                                    |
| Nest modules/providers   | `PascalCase` class, Nest suffix   | `AuthService`, `AuthController`, `UsersModule` |
| Nest decorators (custom) | `PascalCase`                      | `@Roles()`, `@CurrentUser()`                   |
| Mongoose schema classes  | `PascalCase`, no suffix           | `User`, `Plan`, `Post`                         |
| Mongoose schema files    | `kebab-case`, `.schema.ts` suffix | `user.schema.ts`                               |
| Constants                | `SCREAMING_SNAKE_CASE`            | `MAX_FILE_SIZE`                                |
| Zod schemas              | `camelCase` + `Schema` suffix     | `createUserSchema`                             |

---

## 4. Security

- Validate ALL user input with Zod (via `nestjs-zod`, see §7) before it
  reaches a service — no raw, unvalidated `req.body`-equivalent payloads
  processed directly.
- Hash passwords with `bcrypt` (≥10 rounds) or `argon2` — never store
  plaintext.
- JWT secrets from environment variables only — never hardcoded.
- Access + refresh tokens are issued as **httpOnly cookies**, never returned
  in a JSON body and never read/written from `localStorage` on the frontend.
- Protected routes use `@UseGuards(JwtAuthGuard, RolesGuard)` +
  `@Roles(...)` — role checks are enforced server-side in `apps/api`
  regardless of what the frontend does or doesn't render.
- CORS: explicit allowlist of `apps/web` and `apps/dashboard` origins
  (dev and prod) — no wildcard `*`, ever, even in development shortcuts.
- Cookies: `httpOnly`, `secure`, `sameSite` always set; if `apps/dashboard`
  and `apps/web` need to share a session across subdomains later, cookies
  must use `Domain=.yourdomain.com`, not a subdomain-scoped domain.
- Never log passwords, tokens, or PII.
- Never expose stack traces or internal errors in production API responses.

---

## 5. Error Handling

### Backend (`apps/api`)

- Services throw `ApiError(statusCode, message)` for domain errors — never
  a plain `Error` or a raw `HttpException` thrown directly from a service.
- Global `ApiExceptionFilter` (`@Catch()`) converts `ApiError`,
  `ZodValidationException` (from `nestjs-zod`), Mongoose `ValidationError` /
  `CastError` / duplicate-key errors, and unhandled exceptions into the
  standard error response shape (§7).
- A global `TransformInterceptor` wraps all successful responses into the
  standard success shape (§7) — controllers return plain data, they never
  construct the envelope themselves.
- No `try/catch` scattered per-controller for error formatting — that's the
  filter's job. Controllers stay thin.

### Frontend (`apps/web`, `apps/dashboard`)

- Data-fetching errors must surface as toast notifications — never silently
  swallowed.
- Every `useQuery`/`useMutation` must handle loading and error states
  visually.
- Admin mutations (`apps/dashboard`) must show an explicit success
  confirmation (toast) in addition to error handling — silent success is
  not acceptable in an admin UI where the action often isn't otherwise
  visible until a page refresh.

---

## 6. Frontend Rules — `apps/web` and `apps/dashboard`

These conventions apply to **both** Next.js apps unless a rule is scoped
explicitly to one.

### Structure

```
src/
  app/           # Pages, layouts, route handlers (App Router)
  components/
    layouts/     # Header, Footer / AdminShell — PascalCase
    ui/          # shadcn/ui — kebab-case, DO NOT modify
    widgets/     # Feature composites — kebab-case folders, PascalCase files
    icons/       # PascalCase + Icon suffix (e.g., ReactIcon)
  config/        # seo.ts, site.ts
  data/          # Static data — kebab-case, variableName ends with Data
  helpers/       # Domain computation helpers
  hooks/         # use-*.ts custom hooks
  lib/           # api.ts, date.ts, cookie-client.ts
  middleware.ts  # Server-side auth/role gate — required for any protected route
  providers/     # React Context providers — PascalCase
  styles/        # tailwind.css
  types/         # Type definitions — kebab-case files
```

`apps/dashboard` follows the same structure. Its `components/layouts/`
holds `AdminShell` (sidebar + header, from the shadcn `sidebar-04` base)
instead of the marketing `Header`/`Footer`.

### Components

- Every component folder must have `index.ts` re-exporting it.
- `components/ui` (shadcn/ui) is off-limits — wrap instead of modifying.
  This applies identically in `apps/dashboard` after running
  `npx shadcn@latest add sidebar-04` — re-theme via Tailwind tokens/CSS
  variables, don't hand-edit the generated primitives.
- No inline styles — Tailwind only.
- Prop names must be intent-driven: `onSubmit`, `isLoading`, `variant`.
- Shared visual primitives (buttons, badges, section headings, cards, the
  dark CTA band, footer) live in `packages/ui` and are consumed by both
  `apps/web` and `apps/dashboard` where the brand should be visibly
  consistent — `apps/dashboard` may use a denser layout/spacing scale on
  top of the same tokens, but not a different color/type system.

### Data Fetching

- HTTP requests via helpers in `src/lib/api.ts` (Axios-based), configured
  to send credentials (cookies) on every request.
- TanStack Query (`useQuery`, `useMutation`) for all server state.
- Always show loading/error states.
- Errors → toast notifications.
- Any page that reads `plans`, `posts`, or `contact-messages` data must hit
  the real `apps/api` endpoints — no hardcoded arrays standing in for what
  is meant to be database-backed content (see backend §7 module list).

### State

- React Context for global UI state in `src/providers/`.
- Avoid `useState` for server state — use TanStack Query.

### Auth & Route Protection

- `src/middleware.ts` performs the server-side auth/role check for every
  protected route — this is mandatory, a client-side redirect alone is not
  sufficient and will not pass review.
- `apps/dashboard`: **every** route except `/login` is protected and
  requires the `admin` role; a non-admin authenticated user is redirected
  with a clear message, not silently bounced.
- `apps/web`: only specific routes (e.g. `/account`) are protected; public
  marketing pages require no auth check.

### Environment

- `@t3-oss/env-nextjs` + Zod validation in `src/env.ts`, in both apps.
- Import env values only from `src/env.ts`.
- Client vars must have `NEXT_PUBLIC_` prefix.
- `apps/dashboard` additionally defines `NEXT_PUBLIC_APP_URL` for its
  eventual subdomain (e.g. `admin.example.com` in prod,
  `admin.localhost:3001` in dev).

### Routing & Cookies

- App Router conventions: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`.
- Server cookies: `cookies()` from `next/headers`.
- Client cookies: helpers from `src/lib/cookie-client.ts`.

### Themes & Fonts

- Theme CSS variables managed by `ThemePresetProvider` via injected
  `<style>` tag (`apps/web`).
- `apps/dashboard` reuses the same design tokens (colors, type scale) but
  does not need the full multi-theme preset system — a single fixed theme
  matching the brand is sufficient.
- Font CSS variables (`--font-sans`, `--font-serif`, `--font-mono`) are set
  per theme.
- Google Fonts loaded as `<link>` tags in `layout.tsx` head — not via CSS
  `@import`.

### Accessibility

- Every interactive element has an accessible label.
- Use ARIA attributes where semantic HTML is insufficient.
- Meaningful images wrapped in `<figure>` with `<figcaption>`.

### Icons

- `lucide-react` only. No mixing of icon libraries (this includes
  `apps/dashboard`'s use of shadcn `sidebar-04`, which ships with
  `lucide-react` by default — do not swap it for another icon set).

### Utilities

- Date → `src/lib/date.ts`
- Numbers/currency → `Intl` API
- Slugs → `@sindresorhus/slugify` (used for `posts.slug` generation)
- General hooks → `usehooks-ts`
- Constants → `src/constants/` in `SCREAMING_SNAKE_CASE`

### Figma-derived pages (`apps/web`)

- When building a page against a Figma frame (via the connected Figma MCP
  server), prefer exact values pulled from the Figma node (color, spacing,
  type) over visual approximation from a screenshot.
- A component instance repeated across multiple Figma frames (e.g. a
  pricing card, a process step) must be built once in `packages/ui` from
  the underlying Figma component definition, not reconstructed separately
  per page instance.

---

## 7. Backend Rules — `apps/api`

### Structure

```
src/
  common/
    decorators/    # @Roles(), @CurrentUser(), etc.
    filters/       # api-exception.filter.ts
    guards/        # jwt-auth.guard.ts, roles.guard.ts
    interceptors/  # transform.interceptor.ts
  config/          # configuration.ts (env loading via @nestjs/config)
  modules/         # Feature modules
    <module>/
      <module>.controller.ts
      <module>.service.ts
      <module>.module.ts
      schemas/
        <module>.schema.ts     # Mongoose @Schema()/@Prop() class
      dto/
        create-<module>.dto.ts # nestjs-zod DTO
        update-<module>.dto.ts
  errors/          # api-error.ts
  helpers/         # jwt.helper.ts, email.helper.ts
  main.ts          # Nest bootstrap: global pipes, filters, interceptors,
                    # CORS, Swagger setup
```

### Module Pattern

Each feature module contains:

1. **`schemas/<module>.schema.ts`** — Mongoose schema via `@Schema()` /
   `@Prop()` decorators, exporting the class and its `HydratedDocument` type.
2. **`dto/create-<module>.dto.ts` / `update-<module>.dto.ts`** — built with
   `nestjs-zod`'s `createZodDto()` wrapping a schema from `@repo/validators`
   where one already exists for that shape (shared with `apps/web`/
   `apps/dashboard` forms), or a local Zod schema otherwise.
3. **`<module>.module.ts`** — registers the Mongoose feature
   (`MongooseModule.forFeature([...])`), controller, and service.
4. **`<module>.controller.ts`** — thin: route decorators, `@UseGuards`,
   `@Roles()`, delegates to the service, returns plain data (the global
   interceptor wraps it).
5. **`<module>.service.ts`** — business logic + Mongoose model queries +
   throws `ApiError` on domain failures.

### Validation — `nestjs-zod`

- DTOs are Zod schemas wrapped via `createZodDto()`, not `class-validator`
  decorated classes — this repo standardizes on Zod end-to-end so
  `packages/validators` schemas can be shared verbatim between `apps/web`
  form validation and `apps/api` DTO validation.
- Do not introduce `class-validator`/`class-transformer` decorators on new
  DTOs — if you find them on old/generated code, migrate to `nestjs-zod`
  rather than extending the class-validator pattern.
- Global `ZodValidationPipe` is registered once in `main.ts`; controllers do
  not add per-route validation pipes.

### OpenAPI / Swagger Documentation

- Docs are generated via `@nestjs/swagger`'s `DocumentBuilder` +
  `SwaggerModule`, configured in `main.ts` — **not** hand-written JSDoc
  comments on controllers.
- Every DTO built with `createZodDto()` must have its Zod schema annotated
  with `.describe()` / `nestjs-zod`'s OpenAPI metadata helpers so it renders
  correctly in Swagger — an undocumented DTO field is a review blocker.
- Swagger UI served at `/api/docs`, raw spec at `/api/docs.json`; available
  by default in development, gated by `ENABLE_API_DOCS=true` in production.

### Routing & Versioning

- All routes prefixed `/api/v1` via a global route prefix in `main.ts`
  (not per-controller `@Controller('v1/...')` strings).

### Response Format

```ts
// Success (via global TransformInterceptor)
{ success: true, statusCode: 200, message: "...", data: {...} | null, pagination?: {...} }

// Error (via global ApiExceptionFilter)
{ success: false, message: "...", errorMessages: [{ path, message }], stack?: "..." }
```

This contract is unchanged from the Express/Prisma era — `apps/web` and
`apps/dashboard` API clients depend on it, so it must not drift during or
after the Nest migration.

### Database & Mongoose

- Inject models via `@InjectModel(User.name) private userModel: Model<UserDocument>`
  — never instantiate a Mongoose model or open a connection manually inside
  a service.
- Use `.lean()` for read-only queries that don't need Mongoose document
  methods, to avoid unnecessary hydration overhead.
- Select only needed fields via projection — no implicit full-document
  reads where a subset suffices.
- Multi-step writes that must be atomic → Mongoose sessions/transactions
  (`startSession()` + `withTransaction()`), not sequential unguarded writes.
- Schema changes are made directly in the `@Schema()` class — there is no
  Prisma-style migration file; if a change requires backfilling existing
  documents, write a one-off script under `scripts/` and note it in
  `BUILD_LOG.md` or the module's own comments, don't silently assume empty
  collections.

### Auth & Authorization

- JWT: short-lived access token + long-lived refresh token, both issued as
  httpOnly cookies from `AuthController` — never returned in the JSON body.
- `JwtAuthGuard` (via `@nestjs/passport` + `passport-jwt`) verifies the
  token and attaches the user to the request.
- `RolesGuard` + `@Roles('admin' | 'user')` enforce role-based access on top
  of `JwtAuthGuard` — always paired, never `RolesGuard` alone.
- `/auth/refresh` and `/auth/logout` are required endpoints; refresh
  rotates the token pair rather than only extending the access token.

### Logging

- Use Nest's built-in `Logger` (or a Winston adapter if one is already
  wired) for structured logs — no ad hoc `console.log`.
- Never log sensitive data (passwords, tokens, PII).
- Development: `debug`/`log` level; Production: `warn`/`error` only.

### Config

- All env values loaded via `@nestjs/config` in `config/configuration.ts`
  and accessed through the injected `ConfigService` — never
  `process.env` accessed directly inside a service or controller.
- Keep `.env.example` in sync with every new variable, including
  `MONGODB_URI`, JWT secrets, and the CORS origin allowlist.

---

## 8. Precedence

- Repository rules in this file take precedence over any global Cursor/
  Antigravity defaults.
- `apps/web`, `apps/dashboard`, and `apps/api` specific conventions take
  precedence over the shared rules above when they conflict.
- Where this file and `ANTIGRAVITY_BUILD_PROMPT.md` (or any other task-
  specific build doc) disagree on a convention, this file is the source of
  truth for ongoing repo structure/style; the build doc's scope/priority
  decisions (what to build, in what order) still stand.
