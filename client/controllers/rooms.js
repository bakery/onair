// list of rooms
RoomsController = RouteController.extend({
    template: 'rooms',

    waitOn: function () {
        return [Meteor.subscribe('rooms'), Soundcloud.checkOAuth()];
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
        this.channel = postal.channel();

        this.channel.subscribe('track.addtoplaylist', _.bind(function(track){
            Meteor.call('addMediaToPlaylist', {
                media : track,
                room : this.params.id
                }, function(){});
        },this));

        this.channel.subscribe('room.islive', _.bind(function(){
            this.playbackManager.play();
        },this));

        this.playbackManager = new PlaybackManager();
    },

    after : function(){
        Soundcloud.getFavorites();

        this.render('sc-favorites', {to: 'favorites'});
        this.render('playlist', {to: 'playlist'});
    },

    waitOn: function () {
        var room = this.params.id;

        return [
            Meteor.subscribe('roomById', room),
            Meteor.subscribe('playlistsForRoom', room),
            Soundcloud.checkOAuth()
        ];
    }
});