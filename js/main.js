// Import a module using CommonJS syntax
// const $ = require('jquery');

// Import a module using ES6 import syntax
import $ from "jquery";

/**
 * @module main
 */
window.main = function(global, $, moment, serendipia){
    

}(window, window.jQuery, window.moment, window.Serendipia);

$(window.document).ready(function () {
    Serendipia.debug.log("Document Ready");
});