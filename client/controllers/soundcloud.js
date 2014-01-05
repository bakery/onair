// Soundcloud favorites
SCFavoritesController = RouteController.extend({
    template: 'sc-favorites',

    _updatePlaylist : function(){

        if(this.playlist.getSize() !== 0 && !this.playlist.isPlaying()){
            this.playlist.play();
        }

        var position = this.playlist.getPosition();
        var duration = this.playlist.getDuration();

        Session.set('sc.playlist', this.playlist.toJSON());
    },

    before : function(){
        
        this.playlist = new Playlist();

        this.playlist.on('ping', _.bind(function(position){
            this._updatePlaylist();
        },this));

        this.channel = postal.channel();
        this.channel.subscribe('track.addtoplaylist', _.bind(function(track){
            this.playlist.addMedia(Sounds.createSoundFromSoundCloud(track));
            this._updatePlaylist();
        },this));


        Soundcloud.getFavorites();
    }
});