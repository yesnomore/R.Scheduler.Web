require.config({
    waitSeconds: 30,
    urlArgs: "version=0.0",
    //baseUrl: "/static",
    paths: {
        "jquery": 'lib/jquery/jquery',
        "toastr": 'lib/toastr',
        "underscore": 'lib/underscore/underscore',
        "moment": "lib/moment/moment",
        "backbone": 'lib/backbone/backbone',
        "backbone-pageable": 'lib/backbone-pageable',
        "backbone-stickit": 'lib/backbone.stickit',
        "bootstrap": 'lib/bootstrap/dist/js/bootstrap',
        "backgrid": 'lib/backgrid/backgrid',
        "lunr": 'lib/lunr/lunr',
        "backgrid-filter": 'lib/backgrid/extensions/filter/backgrid-filter',
        // 'backgrid-paginator': 'lib/backgrid-paginator.min',
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
        },
        'backgrid': {
            deps: ["jquery", "backbone", 'underscore'],
            exports: "Backgrid"
        },
        'backbone-stickit': {
            deps: ["underscore", "jquery", 'backbone'],
            exports: "Backbone"
        },
        'lunr': {
            exports: "lunr"
        },
        'backgrid-filter': {
            deps: ["jquery", 'underscore', 'backbone', 'backgrid', 'lunr'],
            exports: "Backgrid.Extension"
        },
    },
    waitSeconds: 200
});

window.require = require;

require(['backbone',
         'jquery',
         'src/routers/main',
         'bootstrap',
         'require',
],
function (Backbone, $, Router, bootstrap, require) {

    //window.define = define;
 
    $.support.cors = true;

    Backbone.Application = Backbone.Application || {};
    Backbone.Application.Routers = {};
    Backbone.Application.Routers.main = new Router();
   
    Backbone.history.start();

    return Backbone.Application;
});
