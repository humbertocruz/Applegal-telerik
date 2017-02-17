Meteor.methods({
	insertMensagem:function(fields,aplicativoId){
		fields.aplicativoId = aplicativoId;
		return Mensagem.insert(fields);
	}
});
