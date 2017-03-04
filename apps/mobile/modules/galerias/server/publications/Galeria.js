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
						'metadata.galeriaId':galeria._id
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
						'metadata.galeriaId':galeria._id
					});
				}
			}
		]
	}
});
