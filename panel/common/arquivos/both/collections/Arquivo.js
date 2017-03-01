Arquivo = new FileCollection('arquivos', {
	resumable: true,
	resumableIndexName: 'appL',
	http: [
		{
			method: 'get',
			path: '/md5/:md5',
			lookup: function (params, query) {
				return {
					'md5': params.md5
				};
			}
		}
	]
});
Arquivo.helpers({
	tipo:function(){
		return TipoArquivo.findOne(this.metadata.tipoArquivoId);
	}
});

// Tipos de Arquivo
TipoArquivo = new Mongo.Collection("tipos_arquivos");
