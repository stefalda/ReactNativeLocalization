declare class LocalizedStrings {
  // Indexer
  [key: string]: string | ( (...args: any[]) => any );

  constructor(props: { [language: string]: { [key: string]: string }});
  getLanguage(): string;
  setLanguage(language: string): void;
  getInterfaceLanguage(): string;
  getAvailableLanguages(): string[];
  formatString(str: string, ...values: string[]): string;
  getString(key: string, language: string): string;
}

declare module 'react-native-localization' {
	export = LocalizedStrings;
}

