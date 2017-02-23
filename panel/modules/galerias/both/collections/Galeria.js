Galeria = new Mongo.Collection('galerias');
Galeria.helpers({
	fotos:function(){
		return appGaleriaFoto.find(
			{
				'metadata.aplicativoId':FlowRouter.getParam('aplicativoId'),
				'metadata.galeriaId':this._id
			}
		).fetch();
	}
});
