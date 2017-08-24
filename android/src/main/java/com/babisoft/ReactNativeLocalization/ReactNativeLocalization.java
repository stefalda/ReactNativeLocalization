package com.babisoft.ReactNativeLocalization;

import android.content.Context;
import android.content.SharedPreferences;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

/**
 * Created by stefano on 20/09/15.
 */
public class ReactNativeLocalization extends ReactContextBaseJavaModule {

    /**
     * Name of the exported variable
     */
    private static final String LANGUAGE = "language";

    public ReactNativeLocalization(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "ReactLocalization";
    }

    /**
     * Return the current language
     *
     * @return
     */
    private String getCurrentLanguage() {

        // user locale takes precedence
        String userLocale = this.getUserLocale();
        if (userLocale != null) {
            return userLocale;
        }
        
        Locale current = getReactApplicationContext().getResources().getConfiguration().locale;
        return current.getLanguage() + "-" + current.getCountry();
    }


    public String getUserLocale() {
        return getPreferences().getString("locale_override", null);
    }

    
    /**
     * Export to Javascript the variable language containing the current language
     *
     * @return
     */
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(LANGUAGE, getCurrentLanguage());
        return constants;
    }

    /**
     * Export a method callable from javascript that returns the current language
     *
     * @param callback
     */
    @ReactMethod
    public void getLanguage(Callback callback) {
        String language = getCurrentLanguage();
        System.out.println("The current language is " + language);
        callback.invoke(null, language);
    }

    /**
     * SharedPreferences
     */
    private SharedPreferences getPreferences() {
        return getReactApplicationContext().getSharedPreferences("react-native", Context.MODE_PRIVATE);
    }
    private SharedPreferences.Editor getEditor() {
        return getPreferences().edit();
    }
}
