package com.sirius;

import com.facebook.react.ReactActivity;
import com.comscore.*;
import android.os.Bundle;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
import com.parsely.parselyandroid.*;
import android.content.res.Configuration;
import android.content.pm.ActivityInfo;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */

  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegate(this, getMainComponentName()) {
        @Override
        protected ReactRootView createRootView() {
            return new RNGestureHandlerEnabledRootView(MainActivity.this);
        }
    };
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      // ComScore
      PublisherConfiguration myPublisherConfig = new PublisherConfiguration.Builder().publisherId("3005674")
              .build();
      Analytics.getConfiguration().addClient(myPublisherConfig);
      Analytics.getConfiguration().setUsagePropertiesAutoUpdateMode(UsagePropertiesAutoUpdateMode.FOREGROUND_ONLY);
      Analytics.getConfiguration().setApplicationName("*.+");
      Analytics.start(this.getApplicationContext());
      ParselyTracker.sharedInstance("*.+", this);
  }
    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        // Checks the orientation of the screen
        if (newConfig.orientation == Configuration.ORIENTATION_LANDSCAPE) {
            this.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_SENSOR_PORTRAIT);
        }
    }
    /**
     * Called when the activity is about to be destroyed.
     */
    @Override
    protected void onDestroy() {
        ParselyTracker.sharedInstance().flushEventQueue();
        super.onDestroy();
    }

  @Override
  protected String getMainComponentName() {
    return "Sirius";
  }
}
