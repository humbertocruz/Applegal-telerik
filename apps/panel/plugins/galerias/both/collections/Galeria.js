Galeria = new Mongo.Collection('galerias');
Galeria.helpers({
	fotos:function(){
		return Arquivo.find({
			galeriaId:this._id,
			tags:{
				$all:[
					'photo',
					FlowRouter.getParam('aplicativoId')
				]
			}
		},{
			limit:50
		}).fetch();
	}
});
