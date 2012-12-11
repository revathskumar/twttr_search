Twitter.Collections.Tweets = Backbone.Collection.extend({
    model: Twitter.Models.Tweet,
    url: "http://api.twitter.com/1/statuses/user_timeline.json?callback=?&trim_user=1&screen_name=",
    initialize: function () {
        this.last_tweet = "";
        this.count = 200;
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
