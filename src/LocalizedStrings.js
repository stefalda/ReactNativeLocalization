/**
 * Class to localize the ReactNative interface
 *
 * Originally developed by Stefano Falda (stefano.falda@gmail.com)
 *
 * It uses a native library (ReactLocalization) to get the current interface language,
 * then display the correct language strings or the default language (the first
 * one if a match is not found).
 *
 * How to use:
 * Check the instructions at:
 * https://github.com/stefalda/ReactNativeLocalization
 */
"use strict";
import { NativeModules } from "react-native";
import LocalizedStringsCore from "react-localization";
/**
 * Import the native module
 */
const localization = NativeModules.ReactLocalization;
/**
 * Check if the native module has been correctly initialized
 */
if (!localization) {
  console.error(
    "Something went wrong initializing the native ReactNativeLocalization module.\nPlease check your configuration.\nDid you run 'react-native link'?"
  );
}

/**
 * Custom Interface Language method returned by native code
 */
function getInterfaceLanguage() {
  return localization.language.replace(/_/g, "-");
}

/**
 * Extend the react-localization class overriding the getInterfaceLanguage method
 * to use the native module
 */
export default class LocalizedStrings extends LocalizedStringsCore {
  constructor(props) {
    super(props, { customLanguageInterface: getInterfaceLanguage });
  }
}
