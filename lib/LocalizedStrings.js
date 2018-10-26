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

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactNative = require("react-native");

var _reactLocalization = require("react-localization");

var _reactLocalization2 = _interopRequireDefault(_reactLocalization);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Import the native module
 */
var localization = _reactNative.NativeModules.ReactLocalization;
/**
 * Check if the native module has been correctly initialized
 */
if (!localization) {
  console.error("Something went wrong initializing the native ReactNativeLocalization module.\nPlease check your configuration.\nDid you run 'react-native link'?");
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

var LocalizedStrings = function (_LocalizedStringsCore) {
  _inherits(LocalizedStrings, _LocalizedStringsCore);

  function LocalizedStrings(props) {
    _classCallCheck(this, LocalizedStrings);

    return _possibleConstructorReturn(this, (LocalizedStrings.__proto__ || Object.getPrototypeOf(LocalizedStrings)).call(this, props, { customLanguageInterface: getInterfaceLanguage }));
  }

  return LocalizedStrings;
}(_reactLocalization2.default);

exports.default = LocalizedStrings;