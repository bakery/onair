// Publish the current user

Meteor.publish('SC.OAuth', function(){
    return Meteor.users.find({_id: this.userId}, {fields: {'services.soundcloud': 1}});
});

Meteor.publish('currentUser', function() {
    var user = Meteor.users.find(this.userId);
    return user;
});

Meteor.publish('rooms', function() {
    return Rooms.find({});
});

Meteor.publish('roomById', function(room){

	console.log('publishing room', room);

    return Rooms.find({ _id : room });
});

Meteor.publish('playlistsForRoom', function(room){

	console.log('publishing playlist for room', room);

    return Playlists.find({ room : room });
});

Meteor.publish('listenersForRoom', function(room){
	return Listeners.find({ room : room });
});