Foto = new Mongo.Collection('fotos');
Foto.helpers({
	galeria:function(){
		return Galeria.find(this.galeria_id);
	}
});
