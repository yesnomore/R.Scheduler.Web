define([], function () {

    "use strict";
    
    var helpers = {

        debounce: function (fn, delay) {
            var timer = null;
            return function () {
                var context = this, args = arguments;
                clearTimeout(timer);
                timer = setTimeout(function () {
                    fn.apply(context, args);
                }, delay);
            };
        },

        getKeyByValue: function (value, object) {
            for (var prop in object) {
                if (object.hasOwnProperty(prop)) {
                    if (object[prop] === value)
                        return prop;
                }
            }
            return null;
        },

        closeViews: function (object) {
            if (object.activeViews) {
                for (var i = 0; i < object.activeViews.length; i++) {
                    if (object.activeViews[i]) {
                        object.activeViews[i].close();
                    }
                }
                object.activeViews = [];
            }
        },

        renderView: function (view, object) {
            if (object.activeViews == undefined || object.activeViews == null) {
                object.activeViews = [];
            }
            object.activeViews.push(view);
            view.render();
        }
    };    

    return helpers;
});