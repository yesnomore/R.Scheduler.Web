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
    "src/helpers/helperMethods"
], function(Backbone, MainView, PluginsListView, PluginsCollection, PluginView, PluginDetailsView, SimpleTriggerView, CronTriggerView, PluginModel, PluginDetailsModel, SimpleTriggerModel, CronTriggerModel, HelperMethods) {

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

        closeActiveView: function(object) {
            if (object.activeView) {
                object.activeView.close();
            }
        },

        setActiveView: function(object, view) {
            object.activeView = view;
            //view.render();
        },

        home: function() {
            
            this.closeActiveView(this);

            var view = new PluginsListView({
                collection: new PluginsCollection()
            });

            this.setActiveView(this, view);
            view.render();
        },

        plugins: function() {

            this.closeActiveView(this);

            var view = new PluginsListView({
                collection: new PluginsCollection()
            });
            this.setActiveView(this, view);
            view.render();
        },

        editPlugin: function(id) {

            this.closeActiveView(this);

            var model = new PluginModel({
                id: id
            }),

            that = this;

            model.fetch({
                success: function() {
                    var view = new PluginView({
                        model: model
                    });

                    that.setActiveView(that, view);
                    view.render();
                }
            });

            document.title = "Edit Plugin";
        },

        newPlugin: function() {

            this.closeActiveView(this);

            var that = this,
                model = new PluginModel();

            var view = new PluginView({
                        model: model
                    });

            this.setActiveView(this, view);
            view.render();

            document.title = "Register Plugin";
        },

        pluginDetails: function(id) {

            this.closeActiveView(this);

            var model = new PluginDetailsModel({
                id: id
            }),

            that = this;

            model.fetch({
                success: function() {
                    var view = new PluginDetailsView({
                        model: model
                    });

                    //view.render();
                    that.setActiveView(that, view);
                    view.render();
                }
            });

            document.title = "Plugin Details";
        },        

        newSimpleTrigger: function(id) {

            this.closeActiveView(this);
            
            var model = new SimpleTriggerModel({
                        jobGroup: id
                    });

            var view = new SimpleTriggerView({
                        model: model
                    });
            
            //view.render();
            this.setActiveView(this, view);
            view.render();

            document.title = "New Simple Trigger";
        },

        newCronTrigger: function(id) {

            this.closeActiveView(this);
            
            var model = new CronTriggerModel({
                jobGroup: id
            });

            var view = new CronTriggerView({
                        model: model
                    });
            
            this.setActiveView(this, view);
            view.render();

            document.title = "New Cron Trigger";
        }
    });

    return router;
});
