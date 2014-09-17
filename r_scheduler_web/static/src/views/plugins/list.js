define([
    'backbone',
    'underscore',
    "jquery",
    'backgrid',
    "text!private/templates/plugins/index.html",
    "moment",
    'backgrid-filter',
    'backgrid-paginator'
], function(Backbone, _, $, Backgrid, template, moment) {

    "use strict";


var list = Backbone.View.extend({

        render: function(template) {

            el: ".main-content",
            //this.$el.hide();

            this.$el.html(_.template(template, {
                title: this.title
            }));

            var $grid = $("#grid");

            this.grid = new Backgrid.Grid({
                columns: this.columns,
                collection: this.collection
            });

            $grid.append(this.grid.render().$el);

            $(".backgrid").addClass("table-hover");

            var paginator = new Backgrid.Extension.Paginator({
                collection: this.collection
            });

            $grid.append(paginator.render().$el);

            this.filter = new Backgrid.Extension.ServerSideFilter({
                collection: this.collection,
                wait: 150,
                name: "query"
            });

            $("#gridHeader").prepend(this.filter.render().$el);

            this.filter.$el.css({
                "float": "right",
                margin: "15px 0px 15px 15px",
                width: "300px"
            });

            $(".icon-search").addClass("glyphicon").addClass("glyphicon-search");
            $(".input-prepend").addClass("input-group");
            $(".input-append").addClass("input-group");
            $(".add-on").addClass("input-group-addon");
            $("input[name=query]").addClass("form-control");

            this.events["keyup input[name=query]"] = "search";
            this.events["change input[name=query]"] = "search";
            this.delegateEvents();

            var that = this;
            this.collection.fetch({
                reset: true,
                success: function() {
                    that.$el.fadeIn(100);
                }
            });

            return this;
        },

        search: _.debounce(function() {
            this.filter.search();
        }, 250),

        onClose: function() {
            if (this.grid !== undefined && this.grid !== null) {
                this.grid.remove();
            }
        }


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
            name: "id",
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
            //this.permissions = Backbone.Application.Authorization.get('areas').student;
        },

        render: function() {
            BaseList.prototype.render.call(this, template);
        },

        newPlugin: function() {
            // Backbone.Application.Routers.students.navigate('students/new?returnUrl=students', {
            //     trigger: true
            // });
        }
    });

    return list;
});
