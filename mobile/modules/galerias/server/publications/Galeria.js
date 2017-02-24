Meteor.publishComposite('appGalerias',function(aplicativoId){
	return {
		find:function(){
			var galerias = Galeria.find({
				active:true,
				aplicativoId:aplicativoId
			});
			return galerias;
		},
		children:[
			{
				find:function(galeria){
					return appGaleriaFoto.find({
						'metadata.galeriaId':galeria._id
					});
				}
			}
		]
	}
});
Meteor.publishComposite('oneGalerias',function(id, aplicativoId){
	return {
		find:function(){
			var galerias = Galeria.find({
				active:true,
				_id: id,
				aplicativoId:aplicativoId
			});
			return galerias;
		},
		children:[
			{
				find:function(galeria){
					return appGaleriaFoto.find({
						'metadata.galeriaId':galeria._id
					});
				}
			}
		]
	}
});
