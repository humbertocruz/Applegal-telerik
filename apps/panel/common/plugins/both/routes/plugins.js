pluginsRoutes = FlowRouter.group({
	name: 'pluginsRoutes',
	prefix: '/plugins',
	triggersEnter: [
		function(obj, redirect) {
			if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
				Bert.alert('Você não tem permissão de acesso a este módulo!', 'danger');
				redirect('homeRoute');
			}
		}
	]
});

pluginsRoutes.route('/', {
	name: 'pluginsRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			left: 'leftMenuAdmin',
			main: 'pluginsView'
		});
	}
});

pluginsRoutes.route('/novo', {
	name: 'pluginsInsertRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			left: 'leftMenuAdmin',
			main: 'pluginsFormView'
		});
	}
});

pluginsRoutes.route('/:id', {
	name: 'pluginsUpdateRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			left: 'leftMenuAdmin',
			main: 'pluginsFormView'
		});
	}
});
