Noticia = new Mongo.Collection('plg_noticias_noticias');
Noticia.helpers({
	assunto:function(){
		return Assunto.findOne(this.assunto_id);
	}
});
