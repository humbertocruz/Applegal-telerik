Escala = new Mongo.Collection('plg_escalas_escalas');
Escala.helpers({
	servico:function(){
		return Servico.findOne({
			_id:this.servico_id,
			aplicativoId:FlowRouter.getParam('aplicativoId')
		});
	}
});
