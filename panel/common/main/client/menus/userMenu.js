Controller('userMenu', {
	created:function(){
		Tracker.autorun(function(){
			appModulos = Meteor.subscribe("appModulos", aplicativoVar.get()._id);
		});
	},
	rendered: function() {
	},
	helpers: {
		aplicativoId:function(){
			return aplicativoVar.get()._id;
		},
		appModulos: function() {
			var mods = AplicativoModulo.find().fetch();
			return mods;
		},
		rolesSubs: function() {
			return Roles.subscription.ready();
		},
		userId: function() {
			return Meteor.userId();
		},
		user:function(){
			return Meteor.user();
		},
		userEmail: function() {
			if (!Meteor.user()) return '';
			return Meteor.user().emails[0].address;
		}
	},
	events: {
		'click .reloadApp':function(e,t){
			location.reload();
		},
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
