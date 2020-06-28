

/**
 * Serendipia Javascript Language Features Augmenting and Serendipia namespace
 *
 * @author Alex Alvarez Gárciga
 * @param {window} global Context object
 */
(function (global) {
    "use strict";
  
    /**
     * @namespace Serendipia
     */
    var Serendipia = {};
    global.Serendipia = global.Serendipia = Serendipia;
  
    /**
     * Declares new namespaces
     *
     * @function namespace
     * @memberof Serendipia
     * @param {string} nsString
     * @param {Object} root
     */
    Serendipia.namespace = function (nsString, root) {
      var i, len, parent, part, parts;
      parts = nsString.split(".");
      parent = root != null ? root : Serendipia;
      if (parts[0] === "Serendipia") {
        parts = parts.slice(1);
      }
      for (i = 0, len = parts.length; i < len; i++) {
        part = parts[i];
        if (typeof parent[part] === "undefined") {
          parent[part] = {};
        }
        parent = parent[part];
      }
      return parent;
    };
  
    // Javascript Language Features Augmenting
  
    /**
     * By augmenting Function.prototype with a method "method",
     * we no longer have to type the name of the prototype property.
     * That bit of ugliness can now be hidden.
     *
     * @augments Function
     * @param {string} name
     * @param {Function} func
     */
    Function.prototype.method = function (name, func) {
      if (!this.prototype[name]) {
        this.prototype[name] = func;
      }
    };
  
    /**
     * JavaScript lacks a method that removes spaces from the ends of a string.
     *
     * @function trim
     * @augments String
     */
    String.method("trim", function () {
      return this.replace(/^\s+|\s+$/g, "");
    });
  
    /**
     * Adds format method to String objects
     *
     * @function
     * @name format
     *
     * @example
     * // returns "Hello Alex {1}"
     * "Hello {0} {1}".format("Alex");   *
     * @returns {string} Returns the value of the formatted string object
     */
    String.method("format", function () {
      var args = arguments;
      return this.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != "undefined" ? args[number] : match;
      });
    });
  
    /**
     * Adds format function to the native String object
     * to be able to do a c# like string format
     *
     * @function format
     * @augments String
     * @example
     * // return "Hello Alex {1}"
     * String.format("Hello {0} {1}", "Alex")
     * @returns {String} Returns the value of the formatted string object
     */
    String.format = function (format) {
      var args = Array.prototype.slice.call(arguments, 1);
      return format.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != "undefined" ? args[number] : match;
      });
    };
  
    /**
     * Adds compatible Object.entries() support in older environments
     * that do not natively support it
     *
     * @see https://developer.mozilla.org/en-US/docs/web/javascript/reference/global_objects/object/entries
     */
    if (!Object.entries) {
      Object.entries = function (obj) {
        var ownProps = Object.keys(obj),
          i = ownProps.length,
          resArray = new Array(i); // preallocate the Array
        while (i--) resArray[i] = [ownProps[i], obj[ownProps[i]]];
  
        return resArray;
      };
    }
  
    /**
     * Adds compatible Object.keys() support in older environments
     * that do not natively support it
     *
     * @see https://developer.mozilla.org/en-US/docs/web/javascript/reference/global_objects/object/keys
     */
    if (!Object.keys) {
      Object.keys = (function () {
        "use strict";
        var hasOwnProperty = Object.prototype.hasOwnProperty,
          hasDontEnumBug = !{ toString: null }.propertyIsEnumerable("toString"),
          dontEnums = [
            "toString",
            "toLocaleString",
            "valueOf",
            "hasOwnProperty",
            "isPrototypeOf",
            "propertyIsEnumerable",
            "constructor",
          ],
          dontEnumsLength = dontEnums.length;
  
        return function (obj) {
          if (
            typeof obj !== "function" &&
            (typeof obj !== "object" || obj === null)
          ) {
            throw new TypeError("Object.keys called on non-object");
          }
  
          var result = [],
            prop,
            i;
  
          for (prop in obj) {
            if (hasOwnProperty.call(obj, prop)) {
              result.push(prop);
            }
          }
  
          if (hasDontEnumBug) {
            for (i = 0; i < dontEnumsLength; i++) {
              if (hasOwnProperty.call(obj, dontEnums[i])) {
                result.push(dontEnums[i]);
              }
            }
          }
          return result;
        };
      })();
    }
  })(window);
  
  /**
   * Serendipia.js Javascript utility functions
   *
   * @author Alex Alvarez Gárciga
   * @param {window} global Context object
   * @param {Serendipia} Serendipia Serendipia namespace
   */
  (function (global, Serendipia) {
    "use strict";
  
    /**
     * @namespace Serendipia.js
     * @memberof Serendipia
     */
    var js = Serendipia.namespace("js", Serendipia);
  
    /**
     * For each property on object apply the given callback
     *
     * @function foreachPropertyDo
     * @memberof Serendipia.js
     * @param {Object} object
     * @param {Function} callback
     * @returns {undefined}
     * @throws 'Object param must be an object'
     * @throws 'Callback param must be a function'
     */
    js.foreachPropertyDo = function (object, callback) {
      var property, control;
      if (typeof object !== "object") {
        throw "Object param must be an object";
      }
      if (typeof callback === "function") {
        for (property in object) {
          if (object.hasOwnProperty(property)) {
            control = object[property];
            if (typeof control !== "function") {
              callback(control);
            }
          }
        }
      } else {
        throw "Callback param must be a function";
      }
    };
  
    /**
     * The safe way for ask if a value is a number.
     *
     * @function isNumber
     * @memberof Serendipia.js
     * @param {Object} value
     * @returns {Boolean}
     */
    js.isNumber = function (value) {
      return typeof value === "number" && isFinite(value);
    };
  
    /**
     * Check if two objects or arrays are equivalent
     *
     * @function areEquivalent
     * @memberof Serendipia.js
     * @param {Object|Array} value The first object or array to compare
     * @param {Object|Array} other The second object or array to compare
     * @return {boolean} Returns true if they're equal
     */
    js.areEquivalent = function (value, other) {
      // Get the value type
      var type = Object.prototype.toString.call(value);
  
      // If the two objects are not the same type, return false
      if (type !== Object.prototype.toString.call(other)) return false;
  
      // If items are not an object or array, return false
      if (["[object Array]", "[object Object]"].indexOf(type) < 0) return false;
  
      // Compare the length of the length of the two items
      var valueLen =
        type === "[object Array]" ? value.length : Object.keys(value).length;
      var otherLen =
        type === "[object Array]" ? other.length : Object.keys(other).length;
      if (valueLen !== otherLen) return false;
  
      // Compare two items
      var compare = function (item1, item2) {
        // Get the object type
        var itemType = Object.prototype.toString.call(item1);
  
        // If an object or array, compare recursively
        if (["[object Array]", "[object Object]"].indexOf(itemType) >= 0) {
          if (!isEqual(item1, item2)) return false;
        }
        // Otherwise, do a simple comparison
        else {
          // If the two items are not the same type, return false
          if (itemType !== Object.prototype.toString.call(item2)) return false;
  
          // Else if it's a function, convert to a string and compare
          // Otherwise, just compare
          if (itemType === "[object Function]") {
            if (item1.toString() !== item2.toString()) return false;
          } else {
            if (item1 !== item2) return false;
          }
        }
      };
  
      // Compare properties
      if (type === "[object Array]") {
        for (var i = 0; i < valueLen; i++) {
          if (compare(value[i], other[i]) === false) return false;
        }
      } else {
        for (var key in value) {
          if (value.hasOwnProperty(key)) {
            if (compare(value[key], other[key]) === false) return false;
          }
        }
      }
  
      // If nothing failed, return true
      return true;
    };
  
    /**
     * Returns the type of the object
     *
     * @function typeof
     * @memberof Serendipia.js
     * @param {any} obj
     * @returns {function | symbol | object | number | string | array}
     */
    js.typeof = function (obj) {
      var result;
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        result = function result(obj) {
          return typeof obj;
        };
      } else {
        result = function result(obj) {
          return obj &&
            typeof Symbol === "function" &&
            obj.constructor === Symbol &&
            obj !== Symbol.prototype
            ? "symbol"
            : typeof obj;
        };
      }
      return result(obj);
    };
  
    /**
     * Returns the class from who the object is instance of
     *
     * @function instanceof
     * @memberof Serendipia.js
     * @param {any} left
     * @param {any} right
     * @returns {Object} The class
     */
    js.instanceof = function (left, right) {
      if (
        right != null &&
        typeof Symbol !== "undefined" &&
        right[Symbol.hasInstance]
      ) {
        return !!right[Symbol.hasInstance](left);
      } else {
        return left instanceof right;
      }
    };
  
    /**
     *
     *
     * @function setPrototypeOf
     * @memberof Serendipia.js
     * @param {any} o
     * @param {any} p
     */
    js.setPrototypeOf = function (o, p) {
      js.setPrototypeOf =
        Object.setPrototypeOf ||
        function _setPrototypeOf(o, p) {
          o.__proto__ = p;
          return o;
        };
      return js.setPrototypeOf(o, p);
    };
  
    /**
     *
     *
     * @function getPrototypeOf
     * @memberof Serendipia.js
     * @param {any} o
     */
    js.getPrototypeOf = function (o) {
      js.getPrototypeOf = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function _getPrototypeOf(o) {
            return o.__proto__ || Object.getPrototypeOf(o);
          };
      return js.getPrototypeOf(o);
    };
  
    /**
     *
     *
     * @function inherits
     * @memberof Serendipia.js
     * @param {any} subClass
     * @param {any} superClass
     * @throws {TypeError} Super expression must either be null or a function
     */
    js.inherits = function (subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          writable: true,
          configurable: true,
        },
      });
      if (superClass) js.setPrototypeOf(subClass, superClass);
    };
  
    /**
     *
     *
     * @function createSuper
     * @memberof Serendipia.js
     * @param {any} Derived
     */
    js.createSuper = function (Derived) {
      var hasNativeReflectConstruct = js.isNativeReflectConstruct();
      return function () {
        var Super = js.getPrototypeOf(Derived),
          result;
        if (hasNativeReflectConstruct) {
          var NewTarget = js.getPrototypeOf(this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return js.possibleConstructorReturn(this, result);
      };
    };
  
    /**
     *
     *
     * @function possibleConstructorReturn
     * @memberof Serendipia.js
     * @param {any} self
     * @param {any} call
     */
    js.possibleConstructorReturn = function (self, call) {
      if (call && (js.typeof(call) === "object" || typeof call === "function")) {
        return call;
      }
      return js.assertThisInitialized(self);
    };
  
    /**
     *
     * @function assertThisInitialized
     * @memberof Serendipia.js
     * @param {any} self
     * @throws {ReferenceError} This hasn't been initialized - super() hasn't been called.
     */
    js.assertThisInitialized = function (self) {
      if (self === void 0) {
        throw new ReferenceError(
          "This hasn't been initialized - super() hasn't been called"
        );
      }
      return self;
    };
  
    /**
     *
     *
     * @function isNativeReflectConstruct
     * @memberof Serendipia.js
     */
    js.isNativeReflectConstruct = function () {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
        return true;
      } catch (e) {
        return false;
      }
    };
  
    /**
     *
     *
     * @function classCallCheck
     * @memberof Serendipia.js
     * @param {object} instance
     * @param {function} Constructor
     * @throws {TypeError} Cannot call a class as a function
     *
     */
    js.classCallCheck = function (instance, Constructor) {
      if (!js.instanceof(instance, Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    };
  
    /**
     *
     *
     * @function defineProperties
     * @memberof Serendipia.js
     * @param {Object} target
     * @param {Object} props
     */
    js.defineProperties = function (target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    };
  
    /**
     * @function createClass
     * @memberof Serendipia.js
     * @param {any} Constructor
     * @param {any} protoProps
     * @param {any} staticProps
     */
    js.createClass = function (Constructor, protoProps, staticProps) {
      if (protoProps) js.defineProperties(Constructor.prototype, protoProps);
      if (staticProps) js.defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })(window, window.Serendipia);
  
  /**
   * Serendipia.ui
   *
   * @author Alex Alvarez Gárciga
   * @param {window} global
   * @param {Serendipia} Serendipia
   * @param {jQuery} $
   */
  (function (global, Serendipia, $) {
    "use strict";
  
    /**
     * @namespace Serendipia.ui
     * @memberof Serendipia
     */
    var ui = Serendipia.namespace("ui", Serendipia);
  
    /**
     * Returns a function, that, as long as it continues to be invoked, will not be triggered.
     * The function will be called after it stops being called for N milliseconds.
     * If `immediate` is passed, trigger the function on the leading edge, instead of the trailing.
     *
     * The debounce function delays the re processing of the event until
     * the user has stopped the interaction for a predetermined amount of time.
     * This prevents your UI code from needing to process every event and
     * also if an ajax call when triggered, drastically reduces the number of
     * API calls sent to the server.
     *
     * @function debounce
     * @memberof Serendipia.ui
     * @author David Walsh
     * @see https://davidwalsh.name/javascript-debounce-function
     * @param {function} func
     * @param {number} wait
     * @param {boolean} immediate
     */
    ui.debounce = function (func, wait, immediate) {
      var timeout;
  
      // This is the function that is actually executed when
      // the DOM event is triggered.
      return function executedFunction() {
        // Store the context of this and any
        // parameters passed to executedFunction
        var context = this;
        var args = arguments;
  
        // The function to be called after
        // the debounce time has elapsed
        var later = function () {
          // null timeout to indicate the debounce ended
          timeout = null;
  
          // Call function now if you did not on the leading end
          if (!immediate) func.apply(context, args);
        };
  
        // Determine if you should call the function
        // on the leading or trail end
        var callNow = immediate && !timeout;
  
        // This will reset the waiting every function execution.
        // This is the step that prevents the function from
        // being executed because it will never reach the
        // inside of the previous setTimeout
        clearTimeout(timeout);
  
        // Restart the debounce waiting period.
        // setTimeout returns a truthy value (it differs in web vs node)
        timeout = setTimeout(later, wait);
  
        // Call immediately if you're dong a leading
        // end execution
        if (callNow) func.apply(context, args);
      };
    };
  
    /**
     * Instead of delegating by using jquery, we can do event delegation using
     * event capturing with java script document.addEventListener,
     * with the third argument as true.
     *
     * This is useful when the jQuery on() function over an element does not
     * allow a second targeted parameter for event delegation. Like the scroll, load and error events.
     *
     * @function delegateEvent
     * @memberof Serendipia.ui
     * @author Alex Alvarez Gárciga
     * @param {string} eventName
     * @param {string | HTMLElement | jQueryElement} delegator
     * @param {string | HTMLElement | jQueryElement} delegate
     * @param {function()} callback
     */
    ui.delegateEvent = function (eventName, delegator, delegate, callback) {
      var $delegator = $(delegator);
      $delegator.each(function (i, v) {
        var element = $(v).get(i);
        element.addEventListener(
          eventName,
          function (event) {
            if ($(event.target).is(delegate)) {
              callback(event);
            }
          },
          true
        );
      });
    };
  
    /**
     * Event delegation for Load event.
     *
     * @function delegateLoadEvent
     * @memberof Serendipia.ui
     * @author Alex Alvarez Gárciga
     * @param {string | HTMLElement | jQueryElement} delegator
     * @param {string | HTMLElement | jQueryElement} delegate
     * @param {function()} callback
     */
    ui.delegateLoadEvent = function (delegator, delegate, callback) {
      ui.delegateEvent("load", delegator, delegate, callback);
    };
  
    /**
     * Event delegation for Scroll event.
     *
     * @function delegateScrollEvent
     * @memberof Serendipia.ui
     * @author Alex Alvarez Gárciga
     * @param {string | HTMLElement | jQueryElement} delegator
     * @param {string | HTMLElement | jQueryElement} delegate
     * @param {function()} callback
     */
    ui.delegateScrollEvent = function (delegator, delegate, callback) {
      ui.delegateEvent("scroll", delegator, delegate, callback);
    };
  
    /**
     * Event delegation for Error event
     *
     * @function delegateErrorEvent
     * @memberof Serendipia.ui
     * @author Alex Alvarez Gárciga
     * @param {string | HTMLElement | jQueryElement} delegator
     * @param {string | HTMLElement | jQueryElement} delegate
     * @param {function()} callback
     */
    ui.delegateErrorEvent = function (delegator, delegate, callback) {
      ui.delegateEvent("error", delegator, delegate, callback);
    };
  })(window, window.Serendipia, window.jQuery);
  
  /**
   * Serendipia.ui.loading
   *
   * @author Alex Alvarez Gárciga
   * @param {window} global
   * @param {Serendipia} Serendipia
   */
  (function (global, Serendipia) {
    "use strict";
  
    /**
     * @namespace Serendipia.ui.loading
     * @memberof Serendipia.ui
     */
    var loading = Serendipia.namespace("ui.loading", Serendipia);
  
    /**
     * Renders the spinner markup
     */
    function render() {
      var template;
      template = '<div class="sk-spinner sk-spinner-wave">';
      template += '   <div class="sk-rect2"></div>';
      template += '   <div class="sk-rect3"></div>';
      template += '   <div class="sk-rect4"></div>';
      template += '   <div class="sk-rect5"></div>';
      template += "</div>";
      return template;
    }
  
    /**
     *
     * @param {string} selector
     */
    function attach(selector) {
      var $container = $(selector);
      $(selector).prepend(render());
      return $container;
    }
  
    /**
     *
     * @param {string} selector
     */
    function detach(selector) {
      var $container = $(selector);
      $container.children(".sk-spinner.sk-spinner-wave").remove();
      return $container;
    }
  
    /**
     * Toggles the loading indicator on a container by a given selector
     * @param {string} selector
     */
    function toggle(selector) {
      var $container = $(selector);
      if ($container.children(".sk-spinner.sk-spinner-wave").length >= 1) {
        detach(selector);
      } else {
        attach(selector);
      }
      $container.toggleClass("sk-loading");
    }
  
    /**
     * Adds the loading indicator on a container by a given selector
     * @param {any} selector
     */
    function show(selector) {
      attach(selector);
      $(selector).addClass("sk-loading");
    }
  
    /**
     * Removes the loading indicator on a container by a given selector
     * @param {any} selector
     */
    function hide(selector) {
      detach(selector);
      $(selector).removeClass("sk-loading");
    }
  
    /**
     * Toggles the loading indicator on a container by a given selector
     *
     * @function toggle
     * @param {string} selector
     * @memberof Serendipia.ui.loading
     */
    loading.toggle = toggle;
  
    /**
     * Adds the loading indicator on a container by a given selector
     *
     * @function show
     * @param {string} selector
     * @memberof Serendipia.ui.loading
     */
    loading.show = show;
  
    /**
     * Removes the loading indicator on a container by a given selector
     *
     * @function hide
     * @param {string} selector
     * @memberof Serendipia.ui.loading
     */
    loading.hide = hide;
  })(window, window.Serendipia);
  
  /**
   * Serendipia.observable
   *
   * @author Alex Alvarez Gárciga
   * @param {window} global
   * @param {Serendipia} Serendipia
   */
  (function (global, Serendipia) {
    "use strict";
  
    /**
     * @namespace Serendipia.observable
     * @memberof Serendipia
     */
    var observable = Serendipia.namespace("observable", Serendipia);
  
    /**
     * It’s the object that will notify all of the observers that
     * it has changed in some way.
     *
     * @class Subject
     * @memberof Serendipia.observable
     * @author Alex Alvarez Gárciga
     */
    observable.Subject = (function () {
      /**
       * @constructor
       */
      function Subject() {
        Serendipia.js.classCallCheck(this, Subject);
  
        this.observers = [];
      }
  
      /**
       * Adds an observer to observers collection
       *
       * @method addObserver
       * @memberof Serendipia.observable.Subject
       * @param {any} observer
       */
      Subject.prototype.addObserver = function (observer) {
        //Alex: TODO: Observers should have the option to observe a subset of the Subject or the whole Subject. This feature can be implemented by increasing the arity of the addObserver method of the Subject with a new parameter for the list of Subject components that must be observable. Part of the implementation is checking when observers must be notified to receive notifications (only when the subset of the Subject is changed).
        this.observers.push(observer);
      };
      // Alex: not enumerable, not configurable, not writable as defaults
      Object.defineProperty(Subject.prototype, "addObserver", {
        enumerable: false,
        configurable: false,
        writable: false,
      });
  
      /**
       * Removes an observer from observers collection
       *
       * @method removeObserver
       * @memberof Serendipia.observable.Subject
       * @param {any} observer
       */
      Subject.prototype.removeObserver = function (observer) {
        var removeIndex = this.observers.findIndex(function (obs) {
          return observer === obs;
        });
  
        if (removeIndex !== -1) {
          this.observers = this.observers.slice(removeIndex, 1);
        }
      };
      // Alex: not enumerable, not configurable, not writable as defaults
      Object.defineProperty(Subject.prototype, "removeObserver", {
        enumerable: false,
        configurable: false,
        writable: false,
      });
  
      /**
       * Loops over observers collection and calls the update method on each observer.
       *
       * @method notify
       * @memberof Serendipia.observable.Subject
       * @param {any} data
       * @param {Object<Subject>} notifier
       */
      Subject.prototype.notify = function (data, notifier) {
        if (this.observers.length > 0) {
          var self = this;
          this.observers.forEach(function (observer) {
            if (observer !== notifier) {
              return observer.update(self, data);
            }
          });
        }
      };
      // Alex: not enumerable, not configurable, not writable as defaults
      Object.defineProperty(Subject.prototype, "notify", {
        enumerable: false,
        configurable: false,
        writable: false,
      });
  
      /**
       * @method toString
       * @memberof Serendipia.observable.Subject
       */
      Subject.prototype.toString = function () {
        return "[object {0}]".format(this.constructor.name);
      };
  
      return Subject;
    })();
  
    /**
     * Observer
     *
     * @class Observer
     * @memberof Serendipia.observable
     * @param {function} updateCallback
     */
    observable.Observer = (function () {
      function Observer(updateCallback) {
        this.update = updateCallback;
  
        /**
         * @method update
         * @abstract
         * @memberof Serendipia.observable.Observer
         */
        Object.defineProperty(this, "update", {
          enumerable: false,
          configurable: false,
          writable: false,
        });
      }
  
      return Observer;
    })();
  
    /**
     * SubjectObserver
     *
     * @class SubjectObserver
     * @extends Serendipia.observable.Subject
     * @memberof Serendipia.observable
     * @param {function} updateCallback
     */
    observable.SubjectObserver = (function (_Subject) {
      Serendipia.js.inherits(SubjectObserver, _Subject);
      var _super = Serendipia.js.createSuper(SubjectObserver);
  
      function SubjectObserver(updateCallback) {
        var _this;
  
        Serendipia.js.classCallCheck(this, SubjectObserver);
  
        _this = _super.call(this);
        _this.update = updateCallback;
  
        Object.defineProperty(this, "update", {
          enumerable: false,
          configurable: false,
          writable: false,
        });
  
        return _this;
      }
  
      return SubjectObserver;
    })(observable.Subject);
  
    /**
     * Observable model for state view management
     *
     * @class ModelObservable
     * @extends Serendipia.observable.Subject
     * @memberof Serendipia.observable
     */
    observable.ModelObservable = (function (_Subject) {
      Serendipia.js.inherits(ModelObservable, _Subject);
      var _super = Serendipia.js.createSuper(ModelObservable);
  
      function ModelObservable() {
        var _this;
  
        Serendipia.js.classCallCheck(this, ModelObservable);
  
        _this = _super.call(this);
        _this.properties = {};
        return _this;
      }
  
      /**
       * Updates the state object that the model holds
       *
       * @method update
       * @memberof Serendipia.observable.ModelObservable
       * @argument {any} data
       */
      ModelObservable.prototype.update = function () {
        var data =
          arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        this.poperties = Object.assign(this.poperties, data);
        this.notify(this.poperties);
      };
      Object.defineProperty(ModelObservable.prototype, "update", {
        enumerable: true,
        configurable: false,
        writable: true,
      });
  
      /**
       * Returns the state object that the model holds
       *
       * @method get
       * @memberof Serendipia.observable.ModelObservable
       * @returns {Object}
       */
      ModelObservable.prototype.get = function () {
        return this.poperties;
      };
      Object.defineProperty(ModelObservable.prototype, "get", {
        enumerable: false,
        configurable: false,
        writable: false,
      });
  
      return ModelObservable;
    })(observable.Subject);
  
    /**
     * @class Model
     * @memberof Serendipia.observable
     * @extends Serendipia.observable.SubjectObserver
     * @param {*} updateCallback
     */
    observable.Model = (function (_SubjectObserver) {
      Serendipia.js.inherits(Model, _SubjectObserver);
      var _super = Serendipia.js.createSuper(Model);
  
      /**
       * @constructor
       * @param {*} updateCallback
       */
      function Model(updateCallback) {
        var _this;
  
        Serendipia.js.classCallCheck(this, Model);
  
        _this = _super.call(this, updateCallback);
  
        /**
         * @property {object} properties The object that holds the state.
         * @memberof Serendipia.observable.Model
         */
        _this.properties = {};
        return _this;
      }
  
      /**
       * @method set
       * @public
       * @memberof Serendipia.observable.Model
       * @param {object} data The object that containt a partial or a total part of the state to be hold by the model.
       * @param {Serendipia.observable.Subject} notifier
       */
      Model.prototype.set = function (data, notifier) {
        this.properties = Object.assign(this.properties, data);
        this.notify(this.properties, notifier !== undefined ? notifier : this);
      };
      Object.defineProperty(Model.prototype, "set", {
        enumerable: true,
        configurable: false,
        writable: true,
      });
  
      /**
       * @method get
       * @memberof Serendipia.observable.Model
       * @returns {Object}
       */
      Model.prototype.get = function get() {
        return this.properties;
      };
      Object.defineProperty(Model.prototype, "get", {
        enumerable: false,
        configurable: false,
        writable: false,
      });
  
      return Model;
    })(observable.SubjectObserver);
  })(window, window.Serendipia);
  
  /**
   * Serendipia.profiler
   *
   * @author Alex Alvarez Gárciga
   * @param {window} global
   * @param {Serendipia} Serendipia
   */
  (function (global, Serendipia) {
    "use strict";
  
    /**
     * @namespace Serendipia.profiler
     * @memberof Serendipia
     */
    var profiler = Serendipia.namespace("profiler", Serendipia);
    var properties = {};
  
    properties.startTime = undefined;
  
    /**
     * Profiler starts counting
     *
     * @function start
     * @memberof Serendipia.profiler
     */
    profiler.start = function () {
      properties.startTime = global.performance.now();
    };
  
    /**
     * Profiler ends counting
     *
     * @function end
     * @memberof Serendipia.profiler
     * @return {number}
     */
    profiler.end = function () {
      return global.performance.now() - properties.startTime;
    };
    /**
     * Human readable representation of the time the profiler count
     *
     * @function toString
     * @memberof Serendipia.profiler
     * @return {string}
     */
    profiler.toString = function () {
      return "{0}ms".format(Math.round(profiler.end()));
    };
  })(window, window.Serendipia);
  
  /**
   * Serendipia.debug
   *
   * @author Alex Alvarez Gárciga
   * @param {window} global
   * @param {Serendipia} Serendipia
   */
  (function (global, Serendipia) {
    ("use strict");
  
    /**
     *
     * @namespace Serendipia.debug
     * @memberof Serendipia
     */
    var debug = Serendipia.namespace("debug", Serendipia);
    var properties = {};
    var constants = {};
  
    properties.debug = false;
  
    /**
     * @constant
     * @memberof Serendipia.debug
     */
    constants.DEFAULT_MESSAGE_FORMAT =
      "color:{0};font-size:{1}px;background-color:{2};padding:0 7px;font-weight:10";
    /**
     * @constant
     * @memberof Serendipia.debug
     */
    constants.DEFAULT_BACKGROUND_COLOR = "#c9ff00";
    /**
     * @constant
     * @memberof Serendipia.debug
     */
    constants.DEFAULT_FOREGROUND_COLOR = "#0e1318";
    /**
     * @constant
     * @memberof Serendipia.debug
     */
    constants.DEFAULT_FONT_SIZE = 14;
  
    Object.freeze(constants);
  
    /**
     * Sets the debug on verbose mode by a given boolean value
     * 
     * @function setDebug
     * @param {boolean} isDebug
     * @memberof Serendipia.debug 
     */
    debug.setDebug = function (isDebug) {
      properties.debug = isDebug;
    };
  
    /**
     * Prints on the developer's console the message given on the color given
     * 
     * @memberof Serendipia.debug 
     * @param {string} message The message to be printed
     * @param {string} fgColor HEX foreground color code prefixed with #
     * @param {string} bgColor HEX background color code prefixed with #
     */
    debug.log = function (message, fgColor, bgColor) {
      fgColor = fgColor || constants.DEFAULT_FOREGROUND_COLOR;
      bgColor = bgColor || constants.DEFAULT_BACKGROUND_COLOR;
      global.console.log(
        "%c" + message,
        constants.DEFAULT_MESSAGE_FORMAT.format(
          fgColor,
          constants.DEFAULT_FONT_SIZE,
          bgColor
        )
      );
    };
  })(window, window.Serendipia);
  
  /**
   * Serendipia.controls
   * @author Alex Alvarez Gárciga
   * @param {window} global
   * @param {Serendipia} Serendipia
   * @param {jQuery} $
   * @param {moment} moment
   */
  (function (global, Serendipia, $, moment) {
    "use strict";
  
    /**
     * @namespace Serendipia.controls
     * @memberof Serendipia
     */
    var controls = Serendipia.namespace("controls", Serendipia);
  
    /**
     * Control ready for Observable pattern
     * 
     * @class Control
     * @memberof Serendipia.controls
     * @extends Serendipia.observable.SubjectObserver
     * @param {string} id HTMLElement id
     * @param {function()} updateCallback 
     * @param {boolean} overrideChangeEvent Configuration to override the default change event handler
     * 
     * @property {object | number | string} value
     * @property {string} id HTMLElement id
     * @property {string} selector String representation of the id selector
     * @property {HTMLElement} element 
     */
    controls.Control = (function (_SubjectObserver) {
      Serendipia.js.inherits(Control, _SubjectObserver);
      var _super = Serendipia.js.createSuper(Control);
  
      /**
       * Generic Control ready for Observable pattern
       * 
       * @constructor
       * @param {string} id
       * @param {function()} updateCallback
       * @param {boolean} overrideChangeEvent
       */
      function Control(id, updateCallback, overrideChangeEvent) {
        Serendipia.js.classCallCheck(this, Control);
  
        var _this = _super.call(this, updateCallback);
        
        _this.value = undefined;
        _this.id = id;
        _this.selector = "#{0}".format(id);
        _this.element = global.document.getElementById(id);
  
        /**
         * @callback onChangeCallback
         * @memberof Serendipia.controls.Control
         */
        Control.prototype.onChangeCallback = function () {
          _this.setValue(this.value);
        };
  
        if (!overrideChangeEvent) {
          _this.on("change", Control.prototype.onChangeCallback);
        }
  
        return _this;
      }
  
      /**
       * Sets the value of the control and notify all the observers
       * 
       * @method setValue
       * @memberof Serendipia.controls.Control
       * @param {Object} data
       * @param {Serendipia.observable.Subject} notifier
       */
      Control.prototype.setValue = function (data, notifier) {
        var self = this;
  
        function setValue(value) {
          self.value = value;
          self.element.value = value;
        }
  
        if (data === undefined) {
          this.value = undefined; // Alex: TODO: or null?
        } else if (data === null) {
          this.value = null;
        } else if (typeof data === "string") {
          if (data === "") {
            setValue("");
          }
          setValue(data);
        } else if (typeof data === "number") {
          setValue(data);
        } else {
          this.value = Object.assign(this.value, data);
        }
  
        // Alex: first logic overrided for upper logic
        //if (typeof data === "string" || typeof data === "number") {
        //    this.value = data;
        //    this.element.value = this.value;
        //} else {
        //    this.value = Object.assign(this.value, data);
        //}
        this.notify(this.value, notifier !== undefined ? notifier : this);
      };
      Object.defineProperty(Control.prototype, "setValue", {
        enumerable: true,
        configurable: false,
        writable: true,
      });
  
      /**
       * Gets the value of the control
       * 
       * @method getValue
       * @memberof Serendipia.controls.Control
       * @returns {object | number | string}
       */
      Control.prototype.getValue = function () {
        return this.value;
      };
      Object.defineProperty(Control.prototype, "getValue", {
        enumerable: false,
        configurable: false,
        writable: false,
      });
  
      /**
       * Adds the event listener callback for a given event name
       * 
       * @method on
       * @memberof Serendipia.controls.Control
       * @param {string} eventName
       * @param {function()} eventCallback
       */
      Control.prototype.on = function (eventName, eventCallback) {
        this.element.addEventListener(eventName, eventCallback);
      };
      Object.defineProperty(Control.prototype, "on", {
        enumerable: false,
        configurable: false,
        writable: true,
      });
  
      /**
       * Removes the event listener callback for a given event name
       * 
       * @method off
       * @memberof Serendipia.controls.Control
       * @param {string} eventName
       * @param {function()} eventCallback
       */
      Control.prototype.off = function (eventName, eventCallback) {
        this.element.removeEventListener(eventName, eventCallback);
      };
      Object.defineProperty(Control.prototype, "off", {
        enumerable: false,
        configurable: false,
        writable: true,
      });
  
      /**
       * Returns a Human readable version of the Control
       * 
       * @method toString
       * @augments Object
       * @memberof Serendipia.controls.Control
       */
      Control.prototype.toString = function () {
        return "[object {0}]#{1}".format(this.constructor.name, this.id);
      };
      Object.defineProperty(Control.prototype, "toString", {
        enumerable: false,
        configurable: false,
        writable: true,
      });
  
      return Control;
    })(Serendipia.observable.SubjectObserver);
  
    /**
     * Select2 control ready for Observable pattern
     * 
     * @class Select2Control
     * @memberof Serendipia.controls
     * @extends Serendipia.controls.Control
     * 
     * @param {string} id HTMLElement id
     * @param {function()} updateCallback
     * @param {Object} options Configurations for the Select2 control
     * @param {boolean} overrideChangeEvent Configuration to override the default change event handler
     *
     * @property {object | number | string} value
     * @property {string} id HTMLElement id
     * @property {string} selector String representation of the id selector
     * @property {HTMLElement} element
     * @property {jQueryElement} $select2Element 
     *  
     */
    controls.Select2Control = (function (_Control) {
      Serendipia.js.inherits(Select2Control, _Control);
      var _super = Serendipia.js.createSuper(Select2Control);
  
      /**
       * @constructor
       * @param {string} id
       * @param {function()} updateCallback
       * @param {Object} options
       * @param {boolean} overrideChangeEvent Configuration to override the default change event handler
       */
      function Select2Control(id, updateCallback, options, overrideChangeEvent) {
        Serendipia.js.classCallCheck(this, Select2Control);
  
        var _this = _super.call(this, id, updateCallback, true);
  
        _this.$select2Element = $("#{0}".format(_this.id)).select2(options);
        if (!overrideChangeEvent) {
          _this.$select2Element.on("change", function () {
            var value = _this.$select2Element.val();
            if (_this.value !== value) {
              _this.value = _this.$select2Element.val();
              _this.notify(_this.value, _this);
            }
          });
        }
  
        return _this;
      }
  
      /**
       * Sets the value of the control and notify all the observers
       * 
       * @method setValue
       * @memberof Serendipia.controls.Select2Control
       * @param {object} data
       * @param {Serendipia.observable.Subject} notifier
       */
      Select2Control.prototype.setValue = function (data, notifier) {
        var self = this;
        function setValue(value) {
          self.value = value;
          $(self.selector).val(self.value).trigger("change");
        }
  
        if (data === undefined) {
          this.value = undefined; // Alex: TODO: or null?
        } else if (data === null) {
          this.value = null; // Alex: TODO: or null?
        } else if (typeof data === "string") {
          if (data === "") {
            setValue("");
          }
          setValue(data);
        } else if (typeof data === "number") {
          setValue(data);
        } else {
          this.value = Object.assign(this.value, data);
        }
  
        // Alex: first logic, overridden by one over
        //if (typeof data === "string" || typeof data === "number") {
        //    this.value = data;
        //    $(this.selector).val(this.value).trigger("change");
        //}  else {
        //    this.value = Object.assign(this.value, data);
        //}
        this.notify(this.value, notifier !== undefined ? notifier : this);
      };
      Object.defineProperty(Select2Control.prototype, "setValue", {
        enumerable: true,
        configurable: false,
        writable: true,
      });
  
      /**
       * Adds the event listener callback for a given event name
       * 
       * @method on
       * @memberof Serendipia.controls.Select2Control
       * @param {string} eventName
       * @param {function()} eventCallback
       */
      Select2Control.prototype.on = function (eventName, eventCallback) {
        if (this.$select2Element) {
          this.$select2Element.on(eventName, eventCallback);
        }
      };
      Object.defineProperty(Select2Control.prototype, "on", {
        enumerable: false,
        configurable: false,
        writable: true,
      });
  
      /**
       * Appends an option to the Select2 Control
       * 
       * @method append
       * @memberof Serendipia.controls.Select2Control
       * @param {HTMLOptionElement} option
       * @param {boolean} changing
       */
      Select2Control.prototype.append = function (option, changing) {
        this.$select2Element.append(option);
        if (changing) {
          this.$select2Element.trigger("change");
        }
      };
      Object.defineProperty(Select2Control.prototype, "append", {
        enumerable: false,
        configurable: false,
        writable: false,
      });
  
      /**
       *Resets the content of the Select2 control.
       * 
       * @method reset
       * @memberof Serendipia.controls.Select2Control
       * @param {boolean} keepSelected
       */
      Select2Control.prototype.reset = function (keepSelected) {
        // TODO: Alex: don't remove the selected option from the set
        if (!keepSelected) {
          this.$select2Element.val(null);
        }
        this.$select2Element.html("<option></option>").trigger("change");
      };
      Object.defineProperty(Select2Control.prototype, "reset", {
        enumerable: false,
        configurable: false,
        writable: false,
      });
  
      /**
       * Triggers the "Change" event of the Select2Control
       * 
       * @method triggerChange
       * @memberof Serendipia.controls.Select2Control
       * @param {boolean} keepValue
       */
      Select2Control.prototype.triggerChange = function (keepSelected) {
        var value = this.$select2Element.val();
        this.$select2Element.trigger("change");
        if (keepSelected) {
          this.$select2Element.val(value);
        }
        // Alex: todo: review if keepSelected logic is needed
      };
      Object.defineProperty(Select2Control.prototype, "triggerChange", {
        enumerable: false,
        configurable: false,
        writable: false,
      });
  
      /**
       * Fetch options from data source
       * 
       * @method fetchDataSource
       * @memberof Serendipia.controls.Select2Control
       * @param {string} route
       * @param {Object} searchParam
       * @param {function} populateCallback
       * @param {boolean} keepSelected
       */
      Select2Control.prototype.fetchDataSource = function (
        route,
        searchParam,
        populateCallback,
        keepSelected
      ) {
        this.reset(keepSelected);
        var _self = this;
        $.post(route, searchParam)
          .done(function (response) {
            if (Array.isArray(response)) {
              if (populateCallback) {
                populateCallback(_self, response);
              } else {
                for (var j = 0; j < response.length; j++) {
                  var data = {
                    id: response[j].key,
                    text: response[j].value,
                  };
                  var option = new Option(
                    data.text,
                    data.id,
                    false,
                    response[j].selected
                  );
                  _self.append(option, false);
                }
              }
              _self.triggerChange(keepSelected);
            }
          })
          .fail(function (response) {
            global.console.error(response);
          });
      };
      Object.defineProperty(Select2Control.prototype, "fetchDataSource", {
        enumerable: false,
        configurable: false,
        writable: true,
      });
  
      /**
       * Returns if the Select2 Control have options of not.
       * 
       * @method hasOptions
       * @memberof Serendipia.controls.Select2Control
       * @returns {Boolean}
       */
      Select2Control.prototype.hasOptions = function () {
        return this.$select2Element.find("option").length > 0;
      };
      Object.defineProperty(Select2Control.prototype, "hasOptions", {
        enumerable: false,
        configurable: false,
        writable: true,
      });
  
      /**
       * Remove all the options from the Select2 Control.
       * 
       * @method removeOptions
       * @memberof Serendipia.controls.Select2Control
       */
      Select2Control.prototype.removeOptions = function () {
        this.$select2Element.html("");
      };
      Object.defineProperty(Select2Control.prototype, "removeOptions", {
        enumerable: false,
        configurable: false,
        writable: true,
      });
  
      return Select2Control;
    })(controls.Control);
  
    /**
     * DateTimePicker control ready for Observable pattern
     * 
     * @class DateTimePicker
     * @memberof Serendipia.controls
     * @extends Serendipia.controls.Control
     * 
     * @param {string} id
     * @param {function} updateCallback
     * @param {object} options
     * @param {boolean} overrideChangeEvent
     * 
     * @property {object | number | string} value
     * @property {string} id HTMLElement id
     * @property {string} selector String representation of the id selector
     * @property {HTMLElement} element
     * @property {jQueryElement} $dateTimePickerElement 
     */
    controls.DateTimePicker = (function (_Control) {
      Serendipia.js.inherits(DateTimePicker, _Control);
      var _super = Serendipia.js.createSuper(DateTimePicker);
  
      /**
       * @constructor
       * @param {any} id
       * @param {any} updateCallback
       * @param {any} options
       * @param {any} overrideChangeEvent
       */
      function DateTimePicker(id, updateCallback, options, overrideChangeEvent) {
        Serendipia.js.classCallCheck(this, DateTimePicker);
  
        var _this = _super.call(this, id, updateCallback, true);
  
        _this.$dateTimePickerElement = $("#{0}".format(_this.id)).datetimepicker(
          options
        );
        _this.$dateTimePickerElement.on("dp.change", function () {
          var value = _this.$dateTimePickerElement.data("DateTimePicker").date();
          if (_this.value !== value) {
            _this.value = value;
            _this.notify(_this.value, _this);
          }
        });
  
        return _this;
      }
  
      /**
       * Sets the value of the control and notify all the observers
       * 
       * @method setValue
       * @memberof Serendipia.controls.DateTimePicker
       * @param {object} data 
       * @param {Serendipia.observable.Subject} notifier 
       */
      DateTimePicker.prototype.setValue = function (data, notifier) {
        var self = this;
  
        function setValue(value) {
          self.value = value;
          self.$dateTimePickerElement.data("DateTimePicker").date(value);
          self.notify(self.value, notifier !== undefined ? notifier : self);
        }
  
        if (data) {
          setValue(data);
        }
      };
      Object.defineProperty(DateTimePicker.prototype, "setValue", {
        enumerable: false,
        configurable: false,
        writable: true,
      });
  
      /**
       * Adds the event listener callback for a given event name
       * 
       * @method on
       * @memberof Serendipia.controls.DateTimePicker
       * @param {string} eventName
       * @param {function()} eventCallback
       */
      DateTimePicker.prototype.on = function (eventName, eventCallback) {
        if (this.$dateTimePickerElement) {
          this.$dateTimePickerElement.on(eventName, eventCallback);
        }
      };
      Object.defineProperty(DateTimePicker.prototype, "on", {
        enumerable: false,
        configurable: false,
        writable: true,
      });
  
      /**
       * Returns a Human readable version of the Control
       * 
       * @method toString
       * @memberof Serendipia.controls.DateTimePicker
       * @return {string} The human readable version of the control
       */
      DateTimePicker.prototype.toString = function () {
        return "[object {0}]#{1}:({2})".format(
          this.constructor.name,
          this.id,
          this.value
        );
      };
      Object.defineProperty(DateTimePicker.prototype, "toString", {
        enumerable: false,
        configurable: false,
        writable: true,
      });
  
      return DateTimePicker;
    })(controls.Control);
  
    /**
     * Facebook like Time Selector based on minute intervals
     * 
     * @class TimeSelector
     * @memberof Serendipia.controls
     * @extends Serendipia.controls.Select2Control
     * 
     * @param {string} id Select element id
     * @param {function()} updateCallback Callback for the Observer.update() method
     * @param {Object} options
     * 
     * @property {object | number | string} value
     * @property {string} id HTMLElement id
     * @property {string} selector String representation of the id selector
     * @property {HTMLElement} element
     * @property {jQueryElement} $select2Element 
     * @property {number} minuteInterval
     * 
     */
    controls.TimeSelector = (function (_Select2Control) {
      Serendipia.js.inherits(TimeSelector, _Select2Control);
  
      var _super = Serendipia.js.createSuper(TimeSelector);
  
      var constants = {};
      constants.DEFAULT_MINUTE_INTERVAL = 15;
      constants.TIME_FORMAT = "HH:mm";
      constants.TIME_SEPARATOR = ":";
      constants.CLASS_APPENDED = "appended";
      constants.EVENT_CHANGE = "change";
      constants.EVENT_CHANGE_SILENCED = "change.select2";
  
      /**
       * @private
       * @memberof Serendipia.controls.TimeSelector
       * @param {number} minuteInterval 
       */
      function buildDataSet(minuteInterval) {
        var result = new Array();
        var count = (60 * 24) / minuteInterval;
        var theMoment = moment();
        theMoment.hour(0);
        theMoment.minute(0);
        var i = 0;
  
        do {
          result.push({
            id: theMoment.format("HH:mm"),
            text: theMoment.format("HH:mm"),
          });
          theMoment.add(minuteInterval, "minutes");
        } while (i++ < count);
        return result;
      }
  
      /**
       * @private
       * @memberof Serendipia.controls.TimeSelector
       * @param {number} minuteInterval 
       */
      function setDefaultConfiguration(minuteInterval) {
        var conf = {};
        conf.tags = true;
        conf.minimumResultsForSearch = 0;
        conf.sorter = function (results) {
          return results.sort(function (a, b) {
            return moment(a).isAfter(moment(b)) ? -1 : 1;
          });
        };
        conf.data = buildDataSet(minuteInterval);
        //conf.createTag= function (params) {
        //    var term = $.trim(params.term);
  
        //    if (term === '') {
        //        return null;
        //    }
        //    var time = term.split(":");
        //    var hours = time[0];
        //    var minutes = time[1];
        //    var theMoment = moment();
        //    theMoment.hours(hours);
        //    theMoment.minutes(minutes);
        //    return {
        //        id: theMoment.format(),
        //        text: theMoment.format("HH:mm"),
        //        newTag: true // add additional parameters
        //    }
        //}
        Object.assign(options, conf);
      }
  
      /**
       * @private
       * @memberof Serendipia.controls.TimeSelector
       * @param {Serendipia.controls.TimeSelector} control 
       * @param {*} defaultValue 
       */
      function setDefaultValue(control, defaultValue) {
        var value = moment(defaultValue);
        if (!value.isValid()) {
          value = moment();
        }
        var option = new Option(
          value.format("HH:mm"),
          value.format("HH:mm"),
          true,
          true
        );
        option.className = "appended";
        control.$select2Element.append(option);
        control.$select2Element.val(value.format("HH:mm")).trigger("change");
      }
  
      /**
       * 
       * @constructor
       * @param {string} id Select element id
       * @param {function()} updateCallback Callback for the Observer.update() method
       * @param {Object} options
       */
      function TimeSelector(id, updateCallback, options) {
        Serendipia.js.classCallCheck(this, TimeSelector);
  
        var minuteInterval = options.minuteInterval || 15;
        delete options.minuteInterval;
  
        setDefaultConfiguration(minuteInterval);
        var _this = _super.call(this, id, updateCallback, options, true);
        _this.minuteInterval = minuteInterval;
  
        setDefaultValue(_this, options.defaultValue);
  
        _this.$select2Element.on("change", function () {
          var value = _this.$select2Element.val();
          if (moment.isMoment(value)) {
            if (value.isValid()) {
              if (!moment(_this.value).isSame(value, "minute")) {
                _this.value = value;
              } else {
                _this.value = moment();
              }
              _this.notify(_this.value, _this);
            }
          } else {
            var time = value.split(":");
            var theMoment = moment();
            theMoment.hour(time[0]);
            theMoment.minute(time[1]);
            if (
              _this.value.hour() !== theMoment.hour() ||
              _this.value.minute() !== theMoment.minute()
            ) {
              _this.value = theMoment;
            } else {
              _this.value = moment();
            }
            _this.notify(_this.value, _this);
          }
        });
  
        return _this;
      }
  
      /**
       * Sets the value of the control and notify all the observers
       * 
       * @method setValue
       * @memberof Serendipia.controls.TimeSelector
       * @param {object} data 
       * @param {Serendipia.observable.Subject} notifier
       * @throws {Error} Not a valid moment object provided
       */
      TimeSelector.prototype.setValue = function (data, notifier) {
        var self = this;
        function setValue(value) {
          if (!moment.isMoment(value)) {
            value = moment(value);
          }
          if (!value.isValid()) {
            throw new Error("Not a valid moment object provided");
          }
          self.value = value;
          var text = value.format("HH:mm");
          var exist = self.$select2Element.find(
            "option:contains('{0}')".format(text)
          ).length;
          if (!exist) {
            self.$select2Element.remove(".appended");
            var option = new Option(text, value.format("HH:mm"), true, true);
            option.className = "appended";
            self.$select2Element.append(option);
          }
  
          self.$select2Element
            .val(value.format("HH:mm"))
            .trigger("change.select2");
          self.notify(self.value, notifier !== undefined ? notifier : self);
        }
  
        if (data) {
          setValue(data);
        }
      };
      Object.defineProperty(TimeSelector.prototype, "setValue", {
        enumerable: true,
        configurable: false,
        writable: true,
      });
  
      return TimeSelector;
    })(controls.Select2Control);
  
    /**
     * @class SelectorTimePicker
     * @memberof Serendipia.controls
     * @extends Serendipia.controls.DateTimePicker
     * 
     * @param {string} id HTMLElement id
     * @param {function} updateCallback 
     * @param {object} options 
     * @todo TED Debt: Finish this for the union of a timepicker and a time selector for better UX/UI
     */
    controls.SelectorTimePicker = (function (_DateTimePicker) {
      Serendipia.js.inherits(SelectorTimePicker, _DateTimePicker);
      var _super = Serendipia.js.createSuper(SelectorTimePicker);
  
      /**
       * @constructor
       * @param {*} id 
       * @param {*} updateCallback 
       * @param {*} options 
       */
      function SelectorTimePicker(id, updateCallback, options) {
        Serendipia.js.classCallCheck(this, SelectorTimePicker);
  
        function removeDateTimePickerOptions(options) {
          // Alex: removing datetimepicker options.
          delete options.icons;
        }
  
        function buildSelectOptions($selectMarkup, rate) {
          var ranges = new Array();
          var count = (60 * 24) / rate;
          var theMoment = moment();
          theMoment.hour(0);
          theMoment.minute(0);
          var i = 0;
  
          do {
            ranges.push(theMoment.format());
            theMoment.add(rate, "minutes");
          } while (i++ < count);
  
          $selectMarkup.html("");
          for (var j = 0; j < ranges.length; j++) {
            $selectMarkup.append(
              '<option value="{0}">{1}</option>'.format(
                ranges[j],
                moment(ranges[j]).format("HH:mm")
              )
            );
          }
        }
  
        function getDataSet(rate) {
          var result = new Array();
          var count = (60 * 24) / rate;
          var theMoment = moment();
          theMoment.hour(0);
          theMoment.minute(0);
          var i = 0;
  
          do {
            result.push({
              id: theMoment.format(),
              text: theMoment.format("HH:mm"),
            });
            theMoment.add(rate, "minutes");
          } while (i++ < count);
          return result;
        }
        var _this = _super.call(
          this,
          id,
          updateCallback,
          {
            format: "LT",
            ignoreReadonly: true,
            icons: options.icons,
          },
          true
        );
  
        _this.rate = options.rate;
        removeDateTimePickerOptions(options);
  
        var $select2ElementMarkup = $(
          '<select id="{0}_select" class="form-control"></select>'.format(id)
        );
  
        _this.$container = $("#{0}".format(id));
        _this.$dateTimePickerElement_input = $(
          "#{0} input[type=text]".format(id)
        );
        _this.$dateTimePickerElement_input.first().css("display", "none");
  
        $select2ElementMarkup.prependTo(_this.$container);
        options.data = getDataSet(_this.rate);
        _this.$select2Element = $select2ElementMarkup.select2(options);
  
        _this.$dateTimePickerElement.on("dp.change", function () {
          console.log("dp.change");
          var value = _this.$dateTimePickerElement.data("DateTimePicker").date();
          //if (_this.value !== value) { // (!moment(currentValue).isSame(value, "minute"))
          if (value.isValid() && !moment(_this.value).isSame(value, "minute")) {
            // (!moment(currentValue).isSame(value, "minute"))
            _this.value = value;
  
            _this.notify(_this.value, _this);
          }
          if (value.isValid()) {
            //buildSelectOptions($select2ElementMarkup, _this.rate);
            $select2ElementMarkup.remove(".appended");
            $select2ElementMarkup.append(
              '<option value="{0}" class="appended">{1}</option>'.format(
                value.format(),
                value.format("HH:mm")
              )
            );
            _this.$select2Element.val(value.format()).trigger("change.select2");
          }
        });
  
        _this.$select2Element.on("change", function () {
          var value = moment(_this.$select2Element.val());
          if (value.isValid() && !moment(_this.value).isSame(value, "minute")) {
            _this.value = value;
  
            _this.notify(_this.value, _this);
          }
          if (value.isValid()) {
            _this.$dateTimePickerElement.data("DateTimePicker").date(value);
          }
        });
  
        return _this;
      }
  
      return SelectorTimePicker;
    })(controls.DateTimePicker);
  })(window, window.Serendipia, window.jQuery, window.moment);