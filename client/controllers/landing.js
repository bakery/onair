LandingController = RouteController.extend({
    template: 'landing',

    before: function () {
        var user = Meteor.user();
        if(user){
            if(user.services.soundcloud){
                var accessToken = user.services.soundcloud.accessToken;
                SC.accessToken(accessToken);
            }
        }
    },

    after: function () {
    },

    waitOn: function () {
    },

    data: function () {
        return {};
    }

    // action: function () {
    //  if we want to override default behavior 
    // }
});