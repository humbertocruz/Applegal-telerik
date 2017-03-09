Controller('noticiasDetalheView',{
	created:function(){
		topTitleVar.set('Notícias');
		backBtnRouteVar.set({
			route:'noticiasRoute',
			params:{}
		});
		Tracker.autorun(function(){
			oneNoticia = Meteor.subscribe("oneNoticia", FlowRouter.getParam('id'), aplicativoIdVar.get());
		});
	},
	helpers:{
		noticia:function(){
			var noticia = Noticia.findOne(FlowRouter.getParam('id'));
			return noticia;
		}
	}
});
