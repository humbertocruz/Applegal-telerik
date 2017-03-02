Template.registerHelper("arquivoPath", function(id){
	if (!id) return '/images/photo.png';
	oneArquivo = Meteor.subscribe('oneArquivo', id);
	if (oneArquivo.ready()) {
		var arquivo = Arquivo.findOne(id);
		if (arquivo) return Arquivo.baseURL+'/md5/'+arquivo.md5;
		else return '/images/photo.png';
	} else {
		return '/images/loading.gif';
	}
});
