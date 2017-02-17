Meteor.startup(function(){
	Meteor.subscribe("clientApp", navigator.appInfo);
});
