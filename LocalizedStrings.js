/**
 * Class to localize the ReactNative interface
 *
 * Originally developed by Stefano Falda (stefano.falda@gmail.com)
 *
 * It uses a native library (ReactLocalization) to get the current interface language,
 * then display the correct language strings or the default language (the first
 * one if a match is not found).
 *
 * How to use:
 * Check the instructions at:
 * https://github.com/stefalda/ReactNativeLocalization
 */
'use strict';

var localization = require('react-native').NativeModules.ReactLocalization;
var interfaceLanguage = localization.language;
class LocalizedStrings{

  _getBestMatchingLanguage(language, props){
    //If an object with the passed language key exists return it
    if (props[language]) return language;
    //if the string is composed try to find a match with only the first language identifiers (en-US --> en)
    let idx = language.indexOf("-");
    if (idx>=0) {
      language = language.substring(0,idx);
      if (props[language]) return language;
    }
    //Return the default language (the first coded)
    return Object.keys(props)[0];
  }


  constructor(props) {
    //Store locally the passed strings
    this.props = props;
    //Set language to its default value (the interface)
    this.setLanguage(interfaceLanguage);
  }

  //Can be used from ouside the class to force a particular language
  //indipendently from the interface one
  setLanguage(language){
        //Check if exists a translation for the current language or if the default
        //should be used
        var bestLanguage = this._getBestMatchingLanguage(language, this.props);
        this.language = bestLanguage;
        //Associate the language object to the this object
        if (this.props[bestLanguage]){
          //console.log("There are strings for the language:"+language);
          var localizedStrings = this.props[this.language];
          for (var key in localizedStrings){
            //console.log("Checking property:"+key);
            if (localizedStrings.hasOwnProperty(key)) {
              //console.log("Associating property:"+key);
              this[key] = localizedStrings[key];
            }
          }
        }
    }

  //The current language displayed (could differ from the interface language
  // if it has been forced manually and a matching translation has been found)
  getLanguage(){
    return this.language;
  }

  //The current interface language (could differ from the language displayed)
  getInterfaceLanguage(){
    return interfaceLanguage;
  }

  //Can be used to retrieve the interface language
  //but now it's useless because that value is exposed directly
  //in a dictionary from the ReactLocalization class
  //I leave it as an example but it's now deprecated
  /*
  _getLanguage(){
    var deferred = Q.defer();
    localization.getLanguage((error, deviceLanguage)=>{
      var language = deviceLanguage;
      console.log("Language in js:"+language);
      deferred.resolve(language);
    });
    return deferred.promise;
  }
  */
}
module.exports = LocalizedStrings;
