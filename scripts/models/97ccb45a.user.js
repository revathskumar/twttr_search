Twitter.Models.User = Backbone.Model.extend({
    defaults: {
        username: "",
        search: ""
    },
    validate: function () {
        if (this.username === "") {
            return "Enter a Twitter user";
        }
        if (this.search === "") {
            return "Enter a search term";
        }
    }
});
