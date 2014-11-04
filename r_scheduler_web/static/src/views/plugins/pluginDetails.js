define([
    'backbone',
    'underscore',
    'jquery',
    'toastr',
    'src/models/pluginDetails',
    'text!src/templates/plugins/pluginDetails.html',
    'src/views/base',
    'backbone-stickit',
    'backgrid-moment'
], function(Backbone, _, $, toastr, PluginDetailsModel, template, BaseView) {

    "use strict";

    var RemoveCell = Backgrid.RemoveCell = Backgrid.Cell.extend({

        events: {
            "click": "onRemove"
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

        onRemove: function () {
            var triggerName = this.model.get(this.column.get("name"));
            $('#myModal').data('triggerName', triggerName);
            $('#myModal').data('collection', this.model.collection);
            $('#myModal').data('model', this.model);
            $('#myModal').modal();
        }
    });

    var plugin = BaseView.extend({

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
            _.bindAll(this, 'render', 'addSimleTrigger');

            this.events["click #removeConfirm"] = "removeTrigger";
            this.delegateEvents();
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
        },

        removeTrigger: function() {
            $('#myModal').on('hidden.bs.modal', this.modalHiddenCallback);
            $('#myModal').modal('hide');
            return false;
        },

        modalHiddenCallback: function() {
            var triggerName = $('#myModal').data('triggerName');

            $.ajax({
                type: "DELETE",
                async: true,
                url: window.urlRoot + "/api/triggers?trigger=" + triggerName,
                contentType: "application/json",
            }).done(function(response) {
                if (response.valid) {
                    var collection = $('#myModal').data('collection');
                    var model = $('#myModal').data('model');
                    collection.remove(model);
                    toastr.success("Trigger successfully removed");
                }
                else {
                    for (var i in response.errors) {
                        toastr.error(response.errors[i].message);
                    }
                }
            }).fail(function() {
                toastr.success("Error removing trigger");
            });

            return false;
        },
    });

    return plugin;
});


