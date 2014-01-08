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