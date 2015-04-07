//
//  ReactLocalization.h
//  OvoSodo
//
//  Created by Stefano Falda on 05/04/15.
//  Copyright (c) 2015 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RCTBridgeModule.h"
#import "RCTLog.h"
@interface ReactLocalization : NSObject<RCTBridgeModule>
    -(void)getLlocalizedString:(NSString *)key forCallback:(RCTResponseSenderBlock)callback;
    -(void)getLanguage:(RCTResponseSenderBlock)callback;
@end
