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
		me.currentPage = function(){return FlowRouter.getQueryParam('page');};
		me.appId = function(){return FlowRouter.getParam('aplicativoId');};
		me.libTypes = function(){return bibliotecaTypesVar.get();};
		me.qtdPage = function(){return 12;}
		me.autorun(function(){
			allBiblioteca = me.subscribe(
				'appBiblioteca',
				me.currentPage(),
				me.appId(),
				me.qtdPage(),
				me.libTypes()
			);
		});
	},
	helpers:{
	}
});
