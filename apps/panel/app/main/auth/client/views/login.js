Controller('loginView', {
	created:function(){
		loginIsLoadingVar = new ReactiveVar(false);
	},
	rendered: function() {
		$('body').css(
			'backgroundColor',
			_.filter(semanticColors,function(e){return e.className == 'blue';})[0].rgb
		);
	},
	helpers:{
		loginIsLoading:function(){
			return (loginIsLoadingVar.get()?'loading':'');
		}
	},
	events: {
		'submit #loginForm':function(e, t) {
			e.preventDefault();
			loginIsLoadingVar.set(true);
			var fields = $(e.target).form('get values');
			Meteor.loginWithPassword(fields.email, fields.password, function(err, result) {
				if (err) {
					loginIsLoadingVar.set(false);
					Bert.alert('Usuário ou Senha inválidos.', 'danger');
				} else {
					loginIsLoadingVar.set(false);
					Bert.alert('Login efetuado com sucesso!','success');
					FlowRouter.go('homeRoute');
					$('body').css('backgroundColor','#fff');
				}
			});
		}
	}
});
