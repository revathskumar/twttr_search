'use strict';
Twitter.Views.ResultView = Backbone.View.extend({
    tagName: 'li',
    initialize: function () {
        this.collection.on('add', this.addOne, this);
        this.collection.on('reset', this.remove, this);
    },
    addOne: function (tweet) {
        var view = new Twitter.Views.Tweet({ model: tweet }),
            el = view.render().el;
        $('#tweets').append(el);
    },
    remove: function () {
        $('#tweets').html('');
        $('.more').hide();
    },
    render: function () {
        return this;
    }
});
