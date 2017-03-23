Meteor.methods({
	emailSendPasswordCode:function(id,email){
		var code = Random.hexString(6);
		var email = Email.send({
			from:'suporte@mg.applegal.com.br',
			to:email,
			subject:'Recuperação de Senha',
			html:'Seu código para recuperação de senha é '+code+'. Digite este código no aplicativo e configure uma nova senha.'
		});
		Meteor.users.update(id,{$set:{'profile.recovery':code}});
		return email;
	}
});
