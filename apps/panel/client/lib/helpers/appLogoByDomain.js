Template.registerHelper("appLogoByDomain", function(){
	Tracker.autorun(function(){
		appByDomainSubs = Meteor.subscribe("appByDomain", location.protocol, location.hostname);
	});
	var appByDomain = Aplicativo.findOne({
		domain: location.protocol+'//'+location.hostname
	});
	if (appByDomain) {
		return appByDomain.appLogo;
	} else {
		return 'AppLegal';
	}
});
