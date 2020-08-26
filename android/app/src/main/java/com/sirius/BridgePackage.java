package com.sirius;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.facebook.react.bridge.JavaScriptModule;
import com.sirius.WebViewManager;

import java.util.Collections;
import java.util.List;
import java.util.ArrayList;

class BridgePackage implements ReactPackage {
    public static ReactApplicationContext reactContext;

    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        List<ViewManager> managers = new ArrayList<>();
        managers.add(new WebViewManager());
        return managers;
    }

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        BridgePackage.reactContext = reactContext;
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new UtilityBridge(reactContext));
        modules.add(new ParselyBridge(reactContext));
        return modules;
    }
}

