//
//  ParselyBridge.m
//  Sirius
//
//  Created by Shri Nandhini on 2020-03-31.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import "ParselyBridge.h"
#import "ParselyTracker.h"

@implementation ParselyBridge

RCT_EXPORT_MODULE();

/**
 * [Export] trackUrl(url)
 */
RCT_EXPORT_METHOD(trackUrl:(NSString *)url)
{
  dispatch_sync(dispatch_get_main_queue(), ^{
    [[ParselyTracker sharedInstance] trackURL:url];
  });
}

@end
