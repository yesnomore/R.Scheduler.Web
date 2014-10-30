define([
    'backbone',
    'underscore',
    'jquery',
    'toastr',
    'src/models/simpleTrigger',
    'text!src/templates/plugins/simpleTrigger.html',
    "src/helpers/helperMethods",
    'src/views/base',
    "moment",
    "bootstrap-datetimepicker",
    'backbone-stickit'
], function(Backbone, _, $, toastr, SimpleTriggerModel, template, HelperMethods, BaseView) {

    "use strict";

    var plugin = BaseView.extend({

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

        saved: function(model, response) {
            $("#create").button('reset');
            if (response.valid) {
                toastr.success("Successfully created trigger");
                Backbone.Application.Routers.main.navigate('plugins/details/' + model.get("jobGroup"), {
                    trigger: true
                });
            }
            else {
                for (var i in response.errors) {
                    toastr.error(response.errors[i].message);
                }
            }
        },

        addTrigger: function() {
            $("#create").button('loading');
            var that = this;
            this.model.save({}, 
                        {
                            success: that.saved
                        });
            return false;
        }
    });

    return plugin;
});
