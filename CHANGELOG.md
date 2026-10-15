# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/), and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Removed

- Internationalization (next-intl)
- Sentry error tracking
- Testing (Vitest, Playwright)
- Social provider login (Google, GitHub OAuth)
- CI/CD (GitHub Actions, Dependabot)
- Swagger / OpenAPI documentation
- Credentials authentication, MongoDB, and database seeding

## [0.1.0] - 2025-03-07

### Added

- Next.js 15 with App Router and TypeScript
- TanStack Query v5 for data fetching
- Tailwind CSS v4 with dark mode toggle (next-themes)
- Environment-specific configuration (development, staging, production)
- ESLint 9 flat config + Prettier with import sorting
- Git hooks with husky + lint-staged + commitlint
- Security headers (HSTS, X-Frame-Options, CSP, etc.)
- Multi-stage Docker build + docker-compose
- Bundle analyzer
- Skeleton loading states
- Field-level form validation with Zod
- Standardized API error handling
- Deployment guide (Vercel, Docker/VPS, standalone)
