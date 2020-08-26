package com.sirius;

import android.webkit.WebView;
import android.webkit.WebChromeClient;
import android.view.ViewGroup.LayoutParams;
import android.webkit.GeolocationPermissions;
import android.os.Build;
import android.view.MotionEvent;
import android.webkit.WebViewClient;
import android.graphics.Bitmap;
import androidx.annotation.Nullable;

import com.facebook.common.logging.FLog;
import com.facebook.react.uimanager.ThemedReactContext;
import com.reactnativecommunity.webview.RNCWebViewManager;
import com.reactnativecommunity.webview.WebViewConfig;
import com.facebook.react.common.build.ReactBuildConfig;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.reactnativecommunity.webview.events.TopMessageEvent;
import com.facebook.react.uimanager.events.EventDispatcher;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.uimanager.UIManagerModule;
import com.facebook.react.uimanager.events.Event;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.common.MapBuilder;

import java.util.Map;

public class WebViewManager extends RNCWebViewManager {

  private WebViewConfig mWebViewConfigOverride;

  private void debugLog(String message) {
    FLog.i("WebViewManager", message);
  }

  @Override
    protected void addEventEmitters(ThemedReactContext reactContext, WebView view) {
  }

  @Override
  public String getName() {
    return "WebView";
  }

  public WebViewManager() {
    mWebViewConfigOverride = new WebViewConfig() {
      public void configWebView(WebView webView) {
      }
    };
  }

  public WebViewManager(WebViewConfig webViewConfig) {
    mWebViewConfigOverride = webViewConfig;
  }

  protected static class ReactWebViewOverride extends RNCWebView {
    private boolean nestedScrolling = false;
    private String baseUrl = null;

    public void setNestedScrolling(boolean enabled) {
      nestedScrolling = enabled;
    }

    public void setBaseUrl(String url) {
      baseUrl = url;
    }

    public String getBaseUrl() {
      return baseUrl;
    }

    public ReactWebViewOverride(ThemedReactContext reactContext) {
      super(reactContext);
    }

    @Override
    public boolean onTouchEvent(MotionEvent event){
      if (nestedScrolling) {
        requestDisallowInterceptTouchEvent(true);
      }

      return super.onTouchEvent(event);
    }
  }

  @Override
  protected WebView createViewInstance(ThemedReactContext reactContext) {
    final ReactWebViewOverride webView = new ReactWebViewOverride(reactContext);
    final RCTEventEmitter eventEmitter = reactContext.getJSModule(RCTEventEmitter.class);

    // Setting the WebChromeClient allows to use Javascript dialog, website,
    // website title, icons etc. within the WebView
    webView.setWebChromeClient(new WebChromeClient() {
      @Override
      public void onGeolocationPermissionsShowPrompt(String origin, GeolocationPermissions.Callback callback) {
        callback.invoke(origin, true, false);
      }
    });

    // Setting the ReactWebViewClient allows to override the shouldOverrideUrlLoading event
    webView.setWebViewClient(new RNCWebViewClient() {
      @Override
      public boolean shouldOverrideUrlLoading(WebView view, String url) {
          String baseUrl = webView.getBaseUrl();

          // If the WebView doesn't have a base url
          if (baseUrl == null) {
            return super.shouldOverrideUrlLoading(view, url);
          // If the url matches the WebView's base url
          } else if (url.startsWith(baseUrl)) {
            return false;
          } else {
            WritableMap reactEvent = Arguments.createMap();
            reactEvent.putString("url", url);
            // Pass the event to RN so it can handle it properly
            eventEmitter.receiveEvent(view.getId(), "onShouldOverrideUrlLoading", reactEvent);
            return true;
          }
      }
    });
    reactContext.addLifecycleEventListener(webView);
    mWebViewConfigOverride.configWebView(webView);
    webView.getSettings().setBuiltInZoomControls(true);
    webView.getSettings().setDisplayZoomControls(false);

    // Fixes broken full-screen modals/galleries due to body height being 0.
    webView.setLayoutParams(
            new LayoutParams(LayoutParams.MATCH_PARENT,
                LayoutParams.MATCH_PARENT));

    if (ReactBuildConfig.DEBUG && Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
      WebView.setWebContentsDebuggingEnabled(true);
    }

    return webView;
  }

  @Override
  @Nullable
  public Map<String, Object> getExportedCustomDirectEventTypeConstants() {
    MapBuilder.Builder<String, Object> builder = MapBuilder.builder();
    builder.put("onShouldOverrideUrlLoading", MapBuilder.of("registrationName", "onShouldOverrideUrlLoading"));
    return builder.build();
  }

  @ReactProp(name = "nestedScrolling")
  public void setNestedScrolling(WebView view, boolean enabled) {
    ((ReactWebViewOverride) view).setNestedScrolling(enabled);
    String value = enabled ? "TRUE" : "FALSE";
    FLog.e("setNestedScrolling", value);
  }

  @ReactProp(name = "baseUrl")
  public void setBaseUrl(WebView view, String url) {
    ((ReactWebViewOverride) view).setBaseUrl(url);
  }
}
