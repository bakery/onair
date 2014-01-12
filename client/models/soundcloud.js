var dep = new Deps.Dependency;


Soundcloud = {
    getFavorites : function(){
        dep.depend();

        console.log('SC : getting favorites');

        if(typeof this.favorites === 'undefined'){
            this.favorites = [];
            
            SC.get("/me/favorites",_.bind(function(response){
                
                if(response.errors){
                    //TODO: do smth here
                    return;
                }

                this.favorites = response;
                dep.changed();                

            },this));
        }

        return this.favorites;
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
                    }
                }
            }
        });
    }
};