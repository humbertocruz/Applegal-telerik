Controller('aplicativosBibliotecaAllView',{
	created:function(){
		var me = this;
		subMenuTitleVar.set({
			title:'Toda sua Biblioteca',
			icon:'theme'
		});
		bibliotecaTypesVar.set([
			'logotype',
			'wallpaper',
			'noticia',
			'documento',
			'album',
			'enquete'
		]);
		me.autorun(function(){
			var page = FlowRouter.getQueryParam('page');
			var aplicativoId = FlowRouter.getParam('aplicativoId');
			var libType = bibliotecaTypesVar.get();
			appBiblioteca = me.subscribe("appBiblioteca", page, aplicativoId, 12, libType);
		});
	},
	helpers:{
	}
});
