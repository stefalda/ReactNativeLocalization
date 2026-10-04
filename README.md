# ReactNativeLocalization

Class to localize the React Native interface.

Use [react-localization](https://github.com/stefalda/react-localization) if you want to share code with a React project or [localized-strings](https://github.com/stefalda/localized-strings) for a generic javascript solution.

### Note about version 3.x

Version 3.x modernizes the library and is aligned with the current React Native ecosystem:

- Written in **TypeScript** with bundled type declarations.
- Built on top of **`react-localization` 2.x** / `localized-strings` 2.x.
- Requires **React 19+** (a `react-localization` 2.x requirement) and **React Native 0.73+**.
- Ships CommonJS, ESM and TypeScript builds through a proper `exports` map.
- Works with the New Architecture through the legacy native module interop layer.
- The native modules are resolved automatically via **autolinking**; the legacy `react-native link` step is no longer needed.

See the [CHANGELOG](./CHANGELOG.md) for the full list of changes.

### Note about version 1.x

This library has been refactored to use the [localized-strings package](https://github.com/stefalda/localized-strings), now added as a dependency, so to unify the code and make it easier to maintain.

All the basic code is now in the localized-strings project and in the react-localization version that adds support for embedding JSX code in the formatted strings, by overriding the `formatString` method.

This version adds a custom version of the `getInterfaceLanguage` to retrieve the interface language from the native OS.

## What it does

I just needed a dead simple way to internationalize my first React Native app.

At the beginning I thought I'd expose the native iOS internationalization API (NSLocalizedString macro) to React Native, but then I've opted for a solution that seems, at least to me, more in the spirit of React (and I hope better performance wise).

In this implementation we can keep the localized strings in the same file of the React View in a similar way of how Styles are implemented (I don't deny that this approach could lead to some duplications in the translated strings, but it could be feasible to create a CommonJS module to use as common source of the strings, requiring it in the different views).

**Beware: Expo Go / managed Expo apps need a development build (or need to be ejected) before integrating native modules like this one.**

## How it works

The Javascript library uses a native module (ReactLocalization) to get the current interface language, then it loads and displays the strings matching the current interface locale or the default language (the first one if a match is not found) if a specific localization can't be found.

It's possible to force a language different from the interface one.

## Requirements

- React Native `>= 0.73.0`
- React `>= 19.0.0`
- iOS `>= 13.0`, Android `minSdkVersion >= 24`
- Node.js `>= 20.19.0` for building the library from source

## Installation

The easiest way to install is to type just a couple of commands inside your React Native project folder:

```sh
yarn add react-native-localization

# or

npm i react-native-localization

# iOS only (React Native >= 0.60 uses autolinking)
cd ios && pod install && cd ..
```

Android and iOS are linked automatically through [autolinking](https://github.com/react-native-community/cli/blob/main/docs/autolinking.md) (React Native >= 0.60). Don't forget to restart the app / bundler after installing.

Windows does not support autolinking, so it requires a manual installation (see below).

### Manual installation iOS

1. `npm install --save react-native-localization`
2. In the XCode's "Project navigator", right click on Libraries folder under your project ➜ `Add Files to <...>`
3. Go to `node_modules` ➜ `react-native-localization` and add the `ReactNativeLocalization.xcodeproj` file
4. Add libReactNativeLocalization.a to Build Phases -> Link Binary With Libraries
5. Build and run

### Manual installation Android

1. `npm install --save react-native-localization`
2. In `android/settings.gradle`

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
        implementation project(':react-native-localization')
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

Full process is documented in the official [React Native plugin for Universal Windows](https://github.com/Microsoft/react-native-windows/blob/master/docs/LinkingLibrariesWindows.md) repo.

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
// const LocalizedStrings = require('react-native-localization').default;

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
strings.setContent(Object.assign({}, strings.getContent(), {
  en:{
    how:"How do you want your egg todajsie?",
    boiledEgg:"Boiled eggsie",
    softBoiledEgg:"Soft-boiled egg",
    choice:"How to choose the egg"
  }
}));
```

## Typescript

Types are bundled with the package, so no extra `@types` package is required. A typical `tsconfig.json` looks like this:

```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "skipLibCheck": true
  }
}
```

Import should be done like this:

```ts
import LocalizedStrings from 'react-native-localization';

const strings = new LocalizedStrings({
  en: { how: "How do you want your egg today?" },
  it: { how: "Come vuoi il tuo uovo oggi?" },
});

// `strings.how` is fully typed
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
* getString(key, language?) - to get a string for a specific language
* getContent() - to get the whole content object (all the languages/strings)
* setContent(content) - to replace the content object without reinstantiating

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
