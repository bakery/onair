Template['sc-favorites'].favorites = function(){
	return Session.get('sc.favorites');
};

Template['sc-favorites'].events = {
	'click .stream-button' : function(event, template){
		var url = $(event.currentTarget).data('url');
		Sounds.createSoundFromSoundCloud({ stream_url : url }).play();
	}
};