// Rooms API

Meteor.methods({
    createRoom: function(options){
        var data = _.extend(options, {
            live : false,
            djs : [this.userId]
        });

        var room = Rooms.insert(data);

        // auto create a playlist for the new room
        Meteor.call('createPlaylist', room, []);

        return room;
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