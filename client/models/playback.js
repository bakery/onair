PlaybackManager = function(){
    this._items = [];
    this._playing = false;
    this._currentIndex = 0;
    this._setup();
    this._playbackPosition = 0;

    // TODO: get rid of this - debugging only

    this.channel = postal.channel();
    this.channel.subscribe('playback.next', _.bind(function(){
        if(this._currentIndex + 1 < this._items.length){
            this._currentIndex++;
            this._playMedia();
        }
    },this));
    this.channel.subscribe('playback.prev', _.bind(function(){
        if(this._currentIndex - 1 >= 0){
            this._currentIndex--;
            this._playMedia();
        }
    },this));
};


PlaybackManager.prototype = {

    _setup : function(){
        Deps.autorun(_.bind(function () {
            var playlist = Playlists.findOne({});
            if(playlist){
                console.log('updating playlist data', playlist);
                this._items = playlist.media;
            }
        },this));
    },

    _playMedia : function(){

        if(this._sound){
            this._sound.destruct();
        }

        var media = this._items[this._currentIndex];

        // only SC for now

        SC.stream(media.stream_url, _.bind(function(sound){
            this._sound = sound;

            sound.play({
                onfinish : _.bind(this._onFinish, this),
                whileplaying : _.bind(this._onPing, this)
            });

        },this));
    },

    _onPing : function(){
        this._playing = true;

        var position = this.getPosition();
        var duration = this.getDuration();

        postal.publish({
            topic : 'media.playback.ping',
            data : {
                media : this._currentMedia(),
                duration : duration,
                playing : this._playing,
                position : position,
                positionPercentage : Math.floor((position/duration)*100)
            }
        });
    },

    _onFinish : function(){

        this._playbackPosition = 0;

        this._currentIndex++;
        this._playMedia();
    },

    play : function(){
        this._playMedia();
    },

    getDuration : function(){
        return _.reduce(this._items, function(memo, media){
            return memo + media.duration;
        }, 0);
    },

    getPosition : function(){
        if(!this._playing){
            return 0;
        } else {
            // elapsed time of all previous media items + position of the current item
            var previousMedia = this._previousMedia();
            var previousTime = _.reduce(previousMedia, function(memo, media){
                return memo + media.duration;
            }, 0);
            var currentPosition = this._sound ? this._sound.position : 0;

            return previousTime + currentPosition;
        }
    },

    _currentMedia : function(){
        return this._items[this._currentIndex];
    },

    // things that have been played
    _previousMedia : function(){
        return this._currentIndex > 0 ? _.map(_.range(0, this._currentIndex), _.bind(function(i){
            return this._items[i];
        },this)) : [];
    }
};
