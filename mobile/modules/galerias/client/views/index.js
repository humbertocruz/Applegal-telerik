Controller('galeriasView',{
	created:function(){
		topTitleVar.set('Galeria de Fotos');
	},
	rendered:function(){

	},
	helpers:{
		locationOrigin:function(){
			if (location.origin == "http://localhost:4000") {
				return "http://localhost:3000";
			} else {
				return 'https://admin.gremiopioneiro.com.br';
			}
		},
		galerias:function(){
			var galerias = Galeria.find({},{sort:{date:-1}}).fetch();
			return {
				data:galerias,
				count:galerias.length
			}
		}
	},
	events:{
	}
});
