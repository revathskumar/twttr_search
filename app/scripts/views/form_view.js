'use strict';

Twitter.Views.FormView = Backbone.View.extend({
    events: {
        'click button.submit': 'submitForm',
        'click a.more': 'fetchTweets',
        'keyup #search': 'filter',
        'submit #search_form': 'submitForm'
    },
    filter: function  (e) {
        var searchTerm = $(e.target).val();
        if (Twitter.Tweets.length > 0) {
            Twitter.Tweets.trigger('filter', searchTerm);
        }
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
        if (e) {
            e.preventDefault();
        }
        Twitter.Tweets.fetch($('#twitter_user').val(), {
            success: this.success,
            error: this.showError
        });
        return false;
    },
    submitForm: function (e) {
        e.preventDefault();
        var username = $('#twitter_user').val();
        if (this.model.get('username') !== username) {
            Twitter.Tweets.last_tweet = '';
            Twitter.Tweets.reset();
        }
        this.model.set('username', username);
        this.fetchTweets(null);
        return false;
    },
    success: function (data) {
        var searchTerm = $('#search').val().toLowerCase();
        $.each(data, function (i, tweet) {
            if (tweet.text !== undefined) {
                Twitter.Tweets.create({
                    tweet: tweet.text,
                    id: tweet.id
                });
            }
            if (tweet.text !== undefined) {
                Twitter.Tweets.last_tweet = tweet.id;
            }
        });
        Twitter.Tweets.trigger('filter', searchTerm);
    },
    render: function () {
        return this;
    }
});
