modulosRoutes = FlowRouter.group({
	name: 'modulosRoutes',
	prefix: '/modulos',
	triggersEnter: [
		function(obj, redirect) {
			if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
				Bert.alert('Você não tem permissão de acesso a este módulo!', 'danger');
				redirect('homeRoute');
			}
		}
	]
});

modulosRoutes.route('/', {
	name: 'modulosRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			left: 'leftMenuAdmin',
			main: 'modulosView'
		});
	}
});

modulosRoutes.route('/novo', {
	name: 'modulosInsertRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			left: 'leftMenuAdmin',
			main: 'modulosFormView'
		});
	}
});

modulosRoutes.route('/:id', {
	name: 'modulosUpdateRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			left: 'leftMenuAdmin',
			main: 'modulosFormView'
		});
	}
});
