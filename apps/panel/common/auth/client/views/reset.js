Controller('passwordResetView',{
	created:function(){
		$('#passwordResetForm').form({
			inline:true,
			fields:{
				passwordField:{
					identifier: 'passwordField',
					rules: [{
						type: 'minLength(6)',
						prompt: 'A senha precisa ter ao menos 6 caracteres.'
					}]
				},
				password2Field:{
					identifier: 'password2Field',
					rules: [{
						type: 'match(passwordField)',
						prompt: 'As senhas não são iguais.'
					}]
				}

			}
		});
	},
	rendered: function() {
		$('#passwordResetGrid').transition('fade in');
	},
	events:{
		'submit #passwordResetForm':function(e,t){
			e.preventDefault();
			var fields = $(e.currentTarget).form('get values');
			Accounts.resetPassword(FlowRouter.getParam('token'), fields.password, function(err){
				if (err) {
					Bert.alert('Houve um erro ao tentar alterar a senha!','danger');
				} else {
					Bert.alert('Sua senha foi alterada com sucesso!','success');
					FlowRouter.go('homeRoute');
				}
			});
		}
	}
});
