Meteor.publish('allAssuntos', function() {
	return Assunto.find({
		aplicativoId: Aplicativo.findOne()._id
	});
});
