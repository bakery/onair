Users = {
	canCurrentUserPlaySongs : function(){
		var user = Meteor.user();
		return  user ? typeof user.services.soundcloud !== 'undefined' :
			false;
	}
};