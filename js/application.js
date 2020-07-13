/**
 * @module application
 */

/**
 * @memberof serendipia.modules
 */
window.serendipia.modules.application = (function (global, serendipia) {
  "use strict";

  var model = undefined;
  var functions = {};

  /**
   * Starts the application
   * @function start 
   * @public
   * @param {updateCallback} updateCallback
   */
  functions.start = function (updateCallback) {
    model = new serendipia.observable.Model(updateCallback);
  };

  /**
   * Returns the application state object
   * @function get 
   * @public
   * @returns {Object}
   */
  functions.get = function () {
    return model.get();
  };

  /**
   * Returns the Observable model object of application
   */
  functions.getModel = function() {
      return model;
  }

  /**
   * Sets or Updates the application state object value
   * @function set
   * @public
   * @param {object} data The object that contain a partial or a total part of the state to be hold by the model.
   * @param {serendipia.observable.Subject} notifier
   */
  functions.set = function (data, notifier) {
    model.set(data, notifier);
  };

  return {
    start: functions.start,
    get: functions.get,
    set: functions.set,
    getModel: functions.getModel
  };
})(window, window.serendipia);
