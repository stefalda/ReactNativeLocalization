declare module 'react-native-localization' {

    namespace ReactNativeLocalization {
        //
        // Use this interface for casting the LocalizedString class in order to call
        // one of the supported APIs. For example:
        //
        // var strings = LocalizedStrings({ "en": { "Hello": "Hello" }})
        //
        //  (strings as LocalizationApi).getLanguage()
        //
        export interface LocalizationStringsApi {
            getLanguage(): string;

            setLanguage(language: string): void;

            getInterfaceLanguage(): string;

            getAvailableLanguages(): string[];

            formatString(str: string, ...values: string[]): string;

            getString(key: string, language: string): string;
        }

        // Define input strings:
        //
        //  for example:
        //
        //  import LocalizedStrings, {LocalizationStringsApi, GlobalStrings> from 'react-native-localization'
        //
        //  interface MyStrings {
        //      hello: string;
        //      world: string;
        //  }
        //
        //  The strings in English and french
        //
        //  const myGlobalStrings: GlobalStrings<MyStrings> {
        //      "en": {
        //          hello: "Hello",
        //          world: "World"
        //      },
        //      "fr": {
        //          hello: "Bonjour",
        //          world: "le monde"
        //      }
        //
        interface GlobalStrings<T> {
            [language: string]: T;
        }

        // To get a localized version
        //
        // export default new LocalizedStrings(myGlobalStrings) as any as LocalizationStringsApi & MyStrings
        //
        // The reason for the above kludge is the fact that the exported strings is a type that is both
        // my strings in adition to the functions exposed by the localizedStrings class
        //
        export default class LocalizedStrings<T>  {
            constructor(globalStrings: GlobalStrings<T>);

            [key: string]: any;
        }
    }

    export = ReactNativeLocalization;
}
