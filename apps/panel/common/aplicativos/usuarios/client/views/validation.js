Controller('usuariosFormView',{
	rendered:function(){
		if (id = FlowRouter.getParam('userId')) {
			var fields = {
				nome: {
					identifier: 'nomeField',
					rules: [{
						type: 'empty',
						prompt: 'Digite o nome do usuário!'
					}]
				},
				aniversario: {
					identifier: 'aniversario',
					rules: [{
						type: "regExp[^(19|20)\\d\\d-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$]",
						prompt: 'Digite uma data válida.'
					}]
				},
				roles: {
					identifier: 'rolesField',
					rules: [{
						type: 'empty',
						prompt: 'Escolha as permissões do usuário!'
					}]
				},
				phone: {
					identifier: 'phoneField',
					rules: [{
						type: 'empty',
						prompt: 'Cadastre o telefone do usuário!'
					}]
				}
			};
		} else {
			var fields = {
				username: {
					identifier: 'usernameField',
					rules: [{
						type: 'empty',
						prompt: 'Digite o nome de usuário corretamente.'
					}]
				},
				nome: {
					identifier: 'nomeField',
					rules: [{
						type: 'empty',
						prompt: 'Digite o nome do usuário!'
					}]
				},
				email: {
					identifier: 'emailField',
					rules: [{
						type: 'email',
						prompt: 'Digite o email corretamente!'
					}]
				},
				aniversario: {
					identifier: 'aniversario',
					rules: [{
						type: "regExp[^(19|20)\\d\\d-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$]",
						prompt: 'Digite uma data válida.'
					}]
				},
				password1: {
					identifier: 'password1Field',
					rules: [{
						type: 'minLength[6]',
						prompt: 'Digite uma senha com pelo menos 6 números!'
					}]
				},
				password2: {
					identifier: 'password2Field',
					rules: [{
						type: 'match[password1]',
						prompt: 'As senha digitadas não são iguais!'
					}]
				},
				roles: {
					identifier: 'rolesField',
					rules: [{
						type: 'empty',
						prompt: 'Escolha as permissões do usuário!'
					}]
				},
				phone: {
					identifier: 'phoneField',
					rules: [{
						type: 'empty',
						prompt: 'Cadastre o telefone do usuário!'
					}]
				}
			};
		};
		$('#usuariosForm').form({
			inline:true,
			fields:fields
		})
	}
});
