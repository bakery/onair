var assert = require('assert');

describe('Rooms:', function(){

    var currentUser;

    var login = function(){
        var userId = Accounts.createUser({email: 'a@a.com', password: '123456', profile: {}});
        Meteor.loginWithPassword('a@a.com', '123456', function() {
            emit('return');
        });
    };

    var logout = function(){
        Meteor.logout(function(){
            emit('return');
        });
    };

    describe('createRoom wo user', function(){
        it('throws an exception if the user is not authenticated', function(done,server,client){
            //make sure we don't have a user authenticated
            var currentUser = server.evalSync(function(){
                emit('return', this.userId);
            });

            assert.ok(!currentUser,'unexpected authenticated someone');

            client.eval(function(){
                Meteor.call('createRoom', { name: 'Room', description: 'desc' }, function(error,result){
                    emit('error',error);
                });
            }).once('error',function(error){
                assert.ok(error, 'expects an exception to be thrown');
                assert.equal(error.error, 401, 'expects 401 error code');
                done();
            });
        });
    });

    describe('createRoom', function(){

        it('throws an exception if name and description are not provided', function(done,server,client){
            
            //this should be moved to 'before' function
            client.evalSync(login);

            client.eval(function(){
                Meteor.call('createRoom', {}, function(error,result){
                    emit('error',error);
                });
            }).once('error',function(error){
                assert.ok(error, 'expects an exception to be thrown');
                assert.equal(error.error, 400, 'expects 400 error code');
                done();
            });
        });

        it('creates a new room for the current user with name and description',
            function(done,server,client){

                //this should be moved to 'before' function
                client.evalSync(login);

                client.eval(function(){
                    Meteor.call('createRoom', { name : 'name', description : 'description'},
                        function(error,result){
                            emit('result',result);
                        }
                    );
                }).once('result',function(result){
                    assert.ok(result, 'expects a room object back');
                    assert.equal(result.name,'name','expects name to be set correctly');
                    assert.equal(result.description,'description','expects description to be set correctly');
                    done();
                });
            }
        );

        it('creates a room that is not live', function(done,server,client){
            //this should be moved to 'before' function
            client.evalSync(login);

            client.eval(function(){
                Meteor.call('createRoom', { name : 'name', description : 'description'},
                    function(error,result){
                        emit('result',result);
                    }
                );
            }).once('result',function(result){
                assert.ok(result, 'expects a room object back');
                assert.equal(result.live,false);
                done();
            });
        });

        it('creates a room with the dj set containing current user', function(done,server,client){
            //this should be moved to 'before' function
            client.evalSync(login);

            var currentUser = server.evalSync(function(){
                emit('return', Meteor.users.findOne({}));
            });

            var newRoom = client.evalSync(function(){
                Meteor.call('createRoom', { name : 'name', description : 'description'},
                    function(error,result){
                        emit('return',result);
                    }
                );
            });

            assert.equal(newRoom.djs.length,1);
            assert.equal(newRoom.djs[0].id,currentUser._id,'expects current user to be the dj');

            done();
        });

        it('also creates an empty playlist', function(done,server,client){
            client.evalSync(login);

            client.evalSync(function(){
                Meteor.call('createRoom', { name : 'name', description : 'description'},
                    function(error,result){
                        emit('return', result);
                    }
                );
            });

            var playlist = server.evalSync(function(){
                emit('return', Playlists.findOne({}));
            });

            assert.ok(playlist,'expects a playlist');
            done();
        });
    });

    // describe('rooms subscription', function(){
    //     it('returns rooms that are live', function(done, server, client) {
    //         server.eval(function() {
    //             Rooms.insert({ name : 'Room 1', live : true });
    //             Rooms.insert({ name : 'Room 2', live : true });
    //             Rooms.insert({ name : 'Room 3', live : false });
    //         });

    //         var rooms = client.evalSync(function() {
    //             Meteor.subscribe('rooms', function(){
    //                 emit('return', Rooms.find({}).fetch());
    //             });
    //         });

    //         assert.equal(rooms.length, 2);
    //         done();
    //     });
    // });
});