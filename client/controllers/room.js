//specific room


RoomController = RouteController.extend({
    //template: 'room',
    // set to true to prevent syncup
    synced : false,
    firstRender : true,

    onAfterAction : function(){
        console.log('RoomController:after');
        var theRoom = Rooms.findOne({ _id : this.params.id });

        if(theRoom){
            if(!theRoom.live){
                var dj = _.find(theRoom.djs || [], function(dj){
                    return dj.id === Meteor.userId();
                });

                if(typeof dj === 'undefined'){
                    // current user is not one of the djs 
                    // and the room is not live - abort
                    
                    this.stop();
                    this.render('404');
                }
            }
        }
    },

    action : function(){

        if(this.ready()){

            var theRoom = Rooms.findOne({ _id : this.params.id });
            var dj = _.find(theRoom.djs || [], function(dj){
                return dj.id === Meteor.userId();
            });

            this.yieldTemplates = {
                'playlist' : {to: 'playlist'},
                'listeners' : {to : 'listeners'}
            };


            if(typeof dj !== 'undefined'){
                // editable room
                this.template = 'editableRoom';
                this.yieldTemplates['sc-favorites'] = {
                    to : 'favorites'
                };
            } else {
                // 'read-only' room
                this.template = 'room';
            }


            

            RouteController.prototype.action.call(this);

            if(this.firstRender){
                this._checkSync();
            }

            console.log('Room controller : action is called');
            this.firstRender = false;
        }
    },

    waitOn : function(){
        var room = this.params.id;

        return [
            Soundcloud.checkOAuth(),
            this.subscribe('roomById', room),
            this.subscribe('playlistsForRoom', room),
            this.subscribe('listenersForRoom', room)
        ];
    },

    _checkSync : function(){

        if(this.synced){
            return;
        }

        var theRoom = Rooms.findOne({ _id : this.params.id });
        var thePlaylist = Playlists.findOne({ room : this.params.id });

        if(typeof theRoom === 'undefined'){
            console.log('trying to sync the room but it is not ready');
            return;
        }

        if(typeof thePlaylist === 'undefined'){
            console.log('trying to sync the room but the playlist is not ready');
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
    },

    onRun : function(){
        this.channel = postal.channel();

        this.channel.subscribe('track.addtoplaylist', _.bind(function(track){
            Meteor.call('addMediaToPlaylist', {
                media : track,
                room : this.params.id
                }, function(){});
        },this));

        this.channel.subscribe('room.islive', _.bind(function(){
            this.synced = true;
            this.playbackManager.play();
        },this));

        this.playbackManager = new PlaybackManager();
    }
});

// RoomController = RouteController.extend({
//     ,


//     // waitOn : function(){
//     //     var room = this.params.id;

//     //     return [
//     //         Soundcloud.checkOAuth(),
//     //         this.subscribe('roomById', room),
//     //         this.subscribe('playlistsForRoom', room),
//     //         this.subscribe('listenersForRoom', room)
//     //     ];
//     // },
// });