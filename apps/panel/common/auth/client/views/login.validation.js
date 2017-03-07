Controller('loginView', {
	rendered() {
		$('#loginForm').form({
			inline: true,
			fields: {
				emailField: {
					identifier: 'emailField',
					rules: [{
						type: 'email',
						prompt: 'Email inválido.'
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
