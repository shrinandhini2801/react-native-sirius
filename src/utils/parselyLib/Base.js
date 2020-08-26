/**
 * Implements callback functions needed for tracking
 */
export default class {
  /**
   * This method receives an object containing contextual data
   * that would be required for tracking
   */
  setContext(context) {
    this.context = context;
  }

  /**
   * Called one time upon launch
   */
  onInit(options) {
  }

  /**
   * Called whenever a user views an Article, Section, etc.
   */
  onView(context) {
  }

  /**
   * Called whenever a user views an Article, Section, etc.
   */
  onAction(name, data = {}) {
  }

  /**
   * Called to turn on or off debug mode, which may mean different things to
   * different analytics systems
   */
  onSilence(silent) {
  }

  /**
   * Called whenever a page view origin changes
   */
  setOrigin(origin) {
  }

  /**
 * Called whenever a user signed in
 */
  onSetUser(data = {}) {
  }

  /**
   * Called whenever a user signed out
   */
  onClearUser() {
  }

  /**
   * Called whenever a user signed in
   */
  onSetEntitlement(data = {}) {
  }

  /**
   * Called whenever a user signed out
   */
  onClearEntitlement() {
  }

  /**
   * Called whenever a user views a non article (Subscription, Sign In) page
   */
  onNonArticleView(name, data = {}) {
  }

  /**
   * Called whenever a user views a non article (Subscription, Sign In) page
   */
  onNonArticleAction(name, data = {}) {
  }
}
