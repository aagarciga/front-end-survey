// Import a module using CommonJS syntax
// const $ = require('jquery');

// Import a module using ES6 import syntax
import $ from "jquery";
import moment from "moment/dist/moment";

/**
 * @module main
 */
window.main = function(global, $, moment, serendipia, application){

    /**
     * SurveyModel
     * @class
     * @memberof module:main
     * @extends serendipia.observable.Model
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
    var model  = undefined;

    htmlBindings.idNameControl = "controlName";
    htmlBindings.idPrefferedTechnologyControlAngular = "controlPrefferedTechnology_angular";
    htmlBindings.idPrefferedTechnologyControlReact = "controlPrefferedTechnology_react";
    htmlBindings.idPrefferedTechnologyControlVue = "controlPrefferedTechnology_vue";
    htmlBindings.idPrefferedTechnologyControlNone = "controlPrefferedTechnology_none";
    htmlBindings.idFamiliarTechnologiesWebpack = "familiarTechnologies_webpack";
    htmlBindings.idFamiliarTechnologiesBabel = "familiarTechnologies_babel"

    controls.nameControl = undefined;
    controls.prefferedTechnologyControlAngular = undefined;
    controls.prefferedTechnologyControlReact = undefined;
    controls.prefferedTechnologyControlVue = undefined;
    controls.prefferedTechnologyControlNone = undefined;
    controls.familiarTechnologiesWebpack = undefined;
    controls.familiarTechnologiesBabel = undefined;

    /**
     * @method
     * @private
     * @memberof module:main
     * @param {serendipia.observable.Subject} notifier 
     * @param {any} data 
     */
    functions.controlUpdateCallback = function(notifier, data){
        if(this.getValue() != data){
            this.setValue(data, notifier);
        }
    };

    /**
     * @method
     * @private
     * @memberof module:main 
     * @param {serendipia.controls.Control} control 
     * @param {string | number} value 
     */
    functions.modelUpdateCallback = function(control, value){
            
        var data = {};
        var modelProperties = model.get();
        switch (control) {
            case controls.nameControl:
                data.name = value;
                break;
            case controls.prefferedTechnologyControlAngular:
            case controls.prefferedTechnologyControlReact:
            case controls.prefferedTechnologyControlVue:
            case controls.prefferedTechnologyControlNone:
                data.prefferedTechnology = value;
                break;                
            case controls.familiarTechnologiesWebpack:
            case controls.familiarTechnologiesBabel:                   
                var collection = modelProperties.familiarTechnologies;
                if(!collection) {
                    collection = new Array();
                }
                if(control.element.checked){
                    collection.push(value);
                } else {
                    collection.pop(value);
                }                    
                data.familiarTechnologies = collection;
                break;
        }
        
        model.set(data, control);

        serendipia.debug.log("Model Updated"); 
        console.log(model.properties);
    }

    /**
     * @method
     * @private
     * @memberof module:main
     */
    functions.controlSetup = function(){

        controls.nameControl = new serendipia.controls.Control(
            htmlBindings.idNameControl,
            functions.controlUpdateCallback
        );

        controls.prefferedTechnologyControlAngular = new serendipia.controls.Control(
            htmlBindings.idPrefferedTechnologyControlAngular,
            functions.controlUpdateCallback
        );

        controls.prefferedTechnologyControlReact = new serendipia.controls.Control(
            htmlBindings.idPrefferedTechnologyControlReact,
            functions.controlUpdateCallback
        );

        controls.prefferedTechnologyControlVue = new serendipia.controls.Control(
            htmlBindings.idPrefferedTechnologyControlVue,
            functions.controlUpdateCallback
        );

        controls.prefferedTechnologyControlNone = new serendipia.controls.Control(
            htmlBindings.idPrefferedTechnologyControlNone,
            functions.controlUpdateCallback
        );

        controls.familiarTechnologiesWebpack = new serendipia.controls.Control(
            htmlBindings.idFamiliarTechnologiesWebpack,
            functions.controlUpdateCallback
        );

        controls.familiarTechnologiesBabel = new serendipia.controls.Control(
            htmlBindings.idFamiliarTechnologiesBabel,
            functions.controlUpdateCallback
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
        model = new SurveyModel(functions.modelUpdateCallback);

        controls.nameControl.addObserver(model);        
        controls.prefferedTechnologyControlAngular.addObserver(model);
        controls.prefferedTechnologyControlReact.addObserver(model);
        controls.prefferedTechnologyControlVue.addObserver(model);
        controls.prefferedTechnologyControlNone.addObserver(model);
        controls.familiarTechnologiesWebpack.addObserver(model);
        controls.familiarTechnologiesBabel.addObserver(model);

        model.addObserver(application.getModel());

        serendipia.debug.log("Initial model status:");
        console.log(model);
    };

    return {
        start: functions.start
    };
}(window, window.jQuery, moment, window.serendipia, window.serendipia.modules.application);

$(window.document).ready(function () {
    serendipia.debug.log("Document Ready");

    // Alex: allways make your app.stat() call before calling main.start(). Place of the application.start() must be global.
    var app = window.serendipia.modules.application;
    app.start(function(notifier, data){
        console.log("notifier:", notifier, "data:", data);
    });
    
    main.start();
    
});