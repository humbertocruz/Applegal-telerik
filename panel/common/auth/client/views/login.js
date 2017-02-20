Controller('loginView', {
	rendered: function() {
		$('#usernameField').mask('999.999.999-99');
		$('#passwordField').mask('9999999999999999');
		$('#loginGrid').transition('horizontal flip in');
	},
	events: {
		'submit #loginForm' (e, t) {
			e.preventDefault();
			isLoadingVar.set(true);
			var fields = $(e.target).form('get values');
			Meteor.loginWithPassword(fields.username, fields.password, function(err, result) {
				if (err) {
					Bert.alert('Usuário ou Senha não encontrados!', 'danger');
					isLoadingVar.set(false);
				} else {
					isLoadingVar.set(false);
					FlowRouter.go('homeRoute');
				}
			});
		}
	}
});
