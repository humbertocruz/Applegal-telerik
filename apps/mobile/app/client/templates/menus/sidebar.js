Controller('sidebar', {
	rendered:function(){

	},
	helpers: {
		clientAppReady:function(){
			return clientApp.ready();
		},
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
		plugins: function() {
			return AplicativoPlugin.find().fetch();
		},
		existsRoute:function(route){
			var routes = FlowRouter._routes;
			var exist = _.findWhere(routes,{name:route.route});
			if (!exist) console.log(route);
			return exist;
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
