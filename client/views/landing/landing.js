var handleOAuth = function(e){
	if(typeof e !== 'undefined'){
		alert('Something went terribly wrong. Run around scream and shout.');
	} else {
		Router.go('rooms');
	}
};

Template.landing.events = {
	'click .login-sc' : function(){
		Meteor.loginWithSoundcloud({}, handleOAuth);
	},

	'click .login-fb' : function(){
		Meteor.loginWithFacebook({}, handleOAuth);
	}
};