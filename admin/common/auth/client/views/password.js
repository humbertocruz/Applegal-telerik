Controller('passwordView', {
	rendered: function() {
		$('#usernameField').mask('999.999.999-99');
		$('#passwordGrid').transition('fade');
	},
	events: {
		'submit #passwordForm' (e, t) {
			e.preventDefault();
			isLoadingVar.set(true);
			var fields = $(e.target).form('get values');
			Accounts.forgotPassword({email: fields.email}, function(){
				isLoadingVar.set(false);
				Bert.alert('Você receberá um email com um link para definir uma nova senha.','success');
				FlowRouter.go('loginRoute');
			});
		}
	}
});
