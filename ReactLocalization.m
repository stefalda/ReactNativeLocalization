//
// The MIT License (MIT)
//
// Copyright (c) 2015 Stefano Falda (stefano.falda@gmail.com)
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

#import "ReactLocalization.h"
#define SYSTEM_VERSION_GREATER_THAN_OR_EQUAL_TO(v) ([[[UIDevice currentDevice] systemVersion] compare:v options:NSNumericSearch] != NSOrderedAscending)

@interface ReactLocalization ()
-(NSString*) getCurrentLanguage;
-(NSString*) getUserLocale;
@end

@implementation ReactLocalization
  RCT_EXPORT_MODULE();
/*
 * Private implementation - return the language and the region like 'en-US' if iOS >= 10 otherwise just the language
 */
-(NSString*) getCurrentLanguage{
    // User settings take precedence
    NSString* userLocale = [self getUserLocale];
    if (userLocale) {
        return userLocale;
    }

    // Device locale
    if (SYSTEM_VERSION_GREATER_THAN_OR_EQUAL_TO(@"10")) {
        NSLocale* currentLocale = [NSLocale currentLocale];
        return [NSString stringWithFormat:@"%@-%@", currentLocale.languageCode, currentLocale.countryCode];
    }
    return [[NSLocale preferredLanguages] objectAtIndex:0];
}

-(NSString*) getUserLocale {
    NSArray* locales = [[NSUserDefaults standardUserDefaults] objectForKey:@"AppleLanguages"];
    if (locales == nil ) { return nil; }
    if ([locales count] == 0) { return nil; }

    NSString* userLocale = locales[0];
    return userLocale;
} 



/*
 * Method called from javascript with a callback in case of success
 */
RCT_EXPORT_METHOD(getLanguage:(RCTResponseSenderBlock)callback){
    NSString * language =  [self getCurrentLanguage];
    NSLog(@"Language: %@", language);
    callback(@[[NSNull null], language]);
}

/*
 * Expose the language directly to javascript avoiding the callback
 */
- (NSDictionary *)constantsToExport
{
    return @{ @"language": [self getCurrentLanguage]};
}

+(BOOL)requiresMainQueueSetup
{
    return YES;
}
@end
