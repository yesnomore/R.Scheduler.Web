define([
    'backbone',
    'underscore',
    'jquery'
], function(Backbone, _, $, module) {

    "use strict";

    var model = Backbone.Model.extend({

        defaults: {
            triggerName: "",
            triggerGroup: "",
            jobGroup: "",
            jobName: "",
            startDateTime: "",
            repeatCount: "",
            repeatInterval: ""
        },

        urlRoot: function() {
            return window.urlRoot + "/api/plugins/" + this.attributes.jobGroup + "/simpleTriggers";
        },

        contentType: "application/json",

        initialize: function() {
            //Backbone.Model.prototype.initialize.call(this);
            //_.bindAll(this);
        },
    });

    return model;
});
