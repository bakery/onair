Template.newRoomForm.events = {
	'submit form' : function(event, template){
		var name = $(template.find('input[name="name"]')).attr('value');
		var description = $(template.find('textarea[name="description"]')).attr('value');
		
		if(name && description){
			Meteor.call('createRoom', { name : name, description : description }, function(error, room){
				if(error){
					alert('Something went wrong');
				} else {
					Router.go('room', {id: room});
				}
			});
		} else {
			alert('Room needs a good name and a description');
		}

		return false;
	}
};