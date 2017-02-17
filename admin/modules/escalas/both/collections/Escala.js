Escala = new Mongo.Collection('escalas');
Escala.helpers({
	servico:function(){
		return Servico.findOne({
			_id:this.servico_id,
			aplicativoId:aplicativoVar.get()._id
		});
	}
});
