// Playlists API

Meteor.methods({
    // sync a playlist
    syncPlaylist: function(options){
        var data = options;

        if(typeof data._id === 'undefined'){
            _.extend(data, {
                author : this.userId
            });

            return Playlists.insert(data);
        } else {
            return Playlists.update({_id: data._id}, data);
        }
    }
});