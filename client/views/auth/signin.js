var handleOAuth = function(e){
    if(typeof e !== 'undefined'){
        alert('Something went terribly wrong. Run around scream and shout.');
    } else {
        if(typeof Router.current().params.callback !== 'undefined'){
            var url = decodeURIComponent(Router.current().params.callback);
            Router.go(url);
        }
    }
};

Template.signin.events = {
    'click .login-sc' : function(){
        Meteor.loginWithSoundcloud(handleOAuth);
    },

    'click .login-fb' : function(){
        Meteor.loginWithFacebook(handleOAuth);
    }
};