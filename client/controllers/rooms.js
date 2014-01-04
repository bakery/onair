// list of rooms
RoomsController = RouteController.extend({
    template: 'rooms',

    before: function () {
    },

    after: function () {
    },

    waitOn: function () {
        return Meteor.subscribe('rooms');
    },

    data: function () {
        return {
            rooms : Rooms.find({})
        };
    }

    // action: function () {
    //  if we want to override default behavior 
    // }
});

//specific room
RoomController = RouteController.extend({
    template: 'room',

    before: function () {

    },

    after: function () {
    },

    waitOn: function () {
        return Meteor.subscribe('rooms');
    },

    data: function () {
        return {
            room : Rooms.findOne({ _id : this.params.id })
        };
    }

    // action: function () {
    //  if we want to override default behavior 
    // }
});