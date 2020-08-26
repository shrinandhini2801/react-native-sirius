import { NativeModules } from 'react-native';
import Base from './Base';

/**
 * Implements localytics tracking
 */
export default class extends Base {
  /**
   * Called whenever a user views an Article, Section, etc.
   */
  onView() {
    if (this.context && this.context.url) {
      NativeModules.ParselyBridge.trackUrl(this.context.url);
    }
  }
  /**
   * Called whenever a user views a non article (Subscription, Sign In) page
   */
  onNonArticleView(name, data = {}) {}

  /**
   * Called whenever a user views a non article (Subscription, Sign In) page
   */
  onNonArticleAction(name, data = {}) {}
}
