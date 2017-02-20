Chamado = new Mongo.Collection('chamados');
Chamado.helpers({
  remetente:function(){
    return Meteor.users.findOne(this.user_id);
  },
	mensagens:function(){
		return Mensagem.find({chamado_id:this._id,aplicativoId:aplicativoVar.get()._id}).fetch();
	}
});
