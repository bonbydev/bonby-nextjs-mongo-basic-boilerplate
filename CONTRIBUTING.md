# Contributing to Bonby Next.js Boilerplate

Thank you for your interest in contributing! This guide will help you get started.

## Development Setup

1. Fork and clone the repository
2. Install dependencies: `yarn install`
3. Copy env file: `cp .env.example .env.local`
4. Start dev server: `yarn dev`

## Branch Naming

| Pattern                  | Use case      | Example                     |
| ------------------------ | ------------- | --------------------------- |
| `feature/<description>`  | New feature   | `feature/user-profile`      |
| `fix/<description>`      | Bug fix       | `fix/dashboard-layout`      |
| `chore/<description>`    | Maintenance   | `chore/update-dependencies` |
| `refactor/<description>` | Restructuring | `refactor/api-layer`        |
| `docs/<description>`     | Documentation | `docs/api-usage`            |

## Commit Messages

We use [Conventional Commits](https://www.conventionalcommits.org/). This is enforced by commitlint.

```
<type>(<scope>): <description>
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`, `ci`, `revert`

## Pull Request Process

1. Create a feature branch from `main`
2. Make your changes with clear, atomic commits
3. Ensure all checks pass: `yarn lint && yarn build`
4. Open a PR with a clear description of what and why
5. Request review from a maintainer

## Code Standards

- All files use **kebab-case** naming (enforced by ESLint)
- Use **named exports** for components
- Run `yarn format` before committing (also enforced by lint-staged)
- Use the existing patterns (TanStack Query for reads, Server Actions for mutations)

## Running Checks

```bash
yarn lint          # ESLint
yarn format:check  # Prettier check
yarn build         # Production build
```
