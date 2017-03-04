Documento = new Mongo.Collection('documentos');
Documento.helpers({
	tipo:function(){
		return Tipo.findOne(this.tipo_id);
	}
})
