Chamado = new Mongo.Collection('plg_chamados_chamados');
Chamado.helpers({
	mensagens:function(){
		return Mensagem.find({chamado_id:this._id}).fetch();
	}
});
