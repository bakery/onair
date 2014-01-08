
var channel;
//var playbackStats = {};

Template.playlist.created = function(){
	channel = postal.channel();
	channel.subscribe('media.playback.ping', function(data){
		Session.set('playbackStats',data);
	});
};

Template.playlist.playlist = function(){
	return Playlists.findOne({});
};

Template.playlist.helpers({
	
	playbackPosition : function(){
		var playbackStats = Session.get('playbackStats');
		var position = playbackStats ? playbackStats.position : 0;
		moment.duration(position)
		return Math.floor(position / 60000) + ':' + 
			Math.floor((position % 60000) / 1000);
	},

	playbackPositionPercentage : function(){
		var playbackStats = Session.get('playbackStats');
		return playbackStats ? playbackStats.positionPercentage : 0;
	},

	playlistDuration: function(){
		var playbackStats = Session.get('playbackStats');
		var duration = playbackStats ? playbackStats.duration : 0;
		return Math.floor(duration / 60000) + ':' + 
			Math.floor((duration % 60000) / 1000);
	},

	// returns true if any track is playing
	isAnythingPlaying: function(){
		var playbackStats = Session.get('playbackStats');
		return playbackStats ? playbackStats.playing : false;
	},

	// used in with track context - determines if current track is playing
	isPlaying : function(){
		var playbackStats = Session.get('playbackStats');
		return playbackStats ?
			this.id === playbackStats.media.id : false;
	}
});