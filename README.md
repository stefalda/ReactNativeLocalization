# ReactNativeLocalization

Class to localize the ReactNative interface

###What
I just needed a dead simple way to internationalize my first React Native app.

At the beginning I thought I'd expose the native iOS internationalization API (NSLocalizedString macro) to Native Script, but then I've opted for a solution that seems, at least to me, more in the spirit of React (and I hope better performance wise).

In this implementation we can keep the localized strings in the same file of the React View in a similar way of how Styles are implemented (I don't deny that this approach could lead to some duplications in the translated strings, but it could be feasable to create a commonjs module to use as common source of the strings, requiring it in the different views).

###How it works
  The Javascript library uses a native library (ReactLocalization) to get the current interface language,
  then it loads and displays the strings matching the current interface locale or the default language (the first one if a match is not found) if a specific localization can't be found.

  It's possible to force a language different from the interface one.

###Installation
  1. `npm install react-native-localization`
  2. In the XCode's "Project navigator", right click on project's name ➜ `Add Files to <...>`
  3. Go to `node_modules` ➜ `react-native-localization` and add
      * ReactLocalization.h
      * ReactLocalization.m
  4. Build and run

###How to use:

  1. in the React class that you want to localize require the library and define
     the strings object passing to the constructor a simple object containing
     a language key (i.e. en, it, fr..) and then a list of key-value pairs with
     the needed localized strings

 ```javascript
 var LocalizedStrings = require('./node_modules/react-native-localization/LocalizedStrings');
;

 var strings = new  LocalizedStrings({
    en:{
      how:"How do you want your egg today?",
      boiledEgg:"Boiled egg",
      softBoiledEgg:"Soft-boiled egg",
      choice:"How to choose the egg"
    },
    it:{
      how:"Come vuoi il tuo uovo oggi?",
      boiledEgg:"Uovo sodo",
      softBoiledEgg:"Uovo alla coque",
      choice:"Come scegliere l'uovo"
    }
 });
 ```

  2. Use the strings object directly in the render method accessing the key
     of the localized string

  ```javascript
  <Text style={styles.title}>
    {strings.how}
  </Text>
  ```

###Other methods

* setLanguage(languageCode) - to force manually a particular language
* getLanguage() - to get the current displayed language
* getInterfaceLanguage() - to get the current device interface language

###Other examples
To force a particular language use something like this:
```javascript
  _onSetLanguageToItalian(){
    strings.setLanguage('it');
    this.setState({});
  }
```

## Questions or suggestions?
Feel free to contact me in [twitter](https://twitter.com/talpaz) or [create an issue](https://github.com/stefalda/ReactNativeLocalization/issues/new)
