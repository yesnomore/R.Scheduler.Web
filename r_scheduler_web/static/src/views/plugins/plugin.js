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
            //this.$el.html('1 <input id="id" type="text"><input id="name" type="text"> <input id="assemblyPath" type="text">');

            this.stickit();

            //toastr.success("Successfully rendered the plugin view");

            return this;
        },

        addPlugin: function() {
            toastr.success("Clicked addPlugin");
            return false;
        },
    });

    return plugin;
});
