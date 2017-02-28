Controller('loginView', {
	created: function() {
		topTitleVar.set('Login');
	},
	rendered: function() {
		$('#usernameField').mask('999.999.999-99');
		$('#passwordField').mask('9999999999999999');
		$('#congregacaoField').dropdown();
	},
	helpers: {
		filiais: function() {
			return Filial.find().fetch();
		},
		appLogo:function(){
			var app = Aplicativo.findOne();
			if (!app) return false;
			return appLogo.baseURL+'/md5/'+app.appLogo().md5;
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
			Meteor.loginWithPassword(fields.username, fields.password, function(err, result) {
				if (err) {
					Bert.alert('Confira seu CPF e sua Senha!', 'danger');
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
