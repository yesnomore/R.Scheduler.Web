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

    var plugin = Backbone.View.extend({

        el: ".main-content",

        events: {
        },

        bindings: {
            '#name': 'name',
            '#assemblyPath': 'assemblyPath'
        },

        initialize: function() {
            //_.bindAll(this, 'render', 'addPlugin');
        },

        columns: [{
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
            cell: "html",
            formatter: _.extend({}, Backgrid.CellFormatter.prototype, {
                fromRaw: function(rawValue) {
                    return "<a href=\"/#triggers/remove/" + rawValue + "\">Remove</a>";
                }
            })
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
        }
    });

    return plugin;
});


