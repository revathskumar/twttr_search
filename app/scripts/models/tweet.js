Twitter.Models.Tweet = Backbone.Model.extend({
    defaults: {
        tweet: "",
        user: ""
    },
    initialize: function (options) {
        // this.user = options.user.get("username");
        // console.log(this.user);
    },
    sync: function () { return false; }
});
