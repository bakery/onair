LandingController = RouteController.extend({
    template: 'landing',

    before : function(){
        Deps.autorun(function () {
            if(Meteor.user()){
                Router.go('rooms');
            }
        });
    },

    after : function(){
        this.render('signin',{ to : 'auth'});
    }
});