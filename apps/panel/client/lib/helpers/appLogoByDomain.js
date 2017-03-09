Template.registerHelper("appLogoByDomain", function(){
	Tracker.autorun(function(){
		appByDomainSubs = Meteor.subscribe("appByDomain", location.protocol, location.hostname);
	});
	if (!appByDomainSubs.ready()) return false;
	var appByDomain = Aplicativo.findOne({
		domain: location.protocol+'//'+location.hostname
	});
	if (appByDomain) {
		return appByDomain.appLogo;
	} else {
		return 'technotronics.png';
	}
});
