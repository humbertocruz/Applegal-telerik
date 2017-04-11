Chamado = new Mongo.Collection('plg_chamados_chamados');
Chamado.helpers({
	remetente:function(){
		return Meteor.users.findOne(this.user_id);
	},
	mensagens:function(){
		return Mensagem.find({
			chamado_id: this._id,
			aplicativoId:FlowRouter.getParam('aplicativoId')
		}).fetch();
	}
});
