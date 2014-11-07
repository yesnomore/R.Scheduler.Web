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

            var successMsg = "Successfully registered plugin";
            if(this.model.get('id') != null)
            {
                successMsg = "Successfully updated plugin";
            }

            this.model.save({}, {
                success:function(model, response) {
                    
                            if (response.valid) {
                                toastr.success(successMsg);
                                Backbone.Application.Routers.main.navigate('plugins', {
                                    trigger: true
                                });
                            }
                            else {
                                for (var i in response.errors) {
                                    toastr.error(response.errors[i].message);
                                }
                            }
                            $("#create").button('reset');
                        },
                error:  function() {
                            toastr.error("Error registering plugin");
                        }
            });

            return false;
        },
    });

    return plugin;
});
