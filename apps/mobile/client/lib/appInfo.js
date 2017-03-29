Meteor.startup(function(){
	Tracker.autorun(function(){
		var aInfo = navigator.appInfo;
		Meteor.subscribe("clientApp", aInfo);
	});
});
