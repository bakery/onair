Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function () {
  this.route('landing', {
    path: '/',
    controller : 'LandingController'
  });
});