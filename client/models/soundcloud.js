Soundcloud = {
    getFavorites : function(callback){
        SC.get("/me/favorites", function(response){
            if(callback){
                callback(response);
            }

            Session.set('sc.favorites',response);
        });
    },

    checkOAuth : function(){
        return Meteor.subscribe('SC.OAuth',function(){

            //TODO: check for errors

            var user = Meteor.user();
            if(user){
                if(user.services.soundcloud){
                    var accessToken = user.services.soundcloud.accessToken;
                    if(accessToken){
                        console.log('setting access token');
                        SC.accessToken(accessToken);
                    }
                }
            }
        });
    }
};