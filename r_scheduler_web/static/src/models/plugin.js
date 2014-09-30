define([
    'backbone',
    'underscore',
    'jquery'
], function(Backbone, _, $) {

    "use strict";

    var model = Backbone.Model.extend({

        defaults: {
            id: "0",
            name: "",
            assemblyPath: ""
       },

        urlRoot: "controllers/plugin",

        initialize: function() {
            //Backbone.Model.prototype.initialize.call(this);
            //_.bindAll(this);
        },
    });

    return model;
});
