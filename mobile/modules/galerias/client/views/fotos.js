Controller('fotosView',{
	created:function(){
		subsFotos = new SubsManager();
		galeriaFotos = subsFotos.subscribe('galeriaFotos',FlowRouter.getParam('id'));
	},
	helpers:{
		fotos:function(){
			var fotos = Foto.find({galeria_id:FlowRouter.getParam('id')}).fetch();
			return fotos;
		},
		locationOrigin:function(){
			if (location.origin == "http://localhost:4000") {
				return "http://localhost:3000";
			} else {
				return 'https://admin.gremiopioneiro.com.br';
			}
		}
	}
});
