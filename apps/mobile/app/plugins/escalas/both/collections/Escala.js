Escala = new Mongo.Collection('plg_escalas_escalas');
Escala.helpers({
	servico:function(){
		return Servico.findOne(this.servico_id);
	}
});
