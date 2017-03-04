Meteor.startup(function(){
	Tracker.autorun(function(){
		Meteor.subscribe("clientApp", navigator.appInfo);
	});
});
