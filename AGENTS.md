# Agentic Coding Guide

This file provides guidance for AI coding agents working in this repository.

## Repository Purpose

`setup-geckodriver` is a GitHub Action that downloads and installs geckodriver (the WebDriver implementation for Firefox) on GitHub Actions runners.

## Commands

This repository uses Jest, Biome, and pnpm. Node.js ≥ 24 is required.

```bash
pnpm install --frozen-lockfile  # install dependencies
pnpm lint             # lint with Biome
pnpm lint:fix         # lint with auto-fix
pnpm test             # run all unit tests with Jest
pnpm build            # compile TypeScript → dist/index.js
pnpm package          # copy action.yml + README.md into dist/
```

## Project Layout

```
src/
  index.ts            # action entry point: reads inputs, downloads and installs geckodriver
  platform.ts         # OS/arch detection → Platform struct
  Installer.ts        # Installer interface + base class
  InstallerFactory.ts # factory that returns the right installer for the current platform
__test__/
  InstallerFactory.test.ts  # Jest unit tests for installer factory
  platform.test.ts          # Node.js architecture mapping regression test
action.yml            # action metadata: inputs, outputs
jest.config.cjs        # Jest configuration
```

## Architecture

`InstallerFactory.ts` selects a platform-specific installer based on OS and architecture. The installer fetches the geckodriver release list from the GitHub Releases API, resolves the requested version, downloads the archive, extracts it, and adds the binary to `PATH`.

The `token` input is passed to the GitHub API to avoid rate limiting during release list fetching.

## Testing

Tests live in `__test__/` and use [Jest](https://jestjs.io/).

- Run `pnpm test`.
- Tests mock GitHub API calls.

## Conventions

- **TypeScript** — all types must be explicit; avoid `any`.
- **Linter and formatter:** Biome — run `pnpm lint` before committing.
- **Conventional Commits** are required for all commits (`feat:`, `fix:`, `chore:`, etc.).
- **Never commit `dist/`** — it is built by CI and deployed to the `latest` branch on release.
- The `action.yml` `main` field points to `index.js` inside `dist/`, not the TypeScript source.

> When switching test frameworks, do so as a dedicated chore commit rather than mixing it with feature or fix changes.

## GitHub Actions lockfile

Workflow dependencies are tracked in `.github/workflows/actions.lock`. After changing any workflow action reference, run `gh actions-lock` and commit the updated workflows and lockfile together. Install the CLI extension with `gh extension install github/gh-actions-lock --pin v0.4.1` if needed.

Run `gh actions-lock --verify-local` for an offline coverage check and `gh actions-lock --verify` to verify upstream references.
