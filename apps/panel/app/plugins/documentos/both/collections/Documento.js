Documento = new Mongo.Collection('plg_documentos_documentos');
Documento.helpers({
	tipo:function(){
		return Tipo.findOne({
			_id:this.tipo_id,
			aplicativoId:FlowRouter.getParam('aplicativoId')
		});
	}
});
