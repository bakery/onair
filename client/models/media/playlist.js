// basic playlist 
//  - add media 
//  - play media 
//  - go to the next media when done with the current one

Playlist = function(){
    this._items = [];
    this._currentIndex = 0;
    this._playing = false;
};

Playlist.prototype = {
    addMedia : function(media){
        media.on('state-changed', _.bind(this._onMediaStateChanged,this));
        this._items.push(media);
    },

    play : function(){

        if(this._playing){
            throw 'The list is already playing';
        }

        if(this.size() === 0){
            throw 'Cannot play : the playlist is empty';
        } else {
            this._playMedia();
        }
    },

    size : function(){
        return this._items.length;
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
};