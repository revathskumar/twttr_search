'use strict';
Twitter.Views.ResultView = Backbone.View.extend({
    tagName: 'li',
    initialize: function () {
        console.log('initialize Result view');
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
    },
    render: function () {

        return this;
    }
});
