Controller('loginView', {
	rendered() {
		$('#loginForm').form({
			inline: true,
			fields: {
				userField: {
					identifier: 'usernameField',
					rules: [{
						type: 'cpf',
						prompt: 'É necessário preencher o CPF'
					}]
				},
				passwordField: {
					identifier: 'passwordField',
					rules: [{
						type: 'minLength[6]',
						prompt: 'Senha deve ter pelo menos 6 caracteres'
					}]
				}
			}
		});
	}
});
