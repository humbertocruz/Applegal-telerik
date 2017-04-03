Mensagem = new Mongo.Collection('plg_chamados_mensagens');
Mensagem.helpers({
	user:function(){
		return Meteor.users.findOne(this.user_id);
	}
});
