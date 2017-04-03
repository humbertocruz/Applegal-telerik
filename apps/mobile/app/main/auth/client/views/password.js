Controller('passwordView',{
	created:function(){
		topTitleVar.set('Recuperar Senha');
	},
	rendered:function(){
		$('#usernameField').mask('999.999.999-99');
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
		'submit #passwordForm'(e,t){
			e.preventDefault();
			var fields = $(e.currentTarget).form('get values');
			Meteor.call("usersFindByEmail", fields, function(error, result){
				if(error){
					console.log("error", error);
				}
				if (result === false) {
					Bert.alert('Email não encontrado!','danger');
				} else {
					Bert.alert('Email encontrado! Verifique o código no seu email e altere sua senha.','success');
					Meteor.call("emailSendPasswordCode", result._id, result.emails[0].address);
					FlowRouter.go('recoveryRoute',{id:result._id});
				}
			});
		}
	}
});
