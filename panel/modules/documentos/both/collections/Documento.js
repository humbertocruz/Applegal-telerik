Documento = new Mongo.Collection('documentos');
Documento.helpers({
	tipo:function(){
		return Tipo.findOne({
			_id:this.tipo_id,
			aplicativoId:FlowRouter.getParam('aplicativoId')
		});
	}
});
