Twitter.Models.User = Backbone.Model.extend({
    defaults: {
        username: "",
        search: ""
    },
    validate: function (data) {
        // console.log(a);
        if (data.username === "") {
            return "Enter a Twitter user";
        }
        // if (data.search === "") {
        //     return "Enter a search term";
        // }
    }
});
