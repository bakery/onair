Template.landing.events = {
	'click .login-sc' : function(){
		Meteor.loginWithSoundcloud();
	},

	'click .login-fb' : function(){
		Meteor.loginWithFacebook();
	}
};