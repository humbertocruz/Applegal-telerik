Controller('registerView', {
	rendered: function() {
		$('#usernameField').mask('999.999.999-99');
		//$('#passwordField').mask('9999999999999999');
		$('#registerGrid').transition('horizontal flip in');
	},
	events: {
		'submit #registerForm' (e, t) {
			e.preventDefault();
			isLoadingVar.set(true);
			var fields = $(e.target).form('get values');
			var birth = moment(fields.birth).startOf('day');
			var user = {
				username: fields.username,
				email: fields.email,
				password: fields.password,
				profile:{
					name:fields.name,
					phone: fields.phone,
					birth: birth.toDate(),
					birth_day: birth.format('DD'),
					birth_month: birth.format('MM'),
					birth_year: birth.format('YYYY')
				}
			};
			Accounts.createUser(user,function(error,result){
				isLoadingVar.set(false);
				FlowRouter.go('homeRoute');
				Bert.alert('Registro efetuado com sucesso!', 'success');
			});
		}
	}
});
