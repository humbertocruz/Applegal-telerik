Galeria = new Mongo.Collection('galerias');
Galeria.helpers({
	fotos:function(){
		return Arquivo.find({
			'metadata.type':'photo',
			'metadata.aplicativoId':this.aplicativoId,
			'metadata.galeriaId':this._id
		},{
			limit:50
		}).fetch();
	}
});
