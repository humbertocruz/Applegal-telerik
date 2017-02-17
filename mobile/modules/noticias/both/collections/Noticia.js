Noticia = new Mongo.Collection('noticias');
Noticia.helpers({
	assunto:function(){
		return Assunto.findOne(this.assunto_id);
	}
});
