Controller('passwordView', {
	rendered: function() {
		$('#passwordForm').form({
			onFailure:function(msg){
				var msg = toSemanticList(msg);
				Bert.alert(msg,'danger');
				return false;
			},
			inline:false,
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
				}
			});
		}
	}
});
