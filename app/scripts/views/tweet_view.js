'use strict';
Twitter.Views.Tweet = Backbone.View.extend({
    tagName: "li",
    initialize: function () {

    },
    parseTweet: function (tweet) {
        var regex = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/ig;
        return tweet.replace(regex, function (uri) {
            return "<a href='" + uri + "'>" + uri + "</a>";
        });
    },
    render: function () {
        $(this.el).append(this.parseTweet(this.model.get('tweet')));
        return this;
    }
});
