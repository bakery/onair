Template.listeners.listeners = function(){
	return Listeners.find({});
};

Template.listeners.numberOfListeners = function(){
	return Listeners.find({}).count();
};