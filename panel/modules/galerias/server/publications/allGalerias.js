Meteor.publishComposite('allGalerias', function(search,page,aplicativoId){
	if (typeof(aplicativoId) == 'undefined') return false;
	return {
		find:function(){
			if (!page) page = 1;
			if (!search) search = {};
			search.aplicativoId = aplicativoId;
			Counts.publish(this,'allGalerias',Galeria.find(search));
			var galerias = Galeria.find(search,{sort:{date:-1},limit:10,skip:(page-1)*10});
			return galerias;
		},
		children:[
			{
				find:function(galeria){
					return appGaleriaFoto.find({
						'metadata.galeriaId':galeria._id,
						'metadata.aplicativoId':aplicativoId
					});
				}
			}
		]
	}
});

Meteor.publishComposite('oneGaleria', function(id,aplicativoId){
	return {
		find:function(){
			search = {};
			var galeria = Galeria.find({
				_id: id,
				aplicativoId: aplicativoId
			});
			return galeria;
		},
		children:[
			{
				find:function(galeria){
					return appGaleriaFoto.find({
						'metadata.galeriaId':galeria._id,
						'metadata.aplicativoId':aplicativoId
					});
				}
			}
		]
	}
});
