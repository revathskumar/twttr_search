Twitter.Models.Tweet = Backbone.Model.extend({
    defaults: {
        tweet: "",
        id: "",
        user: ""
    },
    initialize: function () {
        // this.user = options.user.get("username");
        // console.log(this.user);
    },
    sync: function () { return false; }
});
