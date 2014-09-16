define([
    'backbone',
    'underscore',
    'jquery',
    'lib/requirejs-text/text!src/templates/main.html'    
], function (Backbone, _, $, template) {

    "use strict";

    var view = Backbone.View.extend({

        events: {
           
        },

        initialize: function() {
                        
        },

        render: function() { 
            this.$el.html(template);           
        }        
    });

    return view;
});
