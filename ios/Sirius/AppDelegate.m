/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
@import Firebase;
#import "AppDelegate.h"
#import <React/RCTLinkingManager.h>
#import <ComScore/ComScore.h>
#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "ParselyTracker.h"
#import <EXScreenOrientation/EXScreenOrientationViewController.h>
#import <UMCore/UMModuleRegistry.h>
#import <UMReactNativeAdapter/UMNativeModulesProxy.h>
#import <UMReactNativeAdapter/UMModuleRegistryAdapter.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleRegistryAdapter = [[UMModuleRegistryAdapter alloc] initWithModuleRegistryProvider:[[UMModuleRegistryProvider alloc] init]];
  SCORPublisherConfiguration *myPublisherConfig = [SCORPublisherConfiguration
  publisherConfigurationWithBuilderBlock:^(SCORPublisherConfigurationBuilder *builder) {
    builder.publisherId = @"3005674"; 
  }];
  [[SCORAnalytics configuration] addClientWithConfiguration:myPublisherConfig];
  [SCORAnalytics configuration].usagePropertiesAutoUpdateMode = SCORUsagePropertiesAutoUpdateModeForegroundOnly;
  [SCORAnalytics configuration].applicationName = @"THESTAR";
  [SCORAnalytics start];

  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"Sirius"
                                            initialProperties:nil];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
  if ([FIRApp defaultApp] == nil) {
      [FIRApp configure];
  }
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController =  [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [ParselyTracker sharedInstanceWithApiKey:@"stage.thestar.com"];
  [self.window makeKeyAndVisible];
  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

- (BOOL)application:(UIApplication *)application
   openURL:(NSURL *)url
   options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  return [RCTLinkingManager application:application openURL:url options:options];
}


@end
