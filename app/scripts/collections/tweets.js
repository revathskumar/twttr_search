Twitter.Collections.Tweets = Backbone.Collection.extend({
    model: Twitter.Models.Tweet,
    url: "",
    fetch: function (username, options) {
        $.getJSON('http://api.twitter.com/1/statuses/user_timeline.json?callback=?&count=200&screen_name=' + username, options.success);
    }
});
