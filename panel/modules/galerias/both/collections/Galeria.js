Galeria = new Mongo.Collection('galerias');
Galeria.helpers({
	fotos:function(){
		return Foto.find(
			{
				modulo_id:this._id,
				aplicativoId:FlowRouter.getParam('aplicativoId')
			}).fetch();
	}
});
