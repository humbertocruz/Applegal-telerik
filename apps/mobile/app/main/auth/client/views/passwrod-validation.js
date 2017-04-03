Controller('passwordView',{
	rendered(){
		$('#passwordForm').form({
			inline:false,
			fields:{
				usernameField:{
					identifier:'usernameField',
					rules:[
						{
							type:'empty',
							prompt:'CPF em branco'
						}
					]
				},
				password1Field:{
					identifier:'password1Field',
					rules:[
						{
							type:'minLength[6]',
							prompt:'Senha deve ter 6 ou mais caracteres'
						}
					]
				},
				password2Field:{
					identifier:'password2Field',
					rules:[
						{
							type:'match[password1Field]',
							prompt:'As senhas digitadas não são iguais.'
						}
					]
				}
			}
		});
	}
});
