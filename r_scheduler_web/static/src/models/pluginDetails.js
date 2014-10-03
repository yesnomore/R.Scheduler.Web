define([
    'backbone',
    'underscore',
    'jquery'
], function(Backbone, _, $) {

    "use strict";

    var model = Backbone.Model.extend({

        defaults: {
            name: "",
            assemblyPath: "",
            triggerDetails: []
       },

        urlRoot: "controllers/pluginDetails",
        contentType: "application/json",

        initialize: function() {
            //Backbone.Model.prototype.initialize.call(this);
            //_.bindAll(this);
        },
    });

    return model;
});
