define([
    'backbone',
    'underscore',
    'jquery',
    'toastr',
    'src/models/plugin',
    'text!src/templates/plugins/plugin.html',
    'backbone-stickit'
], function(Backbone, _, $, toastr, PluginModel, template) {

    "use strict";

    var plugin = Backbone.View.extend({

        el: ".main-content",

        events: {
            "click #create": "addPlugin",
        },

        bindings: {
            '#name': 'name',
            '#assemblyPath': 'assemblyPath'
        },

        initialize: function() {
            _.bindAll(this, 'render', 'addPlugin');
        },

        saved: function() {
            toastr.success("Successfully saved plugin");
        },

        deleted: function() {
            toastr.success("Successfully deleted staff member");
        },

        render: function() {
            this.$el.html(_.template(template));

            this.stickit();

            return this;
        },

        addPlugin: function() {
            $("#create").button('loading');

            this.model.save({}, {
                            success: function(model, response) {
                                console.log('SUCCESS:');
                                console.log(response);
                            }});

            //this.model.save();

            $("#create").button('reset');

            toastr.success("Successfully registered plugin");

            return false;
        },
    });

    return plugin;
});
