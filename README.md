# Bonby Next.js Boilerplate

A production-ready Next.js 15 starter with modern tooling, UI components, and dark mode.

## Tech Stack

- **Framework:** Next.js 15 (App Router, Turbopack)
- **Language:** TypeScript (strict mode)
- **Data Fetching:** TanStack Query v5 (React Query)
- **Styling:** Tailwind CSS v4
- **Validation:** Zod
- **Dark Mode:** next-themes (system + manual toggle)
- **Notifications:** react-toastify
- **Icons:** react-icons
- **Utilities:** lodash, clsx, tailwind-merge
- **Linting:** ESLint 9 (flat config) + Prettier
- **Git Hooks:** husky + lint-staged + commitlint
- **Package Manager:** Yarn
- **Containerization:** Docker + Docker Compose

## Features

- TanStack Query for client-side data fetching
- Dark mode toggle (system preference + manual)
- Toast notifications
- Security headers (HSTS, X-Frame-Options, CSP, etc.)
- Git hooks enforcing lint, format, and conventional commits
- Environment-specific configuration (development, staging, production)
- Bundle analyzer for build inspection
- Skeleton loading states
- Shared UI component library
- Multi-stage Docker build for production
- Responsive, dark-mode-ready UI
- Health check API endpoint

## Prerequisites

- [Node.js](https://nodejs.org/) 22 or later
- [Yarn](https://classic.yarnpkg.com/) 1.x
- [Docker](https://www.docker.com/) (optional, for containerized deployment)

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd bonby-nextjs-boilerplate
```

### 2. Install dependencies

```bash
yarn install
```

### 3. Set up environment variables

```bash
cp .env.example .env.local
```

| Variable              | Description                                                 | Required |
| --------------------- | ----------------------------------------------------------- | -------- |
| `NEXT_PUBLIC_APP_URL` | Your app URL                                                | No       |
| `NEXT_PUBLIC_APP_ENV` | Environment name: `development`, `staging`, or `production` | No       |

### 4. Run the development server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Clean setup for new projects: remove UI preview

The dashboard includes a **UI component preview** table that showcases all shared components from `@/components/ui`. For a clean setup when starting a new project, you can remove it as follows.

**1. Update the dashboard page**

Edit `app/dashboard/page.tsx`:

- Remove the `UiPreviewTable` import.
- Remove the "UI components" block.

**2. (Optional) Delete the preview component**

```bash
rm app/dashboard/ui-preview-table.tsx
```

## Environment Configuration

| File               | Purpose                             | Committed to Git |
| ------------------ | ----------------------------------- | ---------------- |
| `.env.example`     | Template with all variables         | Yes              |
| `.env.development` | Development defaults                | Yes              |
| `.env.staging`     | Staging template                    | Yes              |
| `.env.production`  | Production template                 | Yes              |
| `.env.local`       | Local overrides (your actual secrets) | No (gitignored)  |

**Loading priority** (highest to lowest):

1. `.env.local` — always loaded, gitignored
2. `.env.[environment]` — loaded based on `NODE_ENV`
3. `.env` — fallback

**Environment validation** (`config/env.ts`):

- All env vars are validated at startup using Zod
- Missing required variables throw immediately with descriptive errors
- Use `isDevelopment`, `isStaging`, `isProduction` helpers for conditional logic

## Docker Setup

```bash
# Build and start (defaults to development)
docker compose up -d

# Start with a specific environment
APP_ENV=staging docker compose up -d
APP_ENV=production docker compose up -d

# Or use the yarn script
yarn docker:up
```

The app will be available at [http://localhost:3000](http://localhost:3000).

```bash
docker compose down
```

## Available Scripts

| Script              | Description                          |
| ------------------- | ------------------------------------ |
| `yarn dev`          | Start development server (Turbopack) |
| `yarn build`        | Production build                     |
| `yarn start`        | Start production server              |
| `yarn lint`         | Run ESLint                           |
| `yarn lint:fix`     | Run ESLint with auto-fix             |
| `yarn format`       | Format all files with Prettier       |
| `yarn format:check` | Check formatting without writing     |
| `yarn analyze`      | Build with bundle analyzer           |
| `yarn docker:up`    | Start Docker containers              |
| `yarn docker:down`  | Stop Docker containers               |
| `yarn docker:build` | Build Docker image                   |

## Project Structure

```
app/
  api/health/          # Health check endpoint
  dashboard/           # Dashboard page with UI preview
  layout.tsx           # Root layout with providers
  page.tsx             # Home page
components/
  features/            # Domain-specific components (theme toggle, etc.)
  providers/           # App-wide providers (theme, query, toast)
  ui/                  # Reusable UI primitives
config/                # Validated runtime configuration
constants/             # Static app-wide constants
hooks/                 # Reusable client hooks
lib/                   # Infrastructure utilities
types/                 # Shared types
```

## Security

The following security headers are applied to all routes via `next.config.ts`:

| Header                      | Value                                          |
| --------------------------- | ---------------------------------------------- |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` |
| `X-Frame-Options`           | `SAMEORIGIN`                                   |
| `X-Content-Type-Options`    | `nosniff`                                      |
| `Referrer-Policy`           | `strict-origin-when-cross-origin`              |
| `Permissions-Policy`        | `camera=(), microphone=(), geolocation=()`     |
| `X-DNS-Prefetch-Control`    | `on`                                           |

## Dark Mode

Dark mode is powered by `next-themes` with class-based toggling:

- **System preference** detected automatically on first visit
- **Manual toggle** via the `ThemeToggle` component in the dashboard header
- Dark mode classes use Tailwind's `dark:` variant

## Git Hooks

Git hooks are enforced via `husky`:

| Hook         | Tool        | Action                                               |
| ------------ | ----------- | ---------------------------------------------------- |
| `pre-commit` | lint-staged | Format (Prettier) and lint (ESLint) staged files     |
| `commit-msg` | commitlint  | Validate commit message follows Conventional Commits |

## Deployment Guide

### Option 1: Vercel (Recommended)

1. Push your code to a Git repository
2. Go to [vercel.com](https://vercel.com) and import your project
3. Set environment variables:

```
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_APP_ENV=production
```

4. Deploy — Vercel auto-detects Next.js and configures the build

### Option 2: Docker on VPS

```bash
git clone <your-repo-url>
cd bonby-nextjs-boilerplate
cp .env.production .env
APP_ENV=production docker compose up -d --build
```

### Option 3: Node.js Standalone

```bash
yarn build
cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static
cd .next/standalone
NODE_ENV=production node server.js
```

### Deployment Checklist

- [ ] Set `NEXT_PUBLIC_APP_URL` to your actual domain
- [ ] Set `NEXT_PUBLIC_APP_ENV=production`
- [ ] Set up SSL/TLS (HTTPS)

## License

MIT
