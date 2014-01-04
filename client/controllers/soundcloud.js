// Soundcloud favorites
SCFavoritesController = RouteController.extend({
    template: 'sc-favorites',

    before : function(){
        Soundcloud.getFavorites();
    }
});