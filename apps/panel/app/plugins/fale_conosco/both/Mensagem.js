Mensagem = new Mongo.Collection('plg_chamados_mensagens');
Mensagem.helpers({
	remetente:function(){
		return Meteor.users.findOne({
			_id:this.user_id,
			aplicativoId:FlowRouter.getParam('aplicativoId')
		});
	}
});
