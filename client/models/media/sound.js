
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
        this._sound = SC.stream(this.attributes.stream_url, _.bind(function(sound){
            this._updateState(true);

            var theSound = this;

            // report ping every 5 seconds or so
            var reportPing = _.throttle(function(position){
                theSound._ping(position);
            }, 5000);

            sound.play({
                onfinish : function(){
                    theSound._updateState(false);
                },

                whileplaying : function(){
                    reportPing(this.position);
                }
            });
        },this));
    },

    isPlaying : function(){
        return this._playing;
    },

    getAttributes : function(){
        return _.extend({}, this.attributes);
    },

    getDuration : function(){
        return this.attributes.duration;
    },

    _updateState : function(playing){
        this._playing = playing;
        this.trigger('state-changed',this);
    },

    _ping : function(position){
        this.trigger('ping', { position : position });
    }
});