Template.room.events = {
	'click .button-golive' : function(event, template){
		var room = $(event.currentTarget).data('room');
		Meteor.call('goLive',room,function(){
			postal.publish({
				topic : 'room.islive'
			});
		});
	}
};

Template.room.helpers({
	canEdit : function(){
		return this.djs.indexOf(Meteor.userId()) !== -1;
	}
});


Template.room.room = function(){
	return Rooms.findOne({});
};

Template.room.playlist = function(){
	return Playlists.findOne({});
};