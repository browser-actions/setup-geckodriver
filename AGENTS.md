# Agentic Coding Guide

This file provides guidance for AI coding agents working in this repository.

## Repository Purpose

`setup-geckodriver` is a GitHub Action that downloads and installs geckodriver (the WebDriver implementation for Firefox) on GitHub Actions runners.

## Commands

> ⚠️ This repository uses an **older toolchain** (Jest + ESLint/Prettier + yarn) compared to other browser-actions repos.

```bash
yarn install          # install dependencies
yarn lint             # lint with ESLint
yarn lint:fix         # lint with auto-fix
yarn test             # run all unit tests with Jest
yarn build            # compile TypeScript → dist/index.js
yarn package          # copy action.yml + README.md into dist/
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
action.yml            # action metadata: inputs, outputs
jest.config.js        # Jest configuration
```

## Architecture

`InstallerFactory.ts` selects a platform-specific installer based on OS and architecture. The installer fetches the geckodriver release list from the GitHub Releases API, resolves the requested version, downloads the archive, extracts it, and adds the binary to `PATH`.

The `token` input is passed to the GitHub API to avoid rate limiting during release list fetching.

## Testing

Tests live in `__test__/` and use [Jest](https://jestjs.io/).

- Run `yarn test` (not `pnpm test`).
- Tests mock GitHub API calls.

## Conventions

- **TypeScript** — all types must be explicit; avoid `any`.
- **Linter:** ESLint with Prettier (not Biome — this repo predates the org-wide Biome adoption).
- **Conventional Commits** are required for all commits (`feat:`, `fix:`, `chore:`, etc.).
- **Never commit `dist/`** — it is built by CI and deployed to the `latest` branch on release.
- The `action.yml` `main` field points to `index.js` inside `dist/`, not the TypeScript source.

> When modernising this repo (switching to pnpm/Biome/Vitest), do so as a dedicated chore commit rather than mixing it with feature or fix changes.
