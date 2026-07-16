# Changelog

## Unreleased

### Added

- A reusable server-only `getPlatforms()` helper for the homepage Supabase query.
- Tailwind CSS 3 configuration with the Material Tailwind compatibility wrapper and existing design-token mappings.
- Next.js 15 `middleware.js` entry point for the existing Supabase session middleware.
- `scripts/next15-build.cjs` to run Next.js 15 worker-thread builds in the restricted Windows validation environment.

### Changed

- Replaced the hardcoded homepage platform array with all rows returned by the Supabase `platforms` table.
- Generated category filter buttons from the fetched platform categories and kept filtering inside the existing client grid.
- Made the homepage dynamically rendered so newly added platforms appear on the next request without a rebuild.
- Aligned the root manifest and lockfile with Next.js `^15.5.20`, React/React DOM `^18.3.1`, and every other user-specified dependency range.
- Migrated global CSS from Tailwind CSS 4 syntax to Tailwind CSS 3 directives while preserving the same rendered values.
- Restored the Tailwind CSS 3 PostCSS pipeline with the required PostCSS and Autoprefixer versions.
- Updated ESLint configuration for `eslint-config-next` 15.5.20 through ESLint 9's flat-config compatibility layer.
- Restored the Next.js 15 middleware file/export convention.
- Updated project documentation to describe the verified Next.js 15, React 18, Tailwind CSS 3, and JavaScript-only implementation.

### Fixed

- Removed the invalid `passing` column request and limited the homepage query to fields rendered by platform cards.
- Resolved invalid duplicate package entries and regenerated a valid lockfile.
- Removed all source merge-conflict markers.
- Replaced Next.js 16, React 19, and Tailwind CSS 4 assumptions with APIs and configuration supported by the required versions.
- Fixed Tailwind palette compatibility in the global selection style without changing its visual colors.
- Fixed production building under the sandbox's child-process restrictions without changing runtime logic.
- Verified all imports, exports, metadata routes, middleware, and protected-route behavior through lint, build, and runtime tests.

### Removed

- The hardcoded `data/platforms.js` source.
- Unfinished platform-details components and route folders from the cancelled scope.
- Tailwind CSS 4 PostCSS configuration and CSS-first syntax.
- The Next.js 16 `proxy.js` convention.
- Remaining TypeScript source/configuration in favor of JavaScript modules and `jsconfig.json`.
- Dependency entries not present in the user-approved package list.

## Completed homepage implementation

### Added

- Production App Router architecture, responsive Navbar, Hero, categories, filterable platform cards, benefits, guides, newsletter, and Footer.
- Centralized static data modules and reusable mapped cards.
- Complete root metadata, canonical URL handling, sitemap, robots, manifest, generated social images, and branded icon metadata.
- Loading, error-recovery, custom not-found UI, and keyboard skip navigation.
- Optimized local fonts and Next.js image handling.
