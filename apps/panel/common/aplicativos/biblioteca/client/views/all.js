Controller('aplicativosBibliotecaAllView',{
	created:function(){
		subMenuTitleVar.set({
			title:'Toda sua Biblioteca',
			icon:'theme'
		});
		bibliotecaTypesVar.set([
			'logotype',
			'wallpaper',
			'noticia',
			'documento',
			'galeria',
			'enquete'
		]);
		Tracker.autorun(function(){
			var page = FlowRouter.getQueryParam('page');
			var aplicativoId = FlowRouter.getParam('aplicativoId');
			var libType = bibliotecaTypesVar.get();
			appBiblioteca = Meteor.subscribe("appBiblioteca", page, aplicativoId, 12, libType);
		});
	},
	helpers:{
	}
});
