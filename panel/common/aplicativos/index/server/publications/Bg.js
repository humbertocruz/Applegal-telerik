Meteor.publish('appBg', function (aplicativoId) {
	return appBg.find({
		'metadata._Resumable': { $exists: false },
		'metadata.aplicativoId': aplicativoId
	});
});
