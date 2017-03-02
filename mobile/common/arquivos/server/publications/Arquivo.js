Meteor.publish('oneArquivo', function (id) {
	if (id) return Arquivo.find(id);
	else return false;
});
