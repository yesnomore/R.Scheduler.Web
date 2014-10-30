define([
    'backbone',
    'underscore',
    'jquery',
    'toastr',
    'src/models/plugin',
    'text!src/templates/plugins/plugin.html',
    'src/views/base',
    'backbone-stickit'
], function(Backbone, _, $, toastr, PluginModel, template, BaseView) {

    "use strict";

    var plugin = BaseView.extend({

        el: ".main-content",

        events: {
            "click #create": "addPlugin",
        },

        bindings: {
            '#name': 'name',
            '#id': 'id',
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
            this.$el.html(_.template(template, {
                model: this.model,
           }));

            this.stickit();

            return this;
        },

        addPlugin: function() {
            $("#create").button('loading');

            this.model.save({}, {
                            success: function(model, response) {
                                toastr.success("Successfully registered plugin");
                            }});

            $("#create").button('reset');

            return false;
        },
    });

    return plugin;
});
