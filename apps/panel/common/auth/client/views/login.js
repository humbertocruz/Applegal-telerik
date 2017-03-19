Controller('loginView', {
	rendered: function() {
	},
	events: {
		'submit #loginForm':function(e, t) {
			e.preventDefault();
			isLoadingVar.set(true);
			var fields = $(e.target).form('get values');
			Meteor.loginWithPassword(fields.email, fields.password, function(err, result) {
				if (err) {
					Bert.alert('Usuário ou Senha não encontrados!', 'danger');
					isLoadingVar.set(false);
				} else {
					$('body').css('backgroundColor','#fff');
					isLoadingVar.set(false);
					FlowRouter.go('homeRoute');
				}
			});
		}
	}
});
