Controller('adminMenu', {
	rendered: function() {

	},
	helpers: {
		modulos: function() {
			return [];
		},
		rolesSubs: function() {
			return Roles.subscription.ready();
		},
		userId: function() {
			return Meteor.userId();
		},
		userEmail: function() {
			if (!Meteor.user()) return '';
			return Meteor.user().emails[0].address;
		},
		user:function(){
			return Meteor.user();
		}
	},
	events: {
		'click #logoutEvent': function(e, t) {
			htmlConfirm('Sair do Sistema', 'Você tem certeza?', function() {
				isLoadingVar.set(true);
				Meteor.logout(function() {
					Bert.alert('Usuário desconectado com sucesso', 'success', 'growl-top-right');
					FlowRouter.go('loginRoute');
					isLoadingVar.set(false);
				});
			});
		}
	}
});
