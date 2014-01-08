// Listeners API

Meteor.methods({
	registerListener : function(room){
		var user = Meteor.user();
		console.log('registering listener', user, room);

		return Listeners.upsert({ user : user._id, room : room}, {
			profile : user.profile,
			room : room,
			user : user._id
		});
	}
});