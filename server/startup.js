Meteor.startup(function () {
	Accounts.loginServiceConfiguration.remove({
		service: "soundcloud"
	});

	Accounts.loginServiceConfiguration.insert({
		service: "soundcloud",
		clientId : Meteor.settings.soundcloud.clientId,
		secret : Meteor.settings.soundcloud.secret
	});
});