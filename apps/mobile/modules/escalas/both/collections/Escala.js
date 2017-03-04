Escala = new Mongo.Collection('escalas');
Escala.helpers({
	servico:function(){
		return Servico.findOne(this.servico_id);
	}
});
