Controller('loginView', {
	rendered() {
		$('#loginForm').form({
			inline: true,
			fields: {
				userField: {
					identifier: 'usernameField',
					rules: [{
						type: 'empty',
						prompt: 'É necessário preencher o CPF.'
					},{
						type: 'cpf',
						prompt: 'É necessário preencher o CPF corretamente.'
					}]
				},
				passwordField: {
					identifier: 'passwordField',
					rules: [{
						type: 'empty',
						prompt: 'Senha deve ser preenchida.'
					},{
						type: 'minLength[6]',
						prompt: 'Senha deve ter pelo menos 6 caracteres.'
					}]
				}
			}
		});
	}
});
