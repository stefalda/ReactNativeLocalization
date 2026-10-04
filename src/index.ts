/**
 * Class to localize the React Native interface.
 *
 * Originally developed by Stefano Falda (stefano.falda@gmail.com)
 *
 * It uses a native module (ReactLocalization) to read the current interface
 * language from the OS, then delegates to `react-localization` /
 * `localized-strings` to display the matching language strings, falling back to
 * the default language (the first one) when a better match is not available.
 *
 * How to use:
 * Check the instructions at:
 * https://github.com/stefalda/ReactNativeLocalization
 */
import { NativeModules } from 'react-native';
import LocalizedStringsCore from 'react-localization';
import type {
  GlobalStrings,
  LocalizedStrings as LocalizedStringsInstance,
  LocalizedStringsMethods,
} from 'react-localization';

/**
 * Shape of the constants exported by the native ReactLocalization module.
 */
interface NativeLocalizationModule {
  language?: string;
}

/**
 * Options accepted by `LocalizedStrings`, excluding the language provider which
 * is always supplied by this library.
 */
export interface LocalizedStringsOptions {
  /**
   * Enable or disable the warnings emitted by the underlying library.
   * Defaults to `true`.
   */
  logsEnabled?: boolean;
  /**
   * Expand every string to a pseudo-localized value. Useful to spot
   * untranslated strings during development.
   */
  pseudo?: boolean;
  /**
   * When `pseudo` is enabled, expands the pseudo strings to be longer than the
   * original ones.
   */
  pseudoMultipleLanguages?: boolean;
}

/**
 * The native module is resolved once at import time because it exposes the
 * interface language through a synchronous constant.
 */
const localization = (
  NativeModules as Record<string, NativeLocalizationModule | undefined>
).ReactLocalization;

if (!localization) {
  console.error(
    'Something went wrong initializing the native ReactNativeLocalization module.\n' +
      'Please check your configuration.\n' +
      "Run 'pod install' (iOS) or rebuild the app (Android/Windows) and restart the bundler."
  );
}

/**
 * Return the interface language reported by the native module, normalized to
 * the `en-US` form expected by `react-localization`.
 *
 * Falls back to `en` when the native module is not available so that the
 * library keeps working with the default language instead of throwing.
 */
export function getInterfaceLanguage(): string {
  const language = localization?.language;
  if (!language) {
    return 'en';
  }
  return language.replace(/_/g, '-');
}

/**
 * Base class resolved as an untyped constructor so that the generic factory
 * signature can be re-applied afterwards. This keeps the emitted declaration
 * clean while preserving full generic inference for consumers.
 */
const Base = LocalizedStringsCore as unknown as new (
  props: unknown,
  options?: unknown
) => object;

class LocalizedStringsImpl extends Base {
  constructor(
    props: GlobalStrings<unknown>,
    options?: LocalizedStringsOptions
  ) {
    super(props, {
      ...options,
      customLanguageInterface: getInterfaceLanguage,
    });
  }
}

/**
 * Public constructor type, mirroring the `react-localization` factory while
 * injecting the native interface language provider.
 */
interface LocalizedStringsConstructor {
  new <T>(
    props: GlobalStrings<T>,
    options?: LocalizedStringsOptions
  ): LocalizedStringsInstance<T>;
}

const LocalizedStrings =
  LocalizedStringsImpl as unknown as LocalizedStringsConstructor;

export type {
  GlobalStrings,
  LocalizedStringsInstance as LocalizedStrings,
  LocalizedStringsMethods,
};

export default LocalizedStrings;
