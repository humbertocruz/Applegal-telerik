Controller('sidebar', {
	rendered:function(){
		Meteor.setTimeout(function(){
			$('.ui.left.sidebar').sidebar('attach events', '.toggleSidebar');
			//$('.ui.bottom.sidebar').sidebar('attach events', '.toggleTechnotronics');
		}, 1000);
	},
	helpers: {
		userId: function() {
			return Meteor.userId();
		},
		isSubscriber: function() {
			return Roles.userIsInRole(Meteor.userId(), 'subscriber', Aplicativo.findOne()._id);
		},
		isGuest: function() {
			return Roles.userIsInRole(Meteor.userId(), 'guest', Aplicativo.findOne()._id);
		},
		isManager: function() {
			return Roles.userIsInRole(Meteor.userId(), 'manager', Aplicativo.findOne()._id);
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
