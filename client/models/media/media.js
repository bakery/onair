// Media is an abstraction for a media piece (e.g. song, video)
// that can be put in a playlist and can be played

Media = function(){};

_.extend(Media.prototype, Backbone.Events, {

    /** Events
        
        state-changed
        ping

    **/

    play : function(){
        throw 'Not implemented';
    },

    isPlaying : function(){
        throw 'Not implemented';
    },

    getAttributes : function(){
        throw 'Not implemented';
    },

    // in ms
    getDuration : function(){
        throw 'Not implemented';
    },

    // im ms
    getPosition : function(){
        throw 'Not implemented';
    },

    toJSON : function(){
        throw 'Not implemented';
    }

});