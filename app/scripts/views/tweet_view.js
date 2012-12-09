'use strict';
Twitter.Views.Tweet = Backbone.View.extend({
    tagName: "li",
    initialize: function () {

    },
    render: function () {
        $(this.el).append(this.model.get('tweet'));
        return this;
    }
});
