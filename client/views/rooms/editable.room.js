Template.editableRoom.events = {
    'click .button-golive' : function(event, template){
        var room = $(event.currentTarget).data('room');
        Meteor.call('goLive',room,function(){
            postal.publish({
                topic : 'room.islive'
            });
        });
    }
};

Template.editableRoom.helpers({
    canEdit : function(){
        var dj = _.find(this.djs || [], function(dj){
            return dj.id === Meteor.userId();
        });
        return (typeof dj !== 'undefined');
    },

    djProfile : function(){
        return this.djs ? this.djs[0] : null;
    }
});

Template.editableRoom.room = function(){
    return Rooms.findOne({});
};

Template.editableRoom.playlist = function(){
    return Playlists.findOne({});
};