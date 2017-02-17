Controller('registerView', {
	rendered:function() {
		$('#registerForm').form({
			inline: true,
			fields: {
				nameField: {
					identifier: 'nameField',
					rules: [{
						type: 'empty',
						prompt: 'É necessário preencher o Nome'
					}]
				},
				userField: {
					identifier: 'usernameField',
					rules: [{
						type: 'cpf',
						prompt: 'É necessário preencher o CPF corretamente'
					}]
				},
				birthField: {
					identifier: 'birthField',
					rules: [{
						type: 'empty',
						prompt: 'É necessário preencher a data de aniversário'
					}]
				},
				passwordField: {
					identifier: 'passwordField',
					rules: [{
						type: 'minLength[6]',
						prompt: 'Senha deve ter pelo menos 6 caracteres'
					}]
				},
				password2Field: {
					identifier: 'password2Field',
					rules: [{
						type: 'match[passwordField]',
						prompt: 'As senhas digitadas não são iguais'
					}]
				}
			}
		});
	}
});
