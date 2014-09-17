define([
    'backbone',
    'underscore',
    'jquery',
    'lib/requirejs-text/text!src/templates/main.html'
], function (Backbone, _, $, template) {

    "use strict";

    var view = Backbone.View.extend({

        el: ".main-content",

        events: {
           
        },

        initialize: function() {
            //_.bindAll(this);
        },

        render: function() { 
            this.$el.html(template);
            //return this;
        }
    });

    return view;
});
