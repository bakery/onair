Template.volume.created = function(){
	Session.set('media.playback.muted',
		PlaybackManager.getInstance().isMute()
	);
};

Template.volume.events = {
	'click button' : function(){
		var playbackInstance = PlaybackManager.getInstance();
		var muted = playbackInstance.isMute();

		if(muted){
			playbackInstance.unmute();
		} else {
			playbackInstance.mute();
		}

		Session.set('media.playback.muted',
			PlaybackManager.getInstance().isMute()
		);
	}
};

Template.volume.helpers({
	isMute : function(){
		return Session.get('media.playback.muted');
	}
});