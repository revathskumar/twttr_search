'use strict';

Twitter.Views.FormView = Backbone.View.extend({
    events: {
        'click button.submit': 'submitForm',
        'click a.more': 'fetchTweets'
    },
    initialize: function () {
        console.log('initialize FormView');
        this.model.on('error', this.showError, this);
        this.model.on('change', this.hideError, this);
    },
    hideError: function () {
        $('.alert').hide();
    },
    showError: function (e, message) {
        var errorView = new Twitter.Views.ErrorView({message: message});
        errorView.render();
    },
    fetchTweets: function (e) {
        e.preventDefault();
        Twitter.Tweets.fetch($('#twitter_user').val(), {
            success: this.success
        });
        return false;
    },
    submitForm: function (e) {
        e.preventDefault();
        Twitter.Tweets.last_tweet = '';
        Twitter.Tweets.reset();
        var username = $('#twitter_user').val();
        this.model.set('username', username);
        Twitter.Tweets.fetch(username, {
            success: this.success
        });
        return false;
    },
    success: function (data) {
        var searchTerm = $('#search').val().toLowerCase();
        $.each(data, function (i, tweet) {
            if (tweet.text !== undefined && (tweet.text.toLowerCase().search(searchTerm) >= 0 || searchTerm === "")) {
                Twitter.Tweets.create({
                    tweet: tweet.text,
                    id: tweet.id
                });
            }
            if (tweet.text !== undefined) {
                Twitter.Tweets.last_tweet = tweet.id;
            }
        });
        $('.more').show();
    },
    render: function () {
        return this;
    }
});
