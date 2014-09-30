define([
    'backbone',
    'underscore',
    'jquery',
    'backgrid',
    'text!src/templates/plugins/index.html',
    'moment'
], function(Backbone, _, $, Backgrid, template, moment) {

    "use strict";

    var list = Backbone.View.extend({

        el: ".main-content",

        columns: [{
            name: "id",
            label: "Id",
            editable: false,
            cell: "string"
        }, {
            name: "name",
            editable: false,
            label: "Name",
            cell: "string"
        }, {
            name: "name",
            label: "",
            cell: "html",
            editable: false,
            formatter: _.extend({}, Backgrid.CellFormatter.prototype, {
                fromRaw: function(rawValue) {
                    return "<a href=\"/#plugins/edit/" + rawValue + "\">Details -></a>";
                }
            })
        }], 

        events: {
            "click #newPlugin": "newPlugin"
        },

        initialize: function() {
            //_.bindAll(this);
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
