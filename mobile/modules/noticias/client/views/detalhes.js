Controller('noticiasDetalheView',{
	created:function(){
		//oneNoticia = Meteor.subscribe("oneNoticia", FlowRouter.getParam('id'));
	},
	helpers:{
		noticia:function(){
			var noticia = Noticia.findOne(FlowRouter.getParam('id'));
			return noticia;
		}
	}
});
