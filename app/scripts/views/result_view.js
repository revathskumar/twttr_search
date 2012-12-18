'use strict';
Twitter.Views.ResultView = Backbone.View.extend({
    tagName: 'li',
    initialize: function () {
        this.collection.on('filter', this.filter, this);
        this.collection.on('reset', this.remove, this);
    },
    filter: function (searchTerm) {
        this.remove();
        _.each(this.collection.models, function (tweet) {
            if (tweet.get('tweet').toLowerCase().search(searchTerm) >= 0 || searchTerm === "") {
                var view = new Twitter.Views.Tweet({ model: tweet });
                $('#tweets').append(view.render().el);
            }
        });
        $('.more').show();
    },
    remove: function () {
        $('#tweets').html('');
        $('.more').hide();
    },
    render: function () {
        return this;
    }
});
