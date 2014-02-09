var assert = require('assert');

describe('Rooms', function(){
    
    describe('rooms subscription', function(){
        it('returns rooms that are live', function(done, server, client) {
            server.eval(function() {
                Rooms.insert({ name : 'Room 1', live : true });
                Rooms.insert({ name : 'Room 2', live : true });
                Rooms.insert({ name : 'Room 3', live : false });
            });

            var rooms = client.evalSync(function() {
                Meteor.subscribe('rooms', function(){
                    emit('return', Rooms.find({}).fetch());
                });
            });

            assert.equal(rooms.length, 2);
            done();
        });
    });
});