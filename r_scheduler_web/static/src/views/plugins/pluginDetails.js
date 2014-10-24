define([
    'backbone',
    'underscore',
    'jquery',
    'toastr',
    'src/models/pluginDetails',
    'text!src/templates/plugins/pluginDetails.html',
    'backbone-stickit',
    'backgrid-moment'
], function(Backbone, _, $, toastr, PluginDetailsModel, template) {

    "use strict";


    var RemoveCell = Backgrid.RemoveCell = Backgrid.Cell.extend({

        events: {
            "click": "remove"
        },

        displayValue: function () {
            return "<a>Remove</a>";
        },

        render: function () {
            this.$el.empty();
            this.$el.append(this.displayValue());
            this.delegateEvents();
            return this;
        },

        remove: function () {

            var triggerName = this.model.get(this.column.get("name"));

            var that = this;

            $.ajax({
                type: "DELETE",
                async: false,
                url: window.urlRoot + "/api/triggers?trigger=" + triggerName,
                contentType: "application/json",
                success: function (msg) { 
                    that.model.collection.remove(that.model);
                },
                error: function (err) { alert(err.responseText); }
            });
        }
    });

    var plugin = Backbone.View.extend({

        el: ".main-content",

        events: {
            "click #newSimpleTrigger": "addSimleTrigger",
            "click #newCronTrigger": "addCronTrigger",
        },

        bindings: {
            '#name': 'name',
            '#assemblyPath': 'assemblyPath'
        },

        initialize: function() {
            //_.bindAll(this, 'render', 'addPlugin');
        },

        columns: [{
            name: "type",
            label: "Type",
            editable: false,
            cell: "string"
        },{
            name: "name",
            label: "Name",
            editable: false,
            cell: "string"
        },{
            name: "group",
            label: "Group",
            editable: false,
            cell: "string"
        },{
            name: "jobName",
            label: "Job Name",
            editable: false,
            cell: "string"
        },{
            name: "jobGroup",
            label: "Job Group",
            editable: false,
            cell: "string"
        },{
            name: "startTimeUtc",
            label: "Start Time",
            cell: Backgrid.Extension.MomentCell.extend({
              modelFormat: "YYYY/M/D/H/m/s",
             displayFormat: "YYYY-MMM-DD HH:mm:ss"
            })
        },{
            name: "previousFireTimeUtc",
            label: "Previous Fire Time",
            editable: false,
            cell: Backgrid.Extension.MomentCell.extend({
              modelFormat: "YYYY/M/D/H/m/s",
              displayFormat: "YYYY-MMM-DD HH:mm:ss"
            })
        },{
            name: "nextFireTimeUtc",
            label: "Next Fire Time",
            editable: false,
            cell: Backgrid.Extension.MomentCell.extend({
              modelFormat: "YYYY/M/D/H/m/s",
              displayFormat: "YYYY-MMM-DD HH:mm:ss"
            })
        },{
            name: "description",
            label: "Description",
            editable: false,
            cell: "string"
        },{
            name: "name",
            label: "",
            editable: false,
            cell: "remove"
        }],

        render: function() {
            this.$el.html(_.template(template));

            this.stickit();

            var $grid = $("#grid");

            var Trigger = Backbone.Collection;
            var triggers = new Trigger(this.model.get('triggerDetails'));

            this.grid = new Backgrid.Grid({
                columns: this.columns,
                collection: triggers
            });

            $grid.append(this.grid.render().$el);

            return this;
        },

        addSimleTrigger: function() {
            Backbone.Application.Routers.main.navigate('plugins/' + this.model.get('name') + '/newSimpleTrigger', {
                trigger: true
            });
        },

        addCronTrigger: function() {
            Backbone.Application.Routers.main.navigate('plugins/' + this.model.get('name') + '/newCronTrigger', {
                trigger: true
            });
        }
    });

    return plugin;
});


