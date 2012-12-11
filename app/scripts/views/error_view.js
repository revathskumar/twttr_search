'use strict';

Twitter.Views.ErrorView = Backbone.View.extend({
    initialize: function (options) {
        console.log("ErrorView");
        this.message = options.message;
    },
    el: ".alert",
    render: function () {
        $(this.el).html("<strong>Error!</strong> " + this.message).show();
        return this;
    }
});
