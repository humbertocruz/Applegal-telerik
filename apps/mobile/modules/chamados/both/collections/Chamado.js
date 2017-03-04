Chamado = new Mongo.Collection('chamados');
Chamado.helpers({
	mensagens:function(){
		return Mensagem.find({chamado_id:this._id}).fetch();
	}
});
