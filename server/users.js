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
  }

  return user;
});