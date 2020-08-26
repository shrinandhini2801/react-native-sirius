package com.sirius;

import com.parsely.parselyandroid.*;
import com.facebook.common.logging.FLog;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Map;

public class ParselyBridge extends ReactContextBaseJavaModule
{
  @Override
  public String getName() {
    return "ParselyBridge";
  }

  public ParselyBridge(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  private void debugLog(String message) {
    FLog.e("ParselyBridge", message);
  }

  /**
   * [Export] trackUrl: Register a pageview event with Parsely
   */
  @ReactMethod
  public void trackUrl(String url) {
    ParselyTracker instance = ParselyTracker.sharedInstance();
    if (instance != null) {
      instance.trackUrl(url);
    }
  }
}
