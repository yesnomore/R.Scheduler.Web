define([
    'backbone',
    'underscore',
    'jquery',
    'toastr',
    'src/models/simpleTrigger',
    'text!src/templates/plugins/simpleTrigger.html',
    "moment",
    "bootstrap-datetimepicker",
    'backbone-stickit'
], function(Backbone, _, $, toastr, SimpleTriggerModel, template) {

    "use strict";

    var plugin = Backbone.View.extend({

        el: ".main-content",

        events: {
            "click #create": "addTrigger",
        },

        bindings: {
            '#name': 'triggerName',
            '#group': 'triggerGroup',
            '#jobGroup': 'jobGroup',
            '#jobName': 'jobName',
            '#startDateTime': {
                observe: 'startDateTime',
                onGet: function(value) {
                    if (!value) {
                        return "";
                    }
                    return moment.utc(value).format("dd/MM/yyyy hh:mm:ss");
                },
                onSet: function(value) {
                    if (!value) {
                        return "";
                    }
                    return moment.utc(value);
                }
            },
            '#repeatCount': 'repeatCount',
            '#repeatInterval': 'repeatInterval'
        },

        initialize: function() {
            _.bindAll(this, 'render', 'addTrigger');
        },

        saved: function() {
            toastr.success("Successfully saved trigger");
        },

        deleted: function() {
            toastr.success("Successfully deleted trigger");
        },

        render: function() {
            this.$el.html(_.template(template, {
                model: this.model,
            }));

            this.$el.find("[datepicker='']").each(function(index, element) {
                $(element).datetimepicker({
                    maskInput: true,
                    autoclose: true,
                    pickDate: true,                 //en/disables the date picker
                    pickTime: true,                 //en/disables the time picker
                    useMinutes: true,               //en/disables the minutes picker
                    useSeconds: true,               //en/disables the seconds picker
                    useCurrent: true,  
                });
            });

            this.stickit();

            return this;
        },

        addTrigger: function() {
            $("#create").button('loading');

            this.model.save({}, {
                            success: function(model, response) {
                                toastr.success("Successfully created trigger");
                            }});

            $("#create").button('reset');

            return false;
        },
    });

    return plugin;
});
