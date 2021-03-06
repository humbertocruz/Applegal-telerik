Controller('leftMenuProfile',{
	helpers:{
		user:function(){
			return Meteor.user();
		}
	},
	rendered:function(){
		$('#changeAvatarShow').dimmer({
			on: 'hover'
		});
	},
	events:{
		'click #logoutEvent':function(e,t){
			htmlConfirm('Sair do Sistema', 'Você tem certeza?', function() {
				isLoadingVar.set(true);
				Meteor.logout(function() {
					Bert.alert('Usuário desconectado com sucesso', 'success');
					FlowRouter.go('loginRoute');
					isLoadingVar.set(false);
				});
			});
		}
	}
});
