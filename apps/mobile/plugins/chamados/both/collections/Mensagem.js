Mensagem = new Mongo.Collection('mensagens');
Mensagem.helpers({
	user:function(){
		return Meteor.users.findOne(this.user_id);
	}
});
