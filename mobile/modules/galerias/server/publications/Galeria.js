Meteor.publishComposite('',function(){
	return {
		find:function(){
			var galerias = Galeria.find({active:true});
			return galerias;
		},
		children:[
			{
				find:function(galeria){
					return Foto.find({galeria_id:galeria._id});
				}
			}
		]
	}
});

Meteor.publish('galeriaFotos',function(galeria_id){
  var fotos = Foto.find({galeria_id:galeria_id});
	return fotos;
});
