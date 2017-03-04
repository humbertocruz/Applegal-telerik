Noticia = new Mongo.Collection('noticias');
Noticia.helpers({
	assunto:function(){
		return Assunto.findOne({
			_id:this.assunto_id,
			aplicativoId: FlowRouter.getParam('aplicativoId')
		});
	}
});
