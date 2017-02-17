Controller('sidebar', {
	helpers: {
		userId: function() {
			return Meteor.userId();
		},
		isSuspended: function() {
			return Roles.userIsInRole(Meteor.userId(), 'suspenso');
		},
		modulos: function() {
			return AplicativoModulo.find().fetch();
		}
	},
	events: {
		'click .item': function() {
			$('.ui.sidebar').sidebar('hide');
		},
		'click #logoutBtn': function(e, t) {
			htmlConfirm('Atenção', 'Tem certeza que deseja sair?', function() {
				isLoadingVar.set('Fazendo logout...');
				FlowRouter.go('homeRoute');
				Meteor.logout();
			});
		}
	}
});
