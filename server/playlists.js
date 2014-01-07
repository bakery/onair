// Playlists API

Meteor.methods({

    // create a playlist
    createPlaylist : function(roomId, media){
        var mediaData = media || [];
        return Playlists.insert({
            dj : this.userId, room : roomId, media : media
        });
    },

    addMediaToPlaylist : function(options){
        
        console.log("adding media");

        var room = options.room;
        var media = options.media;

        Playlists.find({ room : room, dj : this.userId }).forEach(function (playlist) {
            console.log("playlist is", playlist);

            if( playlist){
                Playlists.update(playlist._id,  { $push: { media: media } });
            } else {
                console.error('Cannot add anything to this list');
            }
        });

        return [];
    },

    // sync a playlist
    syncPlaylist : function(options){
        var data = options;

        if(typeof data._id === 'undefined'){
            _.extend(data, {
                author : this.userId
            });

            return Playlists.insert(data);
        } else {
            return Playlists.update({_id: data._id}, data);
        }
    },

    // get playlist for the room
    getPlaylistForTheRoom : function(options){
        return Playlists.find({ room : options.room });
        //return roomId;
    }
});