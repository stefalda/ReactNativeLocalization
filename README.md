# ReactNativeLocalization

Class to localize the ReactNative interface

###Why
I just needed a dead simple way to internationalize my first React Native app.

At the beginning I thought about accessing the native iOS internationalization API (NSLocalizedString macro) but then I've opted for a solution that seems, at least to me, more in the spirit of React (I feared, too, I don't know if rightfully, that avoiding crossing the bridge from Javascript to Objective-C is better, performance wise).

In this way I can keep the strings in the same file of the React View in a similar way of how Styles are implemented

###What
  The Javascript library uses a native library (ReactLocalization) to get the current interface language,
  then it displays the correct language strings or the default language (the first one if a match is not found).

###How to use:

  1) include in your XCode project

  	 * ReactLocalization.h
  	 * ReactLocalization.m

  2) in the React class that you want to localize require the library and define
     the strings object passing to the constructor a simple object containing
     a language key (i.e. en, it, fr..) and then a list of key-value pairs with
     the needed localized strings

 ```javascript
 var LocalizedStrings = require('./LocalizedStrings');

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

  3) Use the strings object directly in the render method accessing the key
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

Every suggestion is welcomed.
