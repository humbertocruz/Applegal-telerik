Controller('loginView', {
	rendered() {
		$('#loginForm').form({
			onFailure:function(msg){
				var msg = toSemanticList(msg);
				Bert.alert(msg,'danger');
				return false;
			},
			inline: false,
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
						type: 'minLength[6]',
						prompt: 'Senha deve ter pelo menos 6 caracteres.'
					}]
				}
			}
		});
	}
});
