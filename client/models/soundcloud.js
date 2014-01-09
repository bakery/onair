Soundcloud = {
    getFavorites : function(callback){

        console.log('SC : getting favorites');

        SC.get("/me/favorites", function(response){
            
            if(response.errors){
                //TODO: do smth here
                return;
            }

            if(callback){
                callback(response);
            }

            Session.set('sc.favorites',response);
        });
    },

    checkOAuth : function(){

        var Soundcloud = this;

        return Meteor.subscribe('SC.OAuth',function(){

            //TODO: check for errors

            var user = Meteor.user();
            if(user){
                if(user.services.soundcloud){
                    var accessToken = user.services.soundcloud.accessToken;
                    if(accessToken){
                        console.log('setting access token');
                        SC.accessToken(accessToken);

                        //load favorites
                        Soundcloud.getFavorites();
                    }
                }
            }
        });
    }
};