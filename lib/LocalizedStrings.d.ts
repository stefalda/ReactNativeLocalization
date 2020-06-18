declare module 'react-native-localization' {
  type Formatted = number | string | JSX.Element;
  type FormatObject<U extends Formatted> = { [key: string]: U };

  export interface GlobalStrings<T> {
    [language: string]: T;
  }

  export interface LocalizedStringsMethods {
    /**
     * Can be used from outside the class to force a particular language
     * independently from the interface one
     * @param language 
     */
    setLanguage(language: string): void;

    /**
     *  The current language displayed (could differ from the interface language
     *  if it has been forced manually and a matching translation has been found)
     */
    getLanguage(): string;

    /**
     * The current interface language (could differ from the language displayed)
     */
    getInterfaceLanguage(): string;

    /**
     * Format the passed string replacing the numbered placeholders
     * i.e. I'd like some {0} and {1}, or just {0}
     * Use example:
     *   strings.formatString(strings.question, strings.bread, strings.butter)
     */
    formatString<T extends Formatted>(str: string, ...values: Array<T | FormatObject<T>>): Array<string | T> | string;
    
    /**
     * Return an array containing the available languages passed as props in the constructor
     */
    getAvailableLanguages(): string[];
    
    /**
     * Return a string with the passed key in a different language
     * @param key 
     * @param language 
     */
    getString(key: string, language?: string): string;

    
    /**
     * Replace the NamedLocalization object without reinstantiating the object
     * @param props 
     */
    setContent(props: any): void;
  }

  export type LocalizedStrings<T> = LocalizedStringsMethods & T;

  interface LocalizedStringsFactory {
    new <T>(props: GlobalStrings<T>): LocalizedStrings<T>;
  }

  const LocalizedStrings: LocalizedStringsFactory

  export default LocalizedStrings
}
