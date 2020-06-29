// Import a module using CommonJS syntax
// const $ = require('jquery');

// Import a module using ES6 import syntax
import $ from "jquery";
import moment from "moment/dist/moment";

/**
 * @module main
 */
window.main = function(global, $, moment, serendipia){

    /**
     * SurveyModel
     * @class
     * @memberof module:main
     * @extends Serendipia.observable.Model
     * 
     * @param {function} updateCallback
     * 
     * @property {string} surveyGUID Survey Id
     * @property {string} name Name of the person who has taken the survey
     * @property {string} prefferedTechnology Preffered technology to work with
     * @property {array} familiarTechnologies Technologies that are familiar to work with
     * @property {string | moment} surveyTakenAt When was taken the survey
     */
    var SurveyModel = function (_Model) {

        serendipia.js.inherits(SurveyModel, _Model);
        var _super = serendipia.js.createSuper(SurveyModel);

        function SurveyModel(updateCallback) {
            var _this;

            serendipia.js.classCallCheck(this, SurveyModel);

            _this = _super.call(this, updateCallback);
            // Alex: Custom SurveyModel properties here...
            _this.properties = {
                surveyGUID: undefined,
                name: undefined,
                prefferedTechnology: undefined,
                familiarTechnologies: undefined,
                surveyTakenAt: undefined
            };

            return _this;
        }

        return SurveyModel;
    }(serendipia.observable.Model);
    
    var htmlBindings = {};
    var controls = {};
    var functions = {};

    htmlBindings.idNameControl = "controlName";

    controls.nameControl = undefined;

    /**
     * @method
     * @private
     * @memberof module:main
     */
    functions.controlSetup = function(){

        controls.nameControl = new serendipia.controls.Control(
            htmlBindings.idNameControl,
            function(notifier, data){
                if(this.getValue() != data){
                    this.setValue(data, notifier);
                }
            }
        );
    };
    
    /**
     * @mehtod
     * @public
     * @memberof module:main
     */
    functions.start = function(){
        serendipia.debug.log("main.start() at {0}".format(moment().format()), "white", "red");

        functions.controlSetup();
    };

    return {
        start: functions.start
    };
}(window, window.jQuery, moment, window.Serendipia);

$(window.document).ready(function () {
    Serendipia.debug.log("Document Ready");
    main.start();
});