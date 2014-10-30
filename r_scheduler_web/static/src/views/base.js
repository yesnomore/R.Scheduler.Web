define([
    'backbone',
    'underscore',
    'jquery',
    'toastr',
    'src/models/simpleTrigger',
    'text!src/templates/plugins/simpleTrigger.html',
    "src/helpers/helperMethods",
    "moment",
    "bootstrap-datetimepicker",
    'backbone-stickit'
], function(Backbone, _, $, toastr, SimpleTriggerModel, template, HelperMethods) {

    "use strict";

    var baseView = Backbone.View.extend({

        close: function () {
            this.undelegateEvents();
            this.unbind();
            this.model = null;
            this.collection = null;
            if (this.$el) {
                this.$el.empty();
                this.$el = null;
            }
            if (this.grid && this.grid.remove) {
                this.grid.remove();
                this.grid = null;
            }
            this.view = null;
            this.template = null;
        }
    });

    return baseView;
});
