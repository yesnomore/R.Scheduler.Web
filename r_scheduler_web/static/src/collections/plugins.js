define([
    'backbone',
    'src/models/plugin',
    'lib/backbone-pageable'
], function(Backbone, PluginModel) {

    "use strict";

    var plugins = Backbone.PageableCollection.extend({
        model: PluginModel,

        state: {
            firstPage: 1,
            pageSize: 20,
            totalRecords: null
        },

        queryParams: {
            currentPage: "currentPage",
            pageSize: "pageSize",
            sortKey: "sortKey",
            order: "order"
        },

        mode: "server",

        // parseState: function(resp) {
        //     return {
        //         totalRecords: resp.count
        //     };
        // },

        // parseRecords: function(resp) {
        //     return resp.items;
        // },

        //url: "controllers/plugins"
        url: window.urlRoot + "/api/plugins"
    });

    return plugins;
});
