Controller('loginView',{
	rendered(){
		var app = Aplicativo.findOne();
		var usernameValidation = [];
		usernameValidation.push({
			type:'empty',
			prompt:app.login.loginTitle+' não pode estar em branco.'
		});
		if (app.login.loginTitleValidation == 'cpf') {
			usernameValidation.push({
				type:'cpf',
				prompt:'CPF inválido'
			});
		}
		$('#loginForm').form({
			onFailure:function(a,b,c){
				var msg = toSemanticList(a);
				Bert.alert(msg,'danger');
				return false;
			},
			inline:false,
			fields:{
				usernameField:{
					identifier:'usernameField',
					rules:usernameValidation
				},
				emailField:{
					identifier:'emailField',
					rules:[
						{
							type:'email',
							prompt:'Email inváldo'
						}
					]
				},
				passwordField:{
					identifier:'passwordField',
					rules:[
						{
							type:'minLength[5]',
							prompt:'Senha deve ter 6 ou mais caracteres'
						}
					]
				}
			}
		});
	}
});
