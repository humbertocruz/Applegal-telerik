Controller('recoveryView',{
	created:function(){
	},
	rendered:function(){
		$('#password1Field').mask('9999999999999999');
		$('#password2Field').mask('9999999999999999');
		$('#codeField').mask('9999');
	},
	helpers:{
		recovery:function(){
			return recoveryVar.get();
		}
	},
	events:{
		'click .showPasswordBtn'(e,t){
			if ($(e.currentTarget).prev().hasClass('hidePwd')) {
				$(e.currentTarget).prev().removeClass('hidePwd');
			} else {
				$(e.currentTarget).prev().addClass('hidePwd');
			}
		},
		'submit #recoveryForm'(e,t){
			e.preventDefault();
			var fields = $(e.currentTarget).form('get values');
			fields._id = FlowRouter.getParam('id');
			Meteor.call("usersChangePasswordWithCode", fields, function(error, result){
				if(error){
					console.log("error", error);
				}
				if(result === false){
					Bert.alert('O código não está correto.','danger');
				} else {
					Bert.alert('Sua senha foi alterada com sucesso. Faça o login.','success');
					FlowRouter.go('loginRoute');
				}
			});
		}
	}
});
