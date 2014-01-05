
Sounds = {
    // track - soundcloud track data
    createSoundFromSoundCloud : function(track){
        return new Sound({
            duration: track.duration,
            id: track.id,
            stream_url: track.stream_url,
            title: track.title,
            description: track.description,
            username : (track.user ? track.user.username : null),
            waveform_url: track.waveform_url,
            artwork_url: track.artwork_url
        });
    }
};


var Sound = function(attributes){
    this.attributes = _.extend({}, attributes);
    this._playing = false;
};

_.extend(Sound.prototype, Media.prototype, {
    play : function(){
        SC.stream(this.attributes.stream_url, _.bind(function(sound){
            this._updateState(true);

            sound.play({
                onfinish : _.bind(function(){
                    this._updateState(false);
                },this)
            });
        },this));
    },

    isPlaying : function(){
        return this._playing;
    },

    getAttributes : function(){
        return _.extend({}, this.attributes);
    },

    _updateState : function(playing){
        this._playing = playing;
        this.trigger('state-changed',this);
    }
});