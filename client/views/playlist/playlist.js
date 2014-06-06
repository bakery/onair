var channel;

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
	
	artwork : function(){
		if(this.artwork_url){
			return this.artwork_url.replace('large.','t300x300.');
		} else {
			return '/images/casette.png';
		}
	},

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
	playingClass : function(){
		var playbackStats = Session.get('playbackStats');

		if(playbackStats && (this.id === playbackStats.media.id)){
			return 'active';
		}

		return '';
	}
});