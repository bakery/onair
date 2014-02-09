// Rooms API

Meteor.methods({
    createRoom: function(options){
        
        check(options, {
            name : String,
            description : String
        });


        var currentUser = Meteor.user();
        if(!currentUser){
            throw new Meteor.Error(401, 'You must be logged in to create a room');
        }

        var data = _.extend(options, {
            live : false,
            djs : [{
                profile : currentUser,
                id : currentUser._id
            }]
        });

        var room = Rooms.insert(data);

        // auto create a playlist for the new room
        Meteor.call('createPlaylist', room, []);

        return Rooms.findOne({ _id : room });
    },

    goLive : function(room){
        //TODO: check user
        return Rooms.update(room, { $set: {
                wentLive : new Date().getTime(),
                live : true
            }
        });
    },

    syncRoom : function(room){
        var now = new Date().getTime();
        var theRoom = Rooms.findOne({ _id : room });
        return { offset : now - theRoom.wentLive };
    }
});