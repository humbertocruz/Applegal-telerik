Meteor.publish('allDocumentos', function(search,page,aplicativoId){
	if (!securityCheck(this.userId, ['manager','documentos'],aplicativoId)) return this.ready();
	if (!search) search = {};
	if (!page) page = 1;
	search.aplicativoId = aplicativoId;
	var pages = 10;
	Counts.publish(this,'allDocumentos',Documento.find(search), { noReady: true });
	var documentos = Documento.find(search,{sort:{data:-1},limit:pages,skip:(page-1)*pages});
	if (documentos.count() == 0) return this.ready();
	var tipos =  Tipo.find({
		_id:{
			$in: _.pluck(documentos,'tipo_id')
		},
		aplicativoId:aplicativoId
	});
	return [documentos,tipos];
});
