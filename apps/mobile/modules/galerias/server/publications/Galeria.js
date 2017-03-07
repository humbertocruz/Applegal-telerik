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
					return Arquivo.find({
						galeriaId:galeria._id,
						tags:{
							$all:[
								'photo',
								aplicativoId
							]
						}
					});
				}
			}
		]
	}
});
Meteor.publishComposite('oneGaleria',function(id, aplicativoId){
	return {
		find:function(){
			var galeria = Galeria.find({
				active:true,
				_id: id,
				aplicativoId:aplicativoId
			});
			return galeria;
		},
		children:[
			{
				find:function(galeria){
					return Arquivo.find({
						galeriaId:galeria._id,
						tags:{
							$all:[
								'photo',
								aplicativoId
							]
						}
					});
				}
			}
		]
	}
});
