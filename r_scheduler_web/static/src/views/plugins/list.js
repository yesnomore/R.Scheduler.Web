define([
    'backbone',
    'underscore',
    'jquery',
    'toastr',
    'backgrid',
    'text!src/templates/plugins/index.html',
    'src/views/base',
    'moment'
], function(Backbone, _, $, toastr, Backgrid, template, BaseView, moment) {

    "use strict";

    var ExecuteCell = Backgrid.ExecuteCell = Backgrid.Cell.extend({

        events: {
            "click": "execute"
        },

        displayValue: function () {
            return "<a>Execute</a>";
        },

        render: function () {
            this.$el.empty();
            this.$el.append(this.displayValue());
            this.delegateEvents();
            return this;
        },

        execute: function () {
            var pluginName = this.model.get(this.column.get("name"));
            $('#myModal').data('pluginName', pluginName);
            $('#myModal').modal();
        }
    });


    var list = BaseView.extend({

        el: ".main-content",

        columns: [{
            name: "name",
            editable: false,
            label: "Name",
            cell: "string"
        },{
            name: "id",
            label: "",
            cell: "html",
            editable: false,
            formatter: _.extend({}, Backgrid.CellFormatter.prototype, {
                fromRaw: function(rawValue) {
                    return "<a href=\"/#plugins/edit/" + rawValue + "\">Edit</a>";
                }
            })
        },{
            name: "name",
            label: "",
            cell: "execute",
            editable: false
        },{
            name: "id",
            label: "",
            cell: "html",
            editable: false,
            formatter: _.extend({}, Backgrid.CellFormatter.prototype, {
                fromRaw: function(rawValue) {
                    return "<a href=\"/#plugins/details/" + rawValue + "\">Details -></a>";
                }
            })
        }], 

        events: {
            "click #newPlugin": "newPlugin"
        },

        initialize: function() {
            _.bindAll(this, "render");

            this.events["click #executeConfirm"] = "executePlugin";
            this.delegateEvents();
        },

        render: function() {

            el: ".main-content",

            this.$el.hide();

            this.$el.html(template);

            var $grid = $("#grid");

            this.grid = new Backgrid.Grid({
                columns: this.columns,
                collection: this.collection
            });

            $grid.append(this.grid.render().$el);

            var that = this;
            this.collection.fetch({
                reset: true,
                success: function() {
                    that.$el.fadeIn(100);
                }
            });

            return this;
        },

        newPlugin: function() {
            Backbone.Application.Routers.main.navigate('plugins/new', {
                trigger: true
            });
        },

        executePlugin: function() {
            $('#myModal').on('hidden.bs.modal', this.modalHiddenCallback);
            $('#myModal').modal('hide');
            return false;
        },

        modalHiddenCallback: function() {
            //var pluginName = this.model.get(this.column.get("name"));
            var pluginName = $('#myModal').data('pluginName');

            var ajaxCall = $.ajax({
                type: "POST",
                async: false,
                url: window.urlRoot + "/api/plugins/execute",
                data: "\"" + pluginName + "\"",
                contentType: "application/json"
            }).done(function(response) {
                if (response.valid) {
                    toastr.success("Plugin successfully sent for execution");
                }
                else {
                    for (var i in response.errors) {
                        toastr.error(response.errors[i].message);
                    }
                }
            }).fail(function() {
                toastr.success("Error sending plugin for execution");
            });

            return false;
        }
    });

    return list;
});
