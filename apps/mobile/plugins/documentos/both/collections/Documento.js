Documento = new Mongo.Collection('plg_documentos_documentos');
Documento.helpers({
	tipo:function(){
		return Tipo.findOne(this.tipo_id);
	}
})
