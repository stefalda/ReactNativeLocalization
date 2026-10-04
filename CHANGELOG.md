# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.0] - 2026-10-04

Modernization release: the library is now written in TypeScript, builds with
TypeScript 6, ships CommonJS/ESM/type outputs, has a real test suite, and is
aligned with current React Native conventions.

### Added

- **TypeScript source** (`src/index.ts`) with generated, bundled type
  declarations. The hand-written ambient `lib/LocalizedStrings.d.ts` is gone.
- **Test suite** powered by [Vitest](https://vitest.dev/) covering language
  selection, fallback behaviour, `formatString` (including React element
  interpolation), `getContent`/`setContent`, and the missing-native-module
  fallback.
- **Dual build output**: CommonJS (`lib/commonjs`), ESM (`lib/module`) and type
  declarations (`lib/typescript`), wired through a proper `exports` map with
  `react-native`, `import` and `require` conditions.
- `LocalizedStringsOptions` type to forward `logsEnabled`, `pseudo` and
  `pseudoMultipleLanguages` to the underlying `react-localization`.
- Named `getInterfaceLanguage` export.
- `getContent()` is now part of the public types (aligned with
  `localized-strings` 2.x).
- `CHANGELOG.md`.

### Changed

- **`react-localization` dependency** `^1.0.17` → `^2.1.0`
  (`localized-strings` `^2.1.2`).
- **Toolchain upgraded to TypeScript `^6.0.3`** and Vitest `^5.0.3` / Vite
  `^8.3.2`.
- **Peer dependencies** now require React `>=19.0.0` and React Native
  `>=0.73.0` (`react-localization` 2.x requires React 19). React Native Windows
  is still optional.
- `getString()` is typed as `string | null` to match the underlying library.
- The constructor forwards extra options to `react-localization` while always
  injecting the native language provider.
- `getInterfaceLanguage()` no longer throws when the native module is missing:
  it logs the existing configuration error and falls back to `en`, letting the
  library keep working with the default language.
- Build pipeline replaced Babel (`.babelrc`, `babel-cli`,
  `babel-preset-env`) with `tsc`. `lib/` is now generated and git-ignored, and
  is published via the `files` field.
- Android Gradle module modernized: `namespace`, `compileSdk`/`targetSdk` 35,
  `minSdk` 24, Java 17, `react-android` dependency, removed the deprecated
  `createJSModules()` and the unused `styles.xml` theme.
- Android locale lookup uses `Configuration.getLocales()` instead of the
  deprecated `locale` field, and no longer produces a trailing dash for locales
  without a region.
- iOS podspec modernized: `install_modules_dependencies` (with `React-Core`
  fallback), deployment targets raised to iOS/tvOS 13 and macOS 10.15,
  `requires_arc` enabled.
- README updated for autolinking, current installation steps and the new
  TypeScript setup.

### Fixed

- Type declarations for `formatString` and the generic `LocalizedStrings<T>`
  instance are now generated from the source and stay in sync with the runtime.
- Missing translations keep falling back to the default language with the
  expected warning.
- `require('react-native-localization')` resolves to the CommonJS build through
  the `exports` map.

### Removed

- `babel-cli` / `babel-preset-env` dev dependencies and `.babelrc`.
- The committed build artifacts (`lib/`) and IDE/build files
  (`android/.idea`, `android/.gradle`, `android/local.properties`).
- `.npmignore` (replaced by the `files` field in `package.json`).

### Notes

- The native modules remain legacy modules and keep working on the New
  Architecture through React Native's interop layer. No codegen/TurboModule
  migration is required.
- Building the library requires Node.js `>= 20.19.0`.

[3.0.0]: https://github.com/stefalda/ReactNativeLocalization/compare/v2.3.2...v3.0.0
