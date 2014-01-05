// list of rooms
RoomsController = RouteController.extend({
    template: 'rooms',

    waitOn: function () {
        return Meteor.subscribe('rooms');
    },

    data: function () {
        return {
            rooms : Rooms.find({})
        };
    }
});

//specific room
RoomController = RouteController.extend({
    template: 'room',

    load : function(){
        this.playlist = new SyncedPlaylist();

        this.playlist.on('ping', _.bind(function(position){
            this._updatePlaylist();
        },this));

        this.channel = postal.channel();
        this.channel.subscribe('track.addtoplaylist', _.bind(function(track){
            this.playlist.addMedia(Sounds.createSoundFromSoundCloud(track));
            this._updatePlaylist();
        },this));

        Soundcloud.getFavorites();
    },

    after : function(){
        this.render('sc-favorites', {to: 'favorites'});
        this.render('playlist', {to: 'playlist'});
    },

    waitOn: function () {
        return Meteor.subscribe('rooms');
    },

    data: function () {
        return {
            room : Rooms.findOne({ _id : this.params.id })
        };
    },

    _updatePlaylist : function(){

        if(this.playlist.getSize() !== 0 && !this.playlist.isPlaying()){
            this.playlist.play();
        }

        var position = this.playlist.getPosition();
        var duration = this.playlist.getDuration();

        Session.set('sc.playlist', this.playlist.toJSON());
    }
});