Template.rooms.canCreateRoom = function() {
	return Users.canCurrentUserPlaySongs();
};