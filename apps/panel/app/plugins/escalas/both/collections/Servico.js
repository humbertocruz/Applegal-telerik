Servico = new Mongo.Collection('plg_escalas_servicos');
Servico.helpers({
	escalas:function(){
		return Servico.find({
			servico_id:this._id,
			aplicativoId:FlowRouter.getParam('aplicativoId')
		});
  }
});
