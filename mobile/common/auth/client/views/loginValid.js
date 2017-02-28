Controller('loginView',{
	rendered(){
		$.fn.form.settings.rules.cpf = function(value) {
			return TestaCPF(value);
		};
		$('#loginForm').form({
			inline:false,
			fields:{
				usernameField:{
					identifier:'usernameField',
					rules:[
						{
							type:'cpf',
							prompt:'CPF inválido'
						}
					]
				},
				passwordField:{
					identifier:'passwordField',
					rules:[
						{
							type:'minLength[5]',
							prompt:'Senha deve ter 8 ou mais caracteres'
						}
					]
				}
			}
		});
	}
});
