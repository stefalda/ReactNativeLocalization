# ReactNativeLocalization

Class to localize the ReactNative interface.

Use [react-localization](https://github.com/stefalda/react-localization) if you want to share code with a React project or the [localized-strings](https://github.com/stefalda/localized-strings) for a generic javascript solution.

### Note about version 1.x
 This library has been refactored to use the newly created [localized-strings package](https://github.com/stefalda/localized-strings), now added as a dependency, so to unify the code and make it easier to mantain

 All the basic code is now in the localized-strings project and in the react-localization version that adds support for embedding JSX code in the formatted strings, by overriding the formatString method.

 This version adds a custom version of the `getInterfaceLanguage` to retrieve the interface language from the native OS.
 
 **To simplify Android versions' configuration, versions 2.0 and up are compatible only with ReactNative >= 0.56.0**

## What it does

I just needed a dead simple way to internationalize my first React Native app.

At the beginning I thought I'd expose the native iOS internationalization API (NSLocalizedString macro) to React Native, but then I've opted for a solution that seems, at least to me, more in the spirit of React (and I hope better performance wise).

In this implementation we can keep the localized strings in the same file of the React View in a similar way of how Styles are implemented (I don't deny that this approach could lead to some duplications in the translated strings, but it could be feasible to create a CommonJS module to use as common source of the strings, requiring it in the different views).


**Beware *Expo* created apps need to be ejected before integrating native plugins like this one.**
**So if you've used the Create React Native app shortcut you should eject the app as detailed here here.**

## How it works

The Javascript library uses a native library (ReactLocalization) to get the current interface language, then it loads and displays the strings matching the current interface locale or the default language (the first one if a match is not found) if a specific localization can't be found.

It's possible to force a language different from the interface one.

## Installation
The easiest way to install is to type just 2 commands inside your react-native project folder and you are ready to go: 

```
npm install react-native-localization --save
react-native link react-native-localization
```

Don´t forget to restart the app / node server or you will see an error.

If you're installing for Android and still experiencing problems check if 
step 4 of "Manual installation Android" has been automatically executed by the linker.

Windows platform doesn't support automatic installation by linker. Only manual installation is supported.

### Manual installation iOS

1. `npm install --save react-native-localization`
2. In the XCode's "Project navigator", right click on Libraries folder under your project ➜ `Add Files to <...>`
3. Go to `node_modules` ➜ `react-native-localization` and add the `ReactNativeLocalization.xcodeproj` file
4. Add libReactNativeLocalization.a to Build Phases -> Link Binary With Libraries
5. Build and run

### Manual installation Android
1. `npm install --save react-native-localization`
2. In `android/setting.gradle`

    ```gradle
    ...
    include ':react-native-localization', ':app'
    project(':react-native-localization').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-localization/android')
    ```

3. In `android/app/build.gradle`

    ```gradle
    ...
    dependencies {
        ...
        compile project(':react-native-localization')
    }
    ```

4. register module (in MainApplication.java)

    ```java
    import com.babisoft.ReactNativeLocalization.ReactNativeLocalizationPackage; // <--- import
    
    public class MainApplication extends Application implements ReactApplication {
      ......
        @Override
        protected List<ReactPackage> getPackages() {
          return Arrays.<ReactPackage>asList(
              new MainReactPackage(),
              new ReactNativeLocalizationPackage()
          );
        }
      ......
    }
    ```

(Thanks to @rebeccahughes for showing by example how to create an android module for React Native)

### Manual installation windows

Full process is documented in official [React Native plugin for Universal Windows](https://github.com/Microsoft/react-native-windows/blob/master/docs/LinkingLibrariesWindows.md) repo: https://github.com/Microsoft/react-native-windows/blob/master/docs/LinkingLibrariesWindows.md

1. Run `npm install --save react-native-localization`
2. Open your Visual Studio solution.
3. Right-click the solution in the Solution Explorer
4. Select Add -> Existing Project
5. Choose the `.csproj` of the dependency from the Explorer window. Dependency will be in `node_modules\react-native-localization\windows\ReactNativeLocalization`
6. Right-click the Universal Windows App project in the Solution Explorer
7. Select Add -> Reference
8. Choose the `ReactNativeLocalization` project.
9. Open MainPage.cs
10. Add the `new ReactNativeLocalization.RNLocalizationPackage()` to the `Packages` list in MainPage.cs

## Usage

In the React class that you want to localize require the library and define the strings object passing to the constructor a simple object containing a language key (i.e. en, it, fr..) and then a list of key-value pairs with the needed localized strings.

 ```js
// ES6 module syntax
import LocalizedStrings from 'react-native-localization';

// CommonJS syntax
// let LocalizedStrings  = require ('react-native-localization');

let strings = new LocalizedStrings({
  "en-US":{
    how:"How do you want your egg today?",
    boiledEgg:"Boiled egg",
    softBoiledEgg:"Soft-boiled egg",
    choice:"How to choose the egg"
  },
  en:{
    how:"How do you want your egg today?",
    boiledEgg:"Boiled egg",
    softBoiledEgg:"Soft-boiled egg",
    choice:"How to choose the egg"
  },
  it: {
    how:"Come vuoi il tuo uovo oggi?",
    boiledEgg:"Uovo sodo",
    softBoiledEgg:"Uovo alla coque",
    choice:"Come scegliere l'uovo"
  }
});
```

Then use the `strings` object literal directly in the render method accessing the key of the localized string.

```js
<Text style={styles.title}>
  {strings.how}
</Text>
```

The first language is considered the default one, so if a translation is missing for the selected language, the default one is shown and a line is written to the log as a reminder.

#### Update / Overwrite Locale

You might have default localized in the build but then download the latest localization strings from a server. Use setContent to overwrite the whole object. **NOTE** that this will remove all other localizations if used.

```js
strings.setContent({
  en:{
    how:"How do you want your egg todajsie?",
    boiledEgg:"Boiled eggsie",
    softBoiledEgg:"Soft-boiled egg",
    choice:"How to choose the egg"
  }
})
```

You can also only overwrite a specific language using

```js
strings.setContent(Object.assign({},strings.getLocaleObject(),
{
  en:{
    how:"How do you want your egg todajsie?",
    boiledEgg:"Boiled eggsie",
    softBoiledEgg:"Soft-boiled egg",
    choice:"How to choose the egg"
  }
}));
```

## Typescript
For TypeScript, your `tsconfig.json` should be something like this:
```json
{
    "compilerOptions": {
        "target": "es2015",
        "module": "es2015",
        "jsx": "react-native",
        "moduleResolution": "node",
        "allowSyntheticDefaultImports": true
    }
}
```

Where `"module": "es2015"` is the most important setting for being able to import the module properly.

Import should be done like this:

```ts
import LocalizedString from "react-native-localization";
```

## API

* setLanguage(languageCode) - to force manually a particular language
* getLanguage() - to get the current displayed language
* getInterfaceLanguage() - to get the current device interface language
* formatString() - to format the passed string replacing its placeholders with the other arguments strings

```js
  en:{
    bread:"bread",
    butter:"butter",
    question:"I'd like {0} and {1}, or just {0}"
  }
  ...
  strings.formatString(strings.question, strings.bread, strings.butter)
```
**Beware: do not define a string key as `formatString` or `language`!**
* getAvailableLanguages() - to get an array of the languages passed in the constructor

## Examples
To force a particular language use something like this:

```js
_onSetLanguageToItalian() {
  strings.setLanguage('it');
  this.setState({});
}
```

It's also possible to set the language directly in your Xcode project using the following code snippet:

```objective-c
[[NSUserDefaults standardUserDefaults] setObject:[NSArray arrayWithObjects:@"de", nil] forKey:@"AppleLanguages"];
```

Replace `de` with a [supported locale identifier](https://gist.github.com/pjc-is/49971b36db38fdeae6fc) to test.

Check out the [WIKI page](https://github.com/stefalda/ReactNativeLocalization/wiki) for additional informations.

## Questions or suggestions?
Feel free to contact me on [Twitter](https://twitter.com/talpaz) or [open an issue](https://github.com/stefalda/ReactNativeLocalization/issues/new).
