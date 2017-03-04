Meteor.publishComposite('allDocumentos', function(search,page,aplicativoId){
	if (typeof(aplicativoId) == 'undefined') return false;
	return {
		find:function(){
			if (!search) search = {};
			if (!page) page = 1;
			search.aplicativoId = aplicativoId;
			var pages = 10;
			Counts.publish(this,'allDocumentos',Documento.find(search), { noReady: true });
			var documentos = Documento.find(search,{sort:{data:-1},limit:pages,skip:(page-1)*pages});
			return documentos;
		},
		children:[
			{
				find:function(documento){
					return Tipo.find({
						_id:documento.tipo_id,
						aplicativoId:aplicativoId
					});
				}
			}
		]
	}
});

Meteor.publishComposite('oneDocumento', function(id,aplicativoId){
	if (typeof(aplicativoId) == 'undefined') return false;
	return {
		find:function(){
			var documento = Documento.find({
				_id:id,
				aplicativoId:aplicativoId
			});
			return documento;
		},
		children:[
			{
				find:function(documento){
					return Tipo.find({
						_id:documento.tipo_id,
						aplicativoId:aplicativoId
					});
				}
			}
		]
	}
});
