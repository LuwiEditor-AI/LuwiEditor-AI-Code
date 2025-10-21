# Contributing guide

Thanks for your interest in contributing! This guide covers workflow, development setup, style, testing, and PR expectations.

## Workflow
1. **Fork** the repository and create a feature branch.
2. **Install** dependencies: `pnpm install`.
3. **Develop** in small, focused commits using Conventional Commits.
4. **Test** with `pnpm test` and lint with `pnpm lint`.
5. **Open a PR** referencing related issues and explaining the change.

## Development setup
- **Node.js:** 20+
- **PNPM:** 8+
- **Tooling:** ESLint, Prettier, TypeScript, Jest/Vitest (project dependent)
- **Scripts:** Run `pnpm -r build` to build all packages.

## Code style
- **TypeScript-first:** Strict mode enabled where applicable.
- **Formatting:** Prettier enforced; do not commit reformat-only changes.
- **Commits:** Use Conventional Commits (`feat:`, `fix:`, `docs:`, `ci:`, etc).
- **Structure:** Keep modules small and focused; avoid tight coupling.

## Testing
- **Unit tests:** Required for new features and bug fixes.
- **Coverage:** Maintain or improve coverage thresholds.
- **Snapshots:** Keep them stable and review changes carefully.

## Pull requests
- **Checklist:** Lint, test, typecheck, update docs if needed.
- **Description:** Clear summary, motivation, and implementation details.
- **Scope:** Avoid combining unrelated changes.
- **Review:** Be responsive to feedback; prefer follow-up PRs for large revisions.

## Communication
- **Issues:** Use templates for bug reports, features, and questions.
- **Discussions:** Keep technical decisions documented in the PR.
- **Respect:** Follow the Code of Conduct in all interactions.
