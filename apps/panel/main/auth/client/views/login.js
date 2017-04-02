Controller('loginView', {
	created:function(){

	},
	rendered: function() {
		$('body').css(
			'backgroundColor',
			_.filter(semanticColors,function(e){return e.className == 'blue';})[0].rgb
		);
	},
	helpers:{

	},
	events: {
		'submit #loginForm':function(e, t) {
			e.preventDefault();
			var fields = $(e.target).form('get values');
			Meteor.loginWithPassword(fields.email, fields.password, function(err, result) {
				if (err) {
					Bert.alert('Usuário ou Senha inválidos.', 'danger');
				} else {
					Bert.alert('Login efetuado com sucesso!','success');
					FlowRouter.go('homeRoute');
					$('body').css('backgroundColor','#fff');
				}
			});
		}
	}
});
