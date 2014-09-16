require.config({
    urlArgs: "version=0.0",
    paths: {
        "jquery": 'lib/jquery/dist/jquery',
        "underscore": 'lib/underscore/underscore',
        "backbone": 'lib/backbone/backbone',
        "bootstrap": 'lib/bootstrap/dist/js/bootstrap'
    },
    shim: {        
        "bootstrap": {
            deps: ["jquery"]
        },
        'jquery': {
            deps: [],
            exports: '$'
        },
        'backbone': {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
        },
        'underscore': {
            exports: "_"
        }        
    },
    waitSeconds: 200
});

require(['backbone',
         'jquery',
         'src/routers/main',
         'bootstrap'
],
function (Backbone, $, Router) {

    window.define = define;
    window.require = require;

    $.support.cors = true;

    Backbone.Application = {};
    Backbone.Application.Router = new Router();
   
    Backbone.history.start();
});
