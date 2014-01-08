Router.configure({
    layoutTemplate: 'layout'
});


var filters = {
    isLoggedIn: function() {
        if (!(Meteor.loggingIn() || Meteor.user())) {
            this.render('signin');
            this.stop();
        }
    }
};

Router.before(filters.isLoggedIn, {only: ['room']});

Router.map(function () {
    this.route('landing', {
        path: '/',
        controller : 'LandingController'
    });

    this.route('rooms', {
        path: '/rooms',
        controller: 'RoomsController'
    });

    this.route('room', {
        path: '/room/:id',
        controller: 'RoomController'
    });
});