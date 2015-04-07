//
//  ReactLocalization.m
//  OvoSodo
//
//  Created by Stefano Falda on 05/04/15.
//  Copyright (c) 2015 Facebook. All rights reserved.
//

#import "ReactLocalization.h"

@implementation ReactLocalization

-(void)getLlocalizedString:(NSString *)key forCallback:(RCTResponseSenderBlock)callback{
    RCT_EXPORT(getStringForKey);
    NSString* res = NSLocalizedString(key, key);
    callback(@[[NSNull null], res]);
}

-(void)getLanguage:(RCTResponseSenderBlock)callback{
    RCT_EXPORT();
    NSString * language =  [[NSLocale preferredLanguages] objectAtIndex:0];
    NSLog(@"Language: %@", language);
    callback(@[[NSNull null], language]);
}
@end
