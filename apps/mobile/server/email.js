Meteor.methods({
	emailSendPasswordCode:function(id,email){
		var code = Math.floor(Math.random()*(9999-1111+1)+1111);
		var email = Email.send({
			from:'suporte@applegal.com.br',
			to:email,
			subject:'Recuperação de Senha',
			html:'Seu código para recuperação de senha é '+code+'. Digite este código no aplicativo e configure uma nova senha.'
		});

		Meteor.users.update(id,{$set:{'profile.recovery':code}});
		return email;
	}
});
