package com.torstar.whitelabel.dev;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

import android.content.Context;

import android.os.Process;

public class UtilityBridge extends ReactContextBaseJavaModule {

    private final Context context;


    @Override
    public String getName() {
        return "UtilityBridge";
    }

    public UtilityBridge(ReactApplicationContext reactContext) {
        super(reactContext);
        this.context = reactContext.getApplicationContext();
    }


    /**
    * [Export] Exit the app
    */
    @ReactMethod
    public void exitApp() {
        android.os.Process.killProcess(android.os.Process.myPid());
        System.exit(0);
    }
}