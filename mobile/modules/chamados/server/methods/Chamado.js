Meteor.methods({
	startChamado:function(){
		 var fields = {
			 user_id:this.userId,
			 date:moment().toDate(),
			 close:false
		 };
		 var id = Chamado.insert(fields);
		 return id;
	},
	insertMensagem:function(fields){
		return Mensagem.insert(fields);
	}
});
