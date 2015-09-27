# ReactNativeLocalization

Class to localize the ReactNative interface

## What it does

I just needed a dead simple way to internationalize my first React Native app.

At the beginning I thought I'd expose the native iOS internationalization API (NSLocalizedString macro) to React Native, but then I've opted for a solution that seems, at least to me, more in the spirit of React (and I hope better performance wise).

In this implementation we can keep the localized strings in the same file of the React View in a similar way of how Styles are implemented (I don't deny that this approach could lead to some duplications in the translated strings, but it could be feasible to create a CommonJS module to use as common source of the strings, requiring it in the different views).

## How it works

The Javascript library uses a native library (ReactLocalization) to get the current interface language, then it loads and displays the strings matching the current interface locale or the default language (the first one if a match is not found) if a specific localization can't be found.

It's possible to force a language different from the interface one.

## Installation iOS

1. `npm install --save react-native-localization`
2. In the XCode's "Project navigator", right click on Libraries folder under your project ➜ `Add Files to <...>`
3. Go to `node_modules` ➜ `react-native-localization` and add the `ReactNativeLocalization.xcodeproj` file
4. Add libReactNativeLocalization.a to Build Phases -> Link Binary With Libraries
5. Build and run

##Installation Android
1. `npm install --save react-native-localization`
2. In `android/setting.gradle`

```gradle
...
include ':ReactNativeLocalization', ':app'
project(':ReactNativeLocalization').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-localization/android')
```

3. In `android/app/build.gradle`

```gradle
...
dependencies {
    ...
    compile project(':ReactNativeLocalization')
}
```

4. register module (in MainActivity.java)

```java
import com.babisoft.ReactNativeLocalization.ReactNativeLocalizationPackage; // <--- import

public class MainActivity extends Activity implements DefaultHardwareBackBtnHandler {
  ......

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    mReactRootView = new ReactRootView(this);

    mReactInstanceManager = ReactInstanceManager.builder()
      .setApplication(getApplication())
      .setBundleAssetName("index.android.bundle")
      .setJSMainModuleName("index.android")
      .addPackage(new MainReactPackage())
      .addPackage(new ReactNativeLocalizationPackage())              // <------ add here
      .setUseDeveloperSupport(BuildConfig.DEBUG)
      .setInitialLifecycleState(LifecycleState.RESUMED)
      .build();

    mReactRootView.startReactApplication(mReactInstanceManager, "ExampleRN", null);

    setContentView(mReactRootView);
  }
  ......
}
```

(Thanks to @rebeccahughes for showing by example how to create an android module for React Native)

## Usage

In the React class that you want to localize require the library and define the strings object passing to the constructor a simple object containing a language key (i.e. en, it, fr..) and then a list of key-value pairs with the needed localized strings.

 ```js
\\ES6 module syntax
import LocalizedStrings from 'react-native-localization';

\\CommonJS syntax
\\let LocalizedStrings  = require ('react-native-localization');

let strings = new LocalizedStrings({
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
**Beware: do not define a string key as formatString!**
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
