Meteor.publish('appLogo', function (aplicativoId) {
	return appLogo.find({
		'metadata._Resumable': { $exists: false },
		'metadata.aplicativoId': aplicativoId
	});
});
