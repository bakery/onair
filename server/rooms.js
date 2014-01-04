// Rooms API

Meteor.methods({
    createRoom: function(options){
        return Rooms.insert(options);
    }
});