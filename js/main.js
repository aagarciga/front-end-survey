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

        controls.prefferedTechnologyControlAngular = new serendipia.controls.Control(
            htmlBindings.idPrefferedTechnologyControlAngular,
            function(notifier, data){
                if(this.getValue() != data){
                    this.setValue(data, notifier);
                }
            }
        );

        controls.prefferedTechnologyControlReact = new serendipia.controls.Control(
            htmlBindings.idPrefferedTechnologyControlReact,
            function(notifier, data){
                if(this.getValue() != data){
                    this.setValue(data, notifier);
                }
            }
        );

        controls.prefferedTechnologyControlVue = new serendipia.controls.Control(
            htmlBindings.idPrefferedTechnologyControlVue,
            function(notifier, data){
                if(this.getValue() != data){
                    this.setValue(data, notifier);
                }
            }
        );

        controls.prefferedTechnologyControlNone = new serendipia.controls.Control(
            htmlBindings.idPrefferedTechnologyControlNone,
            function(notifier, data){
                if(this.getValue() != data){
                    this.setValue(data, notifier);
                }
            }
        );

        controls.familiarTechnologiesWebpack = new serendipia.controls.Control(
            htmlBindings.idFamiliarTechnologiesWebpack,
            function(notifier, data){
                if(this.getValue() != data){
                    this.setValue(data, notifier);
                }
            }
        );

        controls.familiarTechnologiesBabel = new serendipia.controls.Control(
            htmlBindings.idFamiliarTechnologiesBabel,
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
        model = new SurveyModel(function(control, value){
            var data = {};
            var modelProperties = model.get();
            switch (control) {
                case controls.nameControl:
                    data.name = value;
                    break;
                case controls.prefferedTechnologyControlAngular:
                    data.prefferedTechnology = value;
                    break;
                case controls.prefferedTechnologyControlReact:
                    data.prefferedTechnology = value;
                    break;
                case controls.prefferedTechnologyControlVue:
                    data.prefferedTechnology = value;
                    break;
                case controls.prefferedTechnologyControlNone:
                    data.prefferedTechnologyControlNone = value;
                    break;
                case controls.familiarTechnologiesWebpack:
                    var collection = modelProperties.familiarTechnologies;
                    if(!collection) {
                        collection = new Array();
                    }

                    collection.push(value);
                    data.familiarTechnologies = collection;
                    break;
                case controls.familiarTechnologiesBabel:
                    var collection = modelProperties.familiarTechnologies;
                    // todo: the same
                    
                    break;
            }
            
            model.set(data, control);
            console.log(control, value, model);
        });

        controls.nameControl.addObserver(model);
        controls.prefferedTechnologyControlAngular.addObserver(model);
        controls.prefferedTechnologyControlReact.addObserver(model);
        controls.prefferedTechnologyControlVue.addObserver(model);
        controls.prefferedTechnologyControlNone.addObserver(model);
        controls.familiarTechnologiesWebpack.addObserver(model);
        controls.familiarTechnologiesBabel.addObserver(model);
        console.log(model);
    };

    return {
        start: functions.start
    };
}(window, window.jQuery, moment, window.Serendipia);

$(window.document).ready(function () {
    Serendipia.debug.log("Document Ready");
    main.start();
});