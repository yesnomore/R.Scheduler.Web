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
        },

        urlRoot: "plugins",

        initialize: function() {
            //_.bindAll(this);
        },
    });

    return model;
});
