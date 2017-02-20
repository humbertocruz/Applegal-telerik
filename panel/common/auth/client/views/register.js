Controller('registerView', {
	rendered: function() {
		$('#usernameField').mask('999.999.999-99');
		$('#passwordField').mask('9999999999999999');
		$('#registerGrid').transition('horizontal flip in');
	},
	events: {
		'submit #registerForm' (e, t) {
			e.preventDefault();
			isLoadingVar.set(true);
			var fields = $(e.target).form('get values');
			Meteor.call("registerUser", fields, function(error, result){
				if(error){
					console.log("error", error);
				}
				if(result){
					isLoadingVar.set(false);
					FlowRouter.go('homeRoute');
					Bert.alert('Registro efeutado com sucesso!', 'success');
				}
			});
		}
	}
});
