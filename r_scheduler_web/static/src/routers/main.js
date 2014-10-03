define([
    'backbone',
    'src/views/main',
    'src/views/plugins/list',
    'src/collections/plugins',
    'src/views/plugins/plugin',
    'src/views/plugins/pluginDetails',
    'src/models/plugin',
    'src/models/pluginDetails',
], function(Backbone, MainView, PluginsListView, PluginsCollection, PluginView, PluginDetailsView, PluginModel, PluginDetailsModel) {

    "use strict";

    var router = Backbone.Router.extend({

        routes: {
            "": "home",
            "plugins": "plugins",
            "plugins/new/": "newPlugin",
            "plugins/new": "newPlugin",
            "plugins/edit/:id": "editPlugin",
            "plugins/details/:id": "pluginDetails"
        },

        // home: function() {
        //     var view = new MainView();
        //     view.render();
        // },

        plugins: function() {
            var view = new PluginsListView({
                collection: new PluginsCollection()
            });
            view.render();
        },

        editPlugin: function(id) {
            var model = new PluginModel({
                id: id
            }),

            that = this;

            model.fetch({
                success: function() {
                    var view = new PluginView({
                        model: model
                    });

                    view.render();
                }
            });

            document.title = "Edit Plugin";
        },

        newPlugin: function() {
            var that = this,
                model = new PluginModel();

            var view = new PluginView({
                        model: model
                    });

            view.render();

            document.title = "Register Plugin";
        },

        pluginDetails: function(id) {
            var model = new PluginDetailsModel({
                id: id
            }),

            that = this;

            model.fetch({
                success: function() {
                    var view = new PluginDetailsView({
                        model: model
                    });

                    view.render();
                }
            });

            document.title = "Plugin Details";
        },        

        home: function() {
            var view = new PluginsListView({
                collection: new PluginsCollection()
            });
            view.render();
        },
    });

    return router;
});
