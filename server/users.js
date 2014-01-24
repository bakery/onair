if(Meteor.settings.authentication){
    //setup login service config
    Meteor.startup(function () {
        Accounts.loginServiceConfiguration.remove({
            service: "soundcloud"
        });

        Accounts.loginServiceConfiguration.insert({
            service: "soundcloud",
            clientId : Meteor.settings.authentication.soundcloud.clientId,
            secret : Meteor.settings.authentication.soundcloud.secret
        });

        Accounts.loginServiceConfiguration.remove({
            service: "facebook"
        });

        Accounts.loginServiceConfiguration.insert({
            service: "facebook",
            appId: Meteor.settings.authentication.facebook.appId,
            secret: Meteor.settings.authentication.facebook.secret
        });
    });

    // when a new user joins, update her profile based on data from external services
    Accounts.onCreateUser(function(options, user) {

      if(typeof user.services !== 'undefined'){
        if(typeof user.services.soundcloud !== 'undefined'){
            var scProfile = user.services.soundcloud;
            user.profile = _.extend({}, {
                picture : scProfile.avatar_url,
                city : scProfile.city,
                country : scProfile.country,
                name : scProfile.full_name,
                soundcloud : {
                    id : scProfile.id,
                    permalink : scProfile.permalink_url
                }
            });
        }

        if(typeof user.services.facebook !== 'undefined'){
            var fbProfile = user.services.facebook;
            user.profile = _.extend({}, {
                name : fbProfile.name,
                picture : 'http://graph.facebook.com/' +  fbProfile.id + '/picture?width=100&height=100'
            });
        }

      }

      return user;
    });
}