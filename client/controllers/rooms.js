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


    before : function(){
        var room = this.params.id;
        this.subscribe('roomById', room).wait();
        this.subscribe('playlistsForRoom', room).wait();
        this.subscribe('listenersForRoom', room).wait();
    },

    after : function(){
        Soundcloud.getFavorites();

        this.render('sc-favorites', {to: 'favorites'});
        this.render('playlist', {to: 'playlist'});
        this.render('listeners', {to : 'listeners'});

        this._checkSync();
    },

    waitOn : function(){
        return Soundcloud.checkOAuth();
    },

    _checkSync : function(){
        var theRoom = Rooms.findOne({});
        
        if(typeof theRoom === 'undefined'){
            console.log('trying to sync the room but it is not ready');
            return;
        }

        if(theRoom.live){
            // if the room is live already, sync playback
            Meteor.call('syncRoom',theRoom._id,function(error,response){
                if(error){
                    // TODO : better error handling
                    alert('cannot sync current da room - horror');
                    return;
                } else {
                    postal.publish({
                        topic : 'playback.needs.sync',
                        data : response
                    });
                }
            });

            //register listener
            Meteor.call('registerListener',theRoom._id);
        }
    }
});