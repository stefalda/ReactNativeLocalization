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
    //if the string is multiple tags, try to match without the final tag
    //(en-US --> en, zh-Hans-CN --> zh-Hans)
    let idx = language.lastIndexOf("-");
    if (idx>=0) {
      language = language.substring(0,idx);
      return this._getBestMatchingLanguage(language, props)
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

  //Return an array containing the available languages passed as props in the constructor
  getAvailableLanguages(){
    if (!this.availableLanguages){
      this.availableLanguages = [];
      for(let language in this.props){
         this.availableLanguages.push(language);
      }
    }
    return this.availableLanguages;
  }

  //Format the passed string replacing the numbered placeholders
  //i.e. I'd like some {0} and {1}, or just {0}
  //Use example:
  //  strings.formatString(strings.question, strings.bread, strings.butter)
  formatString(str, ...values){
      var res = str;
      for (let i=0; i<values.length;i++){
          res = this._replaceAll("{"+i+"}", values[i], res);
      }
      return res;
  }

  //Replace all occorrencies of a string in another using RegExp
  _replaceAll(find, replace, str) {
    //Escape find
    find = find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    return str.replace(new RegExp(find, 'g'), replace);
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
