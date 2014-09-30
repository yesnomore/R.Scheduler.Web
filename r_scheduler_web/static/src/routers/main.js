define([
    'backbone',
    'src/views/main',
    'src/views/plugins/list',
    'src/collections/plugins',
    'src/views/plugins/plugin',
    'src/models/plugin',
], function(Backbone, MainView, PluginsListView, PluginsCollection, PluginView, PluginModel) {

    "use strict";

    var router = Backbone.Router.extend({

        routes: {
            "": "home",
            "plugins": "plugins",
            "plugins/new/": "newPlugin",
            "plugins/new": "newPlugin",
            "plugins/edit/:id": "editPlugin"
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

        newPlugin: function(id) {
            var that = this,
                model = new PluginModel();

            model.fetch({
                success: function() {
                    var view = new PluginView({
                        model: model
                    });

                    view.render();
                }
            });

            document.title = "Register Plugin";
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
