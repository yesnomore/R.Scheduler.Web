define([
    'backbone',
    'src/views/main',
    'src/views/plugins/list',
    'src/collections/plugins',
    'src/views/plugins/plugin',
    'src/views/plugins/pluginDetails',
    'src/views/plugins/simpleTrigger',
    'src/views/plugins/cronTrigger',
    'src/models/plugin',
    'src/models/pluginDetails',
    'src/models/simpleTrigger',
    'src/models/cronTrigger',
], function(Backbone, MainView, PluginsListView, PluginsCollection, PluginView, PluginDetailsView, SimpleTriggerView, CronTriggerView, PluginModel, PluginDetailsModel, SimpleTriggerModel, CronTriggerModel) {

    "use strict";

    var router = Backbone.Router.extend({

        routes: {
            "": "home",
            "plugins": "plugins",
            "plugins/new/": "newPlugin",
            "plugins/new": "newPlugin",
            "plugins/edit/:id": "editPlugin",
            "plugins/details/:id": "pluginDetails",
            "plugins/:id/newSimpleTrigger": "newSimpleTrigger",
            "plugins/:id/newCronTrigger": "newCronTrigger"
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

        newSimpleTrigger: function(id) {
            
            var model = new SimpleTriggerModel({
                jobGroup: id
            });

            var view = new SimpleTriggerView({
                        model: model
                    });
            
            view.render();

            document.title = "New Simple Trigger";
        },

        newCronTrigger: function(id) {
            
            var model = new CronTriggerModel({
                jobGroup: id
            });

            var view = new CronTriggerView({
                        model: model
                    });
            
            view.render();

            document.title = "New Cron Trigger";
        }
    });

    return router;
});
