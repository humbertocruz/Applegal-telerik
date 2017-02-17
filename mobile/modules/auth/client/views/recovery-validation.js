Controller('recoveryView',{
	rendered(){
		$('#recoveryForm').form({
			inline:true,
			fields:{
				codeField:{
					identifier:'codeField',
					rules:[
						{
							type:'minLength[4]',
							prompt:'O Código deve ter 4 dígitos.'
						}
					]
				},
				password1Field:{
					identifier:'password1Field',
					rules:[
						{
							type:'minLength[6]',
							prompt:'Senha deve ter 6 ou mais caracteres.'
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
