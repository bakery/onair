// basic playlist 
//  - add media 
//  - play media 
//  - go to the next media when done with the current one
//  - events
//      - ping


Playlist = function(){
    this.initialize();
};

_.extend(Playlist.prototype, Backbone.Events,{

    initialize : function(){
        this._items = [];
        this._currentIndex = 0;
        this._playing = false;
    },

    addMedia : function(media){
        media.on('state-changed', _.bind(this._onMediaStateChanged,this));
        media.on('ping', _.bind(this._onMediaPing, this));
        this._items.push(media);
    },

    play : function(){

        if(this._playing){
            throw 'The list is already playing';
        }

        if(this.getSize() === 0){
            throw 'Cannot play : the playlist is empty';
        } else {
            this._playMedia();
        }
    },

    isPlaying : function(){
        return this._playing;
    },

    getSize : function(){
        return this._items.length;
    },

    getDuration : function(){
        return _.reduce(this._items, function(memo, media){
            return memo + media.getDuration();
        }, 0);
    },

    getPosition : function(){
        if(!this._playing){
            return 0;
        } else {
            var items = this._items;
            // elapsed time of all previous media items + position of the current item
            return _.reduce(this._previousMedia(), function(memo, media){
                return memo + media.getDuration();
            }, 0) + this._currentMedia().getPosition();
        }
    },

    toJSON : function(){
        var position = this.getPosition();
        var duration = this.getDuration();

        return {
            items : _.map(this._items, function(i){ return i.toJSON(); }),
            position : position,
            duration : duration,
            tracks : this.getSize(),
            progress : Math.floor((position/duration)*100)
        };
    },

    _currentMedia : function(){
        return this._items[this._currentIndex];
    },

    // things that have been played
    _previousMedia : function(){
        return this._currentIndex > 0 ? _.map(_.range(0, this._currentIndex+1), _.bind(function(i){
            return this._items[i];
        },this)) : [];
    },

    _playMedia : function(){
        this._items[this._currentIndex].play();
        this._playing = true;
    },

    _onMediaStateChanged : function(media){
        if(media.isPlaying()){
            console.log('Playlist : started playing stuff');
        } else {
            //playback is complete
            if((this._currentIndex+1) >= this._items.length){
                console.log('Playlist : out of media');
            } else {
                console.log('Playlist : swiching to new media');

                this._currentIndex++;
                this._items[this._currentIndex].play();
            }
        }
    },

    _onMediaPing : function(position){
        this.trigger('ping',{ position : this.getPosition() });
    }
});


// synced playlist
// extends basic playlist and syncs it with the server

SyncedPlaylist = function(){
    this.initialize();
};

_.extend(SyncedPlaylist.prototype, Playlist.prototype, {
    initialize : function(){
        Playlist.prototype.initialize.call(this);
        this.on('ping', this._onListPing, this);
    },

    _onListPing : function(){
        console.log('server syncing the playlist');
        this._sync();
    },

    _sync : function(){
        var data = _.extend({ _id : this._serverPlaylistId },{
            playlist : this.toJSON()
        });

        Meteor.call('syncPlaylist', data, _.bind(function(error,playlistId){
            if(error){
                console.error('playlist sync failed',error);
            }

            this._serverPlaylistId = playlistId;

        },this));
    }
});


