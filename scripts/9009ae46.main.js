'use strict';
window.Twitter = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        console.log('Hello from Backbone!');
        Twitter.Tweets = new Twitter.Collections.Tweets();
        var user = new Twitter.Models.User(),
            form = new Twitter.Views.FormView({
            el: $('.container-narrow'),
            model: user
        });
        new Twitter.Views.ResultView({
            collection: Twitter.Tweets
        });
        form.render();
    }
};

$(document).ready(function () {
    Twitter.init();
});
