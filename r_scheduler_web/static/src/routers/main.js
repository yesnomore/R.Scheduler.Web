define([
    'backbone',
    'src/views/main'
], function(Backbone, MainView) {

    "use strict";

    var router = Backbone.Router.extend({

        routes: {
            "": "home"
        },

        home: function() {
            var view = new MainView();
            view.render();
        }
    });

    return router;
});
