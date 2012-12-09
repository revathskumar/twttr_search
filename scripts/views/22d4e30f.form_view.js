'use strict';

Twitter.Views.FormView = Backbone.View.extend({
    events: {
        'click button.submit': 'submitForm'
    },
    initialize: function () {
        console.log('initialize FormView');
    },
    submitForm: function (e) {
        e.preventDefault();
        Twitter.Tweets.reset();
        Twitter.Tweets.fetch($('#twitter_user').val(), {
            success: this.success
        });

        return false;
    },
    success: function (data) {
        var searchTerm = $('#search').val().toLowerCase();
        $.each(data, function (i, tweet) {
            if (tweet.text !== undefined && (tweet.text.toLowerCase().search(searchTerm) >= 0 || searchTerm === "")) {
                console.log(tweet.text);
                Twitter.Tweets.create({
                    tweet: tweet.text
                });
            }
        });
    },
    render: function () {
        return this;
    }
});
