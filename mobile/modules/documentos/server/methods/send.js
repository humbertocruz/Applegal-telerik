Meteor.methods({
	emailsSendDocument:function(documento_id){
		var user = Meteor.users.findOne(this.userId);
		var documento = Documento.findOne(documento_id);
		var email = Email.send({
			from:'gremio@gremiopineiro.com.br',
			to:user.emails[0].address,
			subject:'Grêmio Pioneiro - Você solicitou um arquivo por email',
			html:'Clique <a href="https://admin.gremiopioneiro.com.br/documentos/download/'+documento._id+'">aqui</a> para fazer o download do arquivo solicitado.'
		});
		return email;
	}
});
