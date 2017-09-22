export type NamedLocalization<L> = { [P in keyof L]: string }

export type Localizations<L extends NamedLocalization<L>> = {
  [langKey: string]: L
}
type LocalizedStringsMethods = {
  //Can be used from ouside the class to force a particular language
  //indipendently from the interface one
  setLanguage(language: string): void
  //The current language displayed (could differ from the interface language
  // if it has been forced manually and a matching translation has been found)
  getLanguage(): string
  //The current interface language (could differ from the language displayed)
  getInterfaceLanguage(): string
  //Return an array containing the available languages passed as props in the constructor
  getAvailableLanguages(): string[]
  //Format the passed string replacing the numbered placeholders
  //i.e. I'd like some {0} and {1}, or just {0}
  //Use example:
  //  strings.formatString(strings.question, strings.bread, strings.butter)
  formatString(str: string, ...values: any[]): string
  //Return a string with the passed key in a different language
  getString(key: string, language: string): string | null
}

interface LocalizedStringsFactory {
  new <L extends NamedLocalization<L>>(localizations: Localizations<L>): L &
    LocalizedStringsMethods
}

//
//  const strings = LocalizedStrings({
//      "en": {
//          hello: "Hello",
//          world: "World"
//      },
//      "fr": {
//          hello: "Bonjour",
//          world: "le monde"
//      }
//  })
//
// strings.getLanguage() // en
// strings.hello // "Hello"
// strings.world // "World"
// strings.setLanguage('fr')
// strings.hello // "Bonjour"
// strings.world // "le monde"
//
declare const LocalizedStrings: LocalizedStringsFactory

export default LocalizedStrings
