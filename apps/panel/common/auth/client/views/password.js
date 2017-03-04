Controller('passwordView', {
	rendered: function() {
		$('#usernameField').mask('999.999.999-99');
		$('#passwordGrid').transition('fade in');
		$('#passwordForm').form({
			inline:true,
			fields:{
				emailField:{
					identifier: 'emailField',
					rules: [{
						type: 'email',
						prompt: 'É necessário preencher o Email corretamente'
					}]
				}
			}
		})
	},
	events: {
		'submit #passwordForm' (e, t) {
			e.preventDefault();
			isLoadingVar.set(true);
			var fields = $(e.target).form('get values');
			Accounts.forgotPassword({email: fields.email}, function(error,result){
				isLoadingVar.set(false);
				if (error) {
					if (error.reason == "User not found") {
						Bert.alert("Email não encontrado.",'danger');
					}
				} else {

					Bert.alert('Você receberá um email com um link para definir uma nova senha.','success');
					FlowRouter.go('loginRoute');
				}
			});
		}
	}
});
