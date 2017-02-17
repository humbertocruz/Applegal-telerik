Galeria = new Mongo.Collection('galerias');
Galeria.helpers({
	fotos:function(){
		return Foto.find({galeria_id:this._id}).fetch();
	}
});
