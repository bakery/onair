Meteor.startup(function() {
	if(typeof Meteor.settings.fixtures !== 'undefined'){
		if(typeof Meteor.settings.fixtures.rooms){
			Rooms.remove({});

			_.each(Meteor.settings.fixtures.rooms, function(room){
				Rooms.insert(room);
			});
		}
	}
});