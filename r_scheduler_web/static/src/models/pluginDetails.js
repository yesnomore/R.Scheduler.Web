define([
    'backbone',
    'underscore',
    'jquery'
], function(Backbone, _, $, module) {

    "use strict";

    var model = Backbone.Model.extend({

        defaults: {
            name: "",
            assemblyPath: "",
            triggerDetails: []
       },

        //urlRoot: "controllers/pluginDetails",
        urlRoot: "http://ruffer-sche-uat:5000/api/plugins",
        contentType: "application/json",

        initialize: function() {
            //Backbone.Model.prototype.initialize.call(this);
            //_.bindAll(this);
        },
    });

    return model;
});
