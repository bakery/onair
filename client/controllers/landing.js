LandingController = RouteController.extend({
    template: 'landing',

    onBeforeAction : function(){
        Deps.autorun(function () {
            if(Meteor.user()){
                Router.go('rooms');
            }
        });
    },

    onAfterAction : function(){
        this.render('signin',{ to : 'auth'});
    }
});