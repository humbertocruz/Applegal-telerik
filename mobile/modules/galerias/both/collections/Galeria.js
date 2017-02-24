Galeria = new Mongo.Collection('galerias');
Galeria.helpers({
	fotos:function(){
		return appGaleriaFoto.find({
			'metadata.galeriaId':this._id,
			'metadata.aplicativoId': Aplicativo.findOne()._id
		}).fetch();
	}
});
