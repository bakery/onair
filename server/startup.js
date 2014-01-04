Meteor.startup(function () {
	Accounts.loginServiceConfiguration.remove({
		service: "soundcloud"
	});

	Accounts.loginServiceConfiguration.insert({
		service: "soundcloud",
		clientId : Meteor.settings.soundcloud.clientId,
		secret : Meteor.settings.soundcloud.secret
	});

	Accounts.loginServiceConfiguration.remove({
		service: "facebook"
	});

	Accounts.loginServiceConfiguration.insert({
		service: "facebook",
		appId: Meteor.settings.facebook.appId,
		secret: Meteor.settings.facebook.secret
	});
});