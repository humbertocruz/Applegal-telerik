Controller('noticiasDetalheView',{
	created:function(){
		var app = Aplicativo.findOne();
		if (!app) return false;
		oneNoticia = Meteor.subscribe("oneNoticia", FlowRouter.getParam('id'), app._id);
	},
	helpers:{
		noticia:function(){
			var noticia = Noticia.findOne(FlowRouter.getParam('id'));
			return noticia;
		}
	}
});
