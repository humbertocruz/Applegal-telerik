Controller('loginView', {
	created: function() {
		topTitleVar.set('Login');
	},
	rendered: function() {
		var app = Aplicativo.findOne();
		if (app.login.loginTitleMask) $('#usernameField').mask(app.login.loginTitleMask);
		//if (app.loginPasswordMask) $('#passwordField').mask(app.loginPasswordMask);
	},
	helpers: {
		filiais: function() {
			return Filial.find().fetch();
		}
	},
	events: {
		'click .showPasswordBtn' (e, t) {
			if ($(e.currentTarget).prev().hasClass('hidePwd')) {
				$(e.currentTarget).prev().removeClass('hidePwd');
			} else {
				$(e.currentTarget).prev().addClass('hidePwd');
			}
		},
		'submit #loginForm' (e, t) {
			e.preventDefault();
			isLoadingVar.set('Fazendo Login...');
			var fields = $(e.target).form('get values');
			if (fields.email) {
				var loginField = fields.email;
			} else {
				var loginField = fields.username;
			}
			Meteor.loginWithPassword(loginField, fields.password, function(err, result) {
				if (err) {
					Bert.alert('Não foi possível fazer o login!', 'danger');
					isLoadingVar.set(false);
				} else {
					isLoadingVar.set(false);
					FlowRouter.go('homeRoute');
					Bert.alert('Login efeutado com sucesso!', 'success');
				}
			});
		}
	}
});
