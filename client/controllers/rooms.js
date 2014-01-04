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

    waitOn: function () {
        return Meteor.subscribe('rooms');
    },

    data: function () {
        return {
            room : Rooms.findOne({ _id : this.params.id })
        };
    }
});