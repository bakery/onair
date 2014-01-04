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