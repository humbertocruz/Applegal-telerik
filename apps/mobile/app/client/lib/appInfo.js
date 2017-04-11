Meteor.startup(function(){
	clientApp = false;
	Tracker.autorun(function(){
		var aInfo = navigator.appInfo;
		clientApp = Meteor.subscribe("clientApp", aInfo);
	});
});
