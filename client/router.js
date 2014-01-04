Router.configure({
    layoutTemplate: 'layout'
});

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

    this.route('sc-favorites', {
        path: '/sc/favorites',
        controller: 'SCFavoritesController'
    });
});