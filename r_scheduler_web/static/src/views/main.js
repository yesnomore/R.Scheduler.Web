define([
    'backbone',
    'underscore',
    'jquery',
    'lib/requirejs-text/text!src/templates/main.html',
    'src/views/base',
], function (Backbone, _, $, template, BaseView) {

    "use strict";

    var view = BaseView.extend({

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
