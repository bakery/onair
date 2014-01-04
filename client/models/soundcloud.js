// set access token on the SC instance once someone logs in

Deps.autorun(function () {
	var user = Meteor.user();
	if(user){
		if(user.services.soundcloud){
			var accessToken = user.services.soundcloud.accessToken;
			if(accessToken){
				console.log('setting access token');
				SC.accessToken(accessToken);
			}
		}
	}
});