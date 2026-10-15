---
name: nextjs-15-engineering-rules
description: Next.js 15 engineering rules and implementation standards for AI coding agents working in this repository. Use when creating, editing, refactoring, reviewing, or generating code for this Next.js 15 App Router project. Follow these rules for architecture, file placement, imports, naming, TypeScript, server/client boundaries, styling, security, and code quality.
---

# Next.js 15 AI Agent Rules

## Objective

Produce production-ready code that matches this repository's architecture, tooling, and conventions.

Always prefer consistency with the existing codebase over personal preference.

## Tech Stack

- Next.js 15 with App Router and Turbopack
- TypeScript in strict mode
- Tailwind CSS v4
- TanStack Query v5
- Zod for validation
- ESLint 9 + Prettier

## Core Principles

- Write clear, minimal, maintainable code.
- Keep responsibilities small and isolated.
- Prefer server components by default.
- Use client components only when interactivity, browser APIs, or client-only hooks are required.
- Keep business logic out of route files and page files.
- Prefer composition over large monolithic components.
- Preserve strict typing. Do not use `any` unless absolutely unavoidable.
- Fail early with validation and explicit error handling.
- Optimize for readability first, then performance.
- Do not introduce abstractions before they are needed.
- Follow existing patterns before inventing new ones.

## Mandatory Rules

### 1) App Router First

- Use the App Router only.
- Put routing concerns in `app/`.
- Use `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, and `not-found.tsx` only for route concerns.
- Do not place reusable business logic directly inside route files.

### 2) Server vs Client Boundaries

- Default to Server Components.
- Add `"use client"` only when needed.
- Add `"use server"` only for Server Actions.
- Never move a component to the client just for convenience.
- Keep server-only code out of client bundles.
- Never import server-only modules into client components.

### 3) Clean Architecture by Folder Responsibility

Use these folder responsibilities strictly:

- `app/`: routes, layouts, route states, route-level composition
- `app/api/`: external-facing route handlers only
- `actions/`: server mutations and write operations
- `services/`: read operations and data-fetching functions
- `components/features/`: domain-specific components
- `components/ui/`: reusable presentational primitives
- `components/providers/`: app-wide providers
- `hooks/`: reusable client hooks
- `lib/`: infrastructure utilities and shared helpers
- `validators/`: Zod schemas
- `types/`: shared types and module augmentation
- `constants/`: static app-wide constants
- `config/`: validated runtime configuration

### 4) File and Folder Naming

- Use **kebab-case** for all file and folder names.
- Component files: `my-component.tsx`
- Hooks: `use-my-hook.ts`
- Utilities: `my-util.ts`
- Tests (if added): `my-util.test.ts` in `__tests__/` folders

### 5) Imports

- Use `@/` path alias for all internal imports.
- Order imports: external packages, then internal (`@/`), then relative.
- Prettier handles import sorting via `@ianvs/prettier-plugin-sort-imports`.

### 6) TypeScript

- Enable and respect strict mode.
- Define explicit types for function parameters and return values.
- Use `type` for object shapes; use `interface` only when extending.
- Avoid `any`. Use `unknown` and narrow with type guards.
- Export types from `types/` when shared across modules.

### 7) Styling

- Use Tailwind CSS utility classes.
- Use `clsx` + `tailwind-merge` via the `cn()` helper in `lib/utils.ts`.
- Support dark mode with `dark:` variants.
- Reuse components from `components/ui/` before creating new primitives.

### 8) Data Fetching

- Use TanStack Query for client-side data fetching.
- Wrap the app in `QueryProvider` (already in root layout).
- Use `useQuery` / `useMutation` hooks in client components.
- For server-side reads, fetch directly in Server Components.

### 9) Validation

- Use Zod schemas in `validators/` for input validation.
- Validate at boundaries: API routes, Server Actions, form submissions.
- Return field-level errors for form validation.

### 10) API Routes

- Use `lib/api-error.ts` helpers (`apiSuccess`, `apiError`, `AppError`).
- Return consistent JSON response shapes.
- Set `export const dynamic = "force-dynamic"` when needed.

### 11) Environment Variables

- Define and validate env vars in `config/env.ts` using Zod.
- Use `NEXT_PUBLIC_` prefix only for client-exposed variables.
- Never commit secrets. Use `.env.local` for local overrides.

### 12) Security

- Security headers are configured in `next.config.ts` — do not weaken them.
- Sanitize user input before use.
- Never expose server-only secrets to the client.

## Component Guidelines

- Use named exports for components.
- Keep components focused — one responsibility per component.
- Extract reusable UI into `components/ui/`.
- Extract domain logic into `components/features/`.
- Props interfaces should be named `{ComponentName}Props`.

## Code Quality Checklist

Before submitting changes:

- [ ] Files use kebab-case naming
- [ ] Server/client boundaries are correct
- [ ] No unused imports or variables
- [ ] `yarn lint` passes
- [ ] `yarn format:check` passes
- [ ] `yarn build` succeeds
