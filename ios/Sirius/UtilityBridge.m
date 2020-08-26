#import "UtilityBridge.h"
#import "AppDelegate.h"
#import <UIKit/UIKit.h>

@implementation UtilityBridge

RCT_EXPORT_MODULE();

/**
 * [Export] exitApp
 */
RCT_EXPORT_METHOD(exitApp)
{
    exit(0);
}

@end
