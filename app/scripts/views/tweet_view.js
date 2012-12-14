'use strict';
Twitter.Views.Tweet = Backbone.View.extend({
    tagName: "li",
    initialize: function () {
        this.model.on('change', this.render, this);
    },
    render: function () {
        $(this.el).html(this.model.get('tweet'));
        return this;
    }
});
