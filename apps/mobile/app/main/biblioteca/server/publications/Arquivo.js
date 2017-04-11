Meteor.publish('oneArquivo', function (id) {
	if (id) return Biblioteca.find(id);
	else return false;
});
