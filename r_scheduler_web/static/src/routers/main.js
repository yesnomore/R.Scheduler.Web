define([
    'backbone',
    'src/views/main',
    'src/views/plugins/list',
    'src/collections/plugins',
], function(Backbone, MainView, PluginsListView, PluginsCollection) {

    "use strict";

    var router = Backbone.Router.extend({

        routes: {
            "": "home",
            "plugins": "plugins"
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

        home: function() {
            var view = new PluginsListView({
                collection: new PluginsCollection()
            });
            view.render();
        },
    });

    return router;
});
