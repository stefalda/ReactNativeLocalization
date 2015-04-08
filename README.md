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
  
  1) include the ReactLocalocalization.m and ReactLocalocalization.h in your
     XCode project
  
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
  
  3) In the constructor method call the load() function of the strings object
     with a callback to be called whenever the current language has been
     returned by the OS (if this method wasn't asynchronous we could avoid the
     callback and just do everything in the constructor)

```javascript
 constructor(props) {
   super(props);
   strings.load().then(()=>{
    this.setState();
    console.log("Strings loaded");
  });
}
```
 
  4) Use the strings object directly in the render method accessing the key
     of the localized string

```javascript
<Text style={styles.title}>
  {strings.how}
</Text>
```

###Improvements
I'd really have preferred to avoid the call to the load() method with the callback but the native method call wasn't resolved at initialization time, so I had to find a way to intercept the moment when the interface language value is available and force a rendering of the view.


This is a draft of how the library should work.

Every suggestion is welcomed.

