Twitter.Collections.Tweets = Backbone.Collection.extend({
    model: Twitter.Models.Tweet,
    url: "http://api.twitter.com/1/statuses/user_timeline.json?callback=?&trim_user=1&screen_name=",
    initialize: function () {
        this.last_tweet = "";
        this.count = 200;
        this.on('add', this.parseTweet);
    },
    expandUrl: function (shortUrl, tweet) {
        var replaced_text = "";

        $.getJSON("http://jsonpify.heroku.com/?callback=?&resource=" + encodeURIComponent("http://expandurl.appspot.com/expand?url=" + shortUrl), function (data) {
            var regex = new RegExp(shortUrl, 'g');
            replaced_text = tweet.get('tweet').replace(regex, decodeURIComponent($.parseJSON(data)['end_url']));
            tweet.set({tweet: replaced_text }).save();
        });
    },
    parseTweet: function (tweet) {

        var shortUrl = "",
            regex = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/ig,
        updatedTweet = tweet.get('tweet').replace(regex, function (uri) {
            shortUrl = uri;
            return "<a href='" + uri + "'>" + uri + "</a>";
        });

        tweet.set({tweet: updatedTweet }).save();
        if (shortUrl !== "") {
            this.expandUrl(shortUrl, tweet);
        }
    },
    fetch: function (username, options) {
        var max_id = "";
        if (this.last_tweet !== '') {
            max_id = "max_id=" + this.last_tweet;
        }
        $.getJSON(this.url + username + '&count=' + this.count + '&' + max_id, options.success);
    },
    add: function (newTweet) {
        var isDupe = this.any(function (tweet) {
            return tweet.get('id') === newTweet.get('id');
        });
        if (isDupe) return;
        Backbone.Collection.prototype.add.call(this, newTweet);
    }
});
