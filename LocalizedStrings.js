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
 * 1) include the ReactLocalocalization.m and ReactLocalocalization.h in your
 *    XCode project
 * 2) in the React class that you want to localize require the library and define
 *    the strings object passing to the constructor a simple object containing
 *    a language key (i.e. en, it, fr..) and then a list of key-value pairs with
 *    the needed localized strings
 *
 *    var LocalizedStrings = require('./LocalizedStrings');
 *
 *    var strings = new  LocalizedStrings({
 *       en:{
 *         how:"How do you want your egg today?",
 *         boiledEgg:"Boiled egg",
 *         softBoiledEgg:"Soft-boiled egg",
 *         choice:"How to choose the egg"
 *       },
 *       it:{
 *         how:"Come vuoi il tuo uovo oggi?",
 *         boiledEgg:"Uovo sodo",
 *         softBoiledEgg:"Uovo alla coque",
 *         choice:"Come scegliere l'uovo"
 *       }
 *    });
 * 3) In the constructor method call the load() function of the strings object
 *    with a callback to be called whenever the current language has been
 *    returned by the OS (if this method wasn't asyncronous we could avoid the
 *    callback and just do everything in the constructor)
 *
 *        constructor(props) {
 *          super(props);
 *          strings.load().then(()=>{
 *           this.setState();
 *           console.log("Strings loaded");
 *         });
 *       }
 *
 * 4) Use the strings object directly in the render method accessing the key
 *    of the localized string
 *
 *       <Text style={styles.title}>
 *             {strings.how}
 *       </Text>

 */
'use strict';

var Q = require("q");
var localization = require('NativeModules').ReactLocalization;
var language;


class LocalizedStrings{
  _getLanguage(){
    var deferred = Q.defer();
    localization.getLanguage((error, deviceLanguage)=>{
      var language = deviceLanguage;
      console.log("Language in js:"+language);
      deferred.resolve(language);
    });
    return deferred.promise;
  }

  _getBestMatchingLanguage(language, props){
    //If an object with the passed language key exists return it
    if (props[language]) return language;
    //Return the default language (the first coded)
    return props[0]
  }


  constructor(props) {
    //Get the current language
    //console.log("LocalizedStrings"+JSON.stringify(props));
    this.props = props;
  }


  load(){
      var deferred = Q.defer();
      this._getLanguage().then((language)=>{
        console.log("Language is "+language);
        this.$language = language;
        //Check if exists a translation for the current language or if the default
        //should be used
        var bestLanguage = this._getBestMatchingLanguage(language, this.props);
        //Associate the language object to the this object
        if (this.props[bestLanguage]){
          console.log("There are strings for the language:"+language);
          var localizedStrings = this.props[language];
          for (var key in localizedStrings){
            console.log("Checking property:"+key);
            if (localizedStrings.hasOwnProperty(key)) {
              console.log("Associating property:"+key);
              this[key] = localizedStrings[key];
            }
          }
        }
        //Promise fulfilled
        deferred.resolve();
        //Check if the property what exists in this
        console.log("What = " + this.what);
      });

      return deferred.promise;
    }

}
module.exports = LocalizedStrings;
