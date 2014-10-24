require.config({
    waitSeconds: 30,
    urlArgs: "version=0.0",
    //baseUrl: "/static",
    paths: {
        "jquery": 'lib/jquery-1.9.1',
        "toastr": 'lib/toastr',
        "underscore": 'lib/underscore/underscore',
        "moment": "lib/moment/moment",
        "backbone": 'lib/backbone/backbone',
        "backbone-pageable": 'lib/backbone-pageable',
        "backbone-stickit": 'lib/backbone.stickit',
        "bootstrap": 'lib/bootstrap.min',
        "backgrid": 'lib/backgrid/backgrid',
        "lunr": 'lib/lunr/lunr',
        "backgrid-filter": 'lib/backgrid/extensions/filter/backgrid-filter',
        'backgrid-moment': 'lib/backgrid/extensions/moment-cell/backgrid-moment-cell',
        'bootstrap-datetimepicker': 'lib/bootstrap-datetimepicker',
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
        'backgrid-moment': {
            deps: ["jquery", 'underscore', 'backbone', 'backgrid'],
            exports: "Backgrid.Extension"
        },
        'bootstrap-datetimepicker': {
            deps: ["jquery"],
            exports: "$"
        },
    },
    waitSeconds: 200
});

window.require = require;
//window.urlRoot = "http://ruffer-sche-uat:5000";
window.urlRoot = "http://localhost:5000";
//window.urlRoot = "http://ruffer-schedule:5000";


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
