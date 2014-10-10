define([
    'backbone',
    'underscore',
    'jquery',
    'backgrid',
    'text!src/templates/plugins/index.html',
    'moment'
], function(Backbone, _, $, Backgrid, template, moment) {

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
            //alert(pluginName);

            var ajaxCall = $.ajax({
                type: "POST",
                async: false,
                url: "http://ruffer-sche-uat:5000/api/plugins/execute",
                data: "\"" + pluginName + "\"",
                contentType: "application/json",
            });

            if (ajaxCall.status == 204){ //No Response 204
                alert("done");
            }
        }
    });


    var list = Backbone.View.extend({

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
            editable: false,
        },{
            name: "name",
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
            //_.bindAll(this, "executePlugin");
        },

        render: function() {

            el: ".main-content",

            this.$el.hide();

            this.$el.html(template);

            var $grid = $("#grid");

            this.grid = new Backgrid.Grid({
                columns: this.columns,
                //row: ClickableRow,
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

        onClose: function() {
            if (this.grid !== undefined && this.grid !== null) {
                this.grid.remove();
            }
        },

        newPlugin: function() {
            // Backbone.Application.Routers.students.navigate('students/new?returnUrl=students', {
            //     trigger: true
            // });
            Backbone.Application.Routers.main.navigate('plugins/new', {
                trigger: true
            });
        }
    });

    return list;
});
