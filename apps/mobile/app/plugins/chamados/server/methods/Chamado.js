Meteor.methods({
	startChamado:function(){
		 var fields = {
			 user_id:this.userId,
			 date:moment().toDate(),
			 aplicativoId:Aplicativo.findOne()._id,
			 close:false
		 };
		 var id = Chamado.insert(fields);
		 return id;
	},
	insertMensagem:function(fields){
		fields.aplicativoId = Aplicativo.findOne()._id;
		return Mensagem.insert(fields);
	}
});
