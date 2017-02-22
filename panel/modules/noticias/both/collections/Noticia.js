Noticia = new Mongo.Collection('noticias');
Noticia.helpers({
	assunto:function(){
		return Assunto.findOne({
			_id:this.assunto_id,
			aplicativoId: FlowRouter.getParam('aplicativoId')
		});
	},
	foto:function(){
		return Foto.find({
			modulo_id: this.id,
			aplicativoId: FlowRouter.getParam('aplicativoId')
		});
	}
});
