optionsRoutes = FlowRouter.group({
	name: 'optionsRoutes',
	prefix: '/options',
	triggersEnter: [
		function(obj, redirect) {
			if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
				Bert.alert('Você não tem permissão de acesso a este módulo!', 'danger');
				redirect('homeRoute');
			}
		}
	]
});

optionsRoutes.route('/', {
	name: 'optionsRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			left: 'leftMenu',
			main: 'optionsView'
		});
	}
});

optionsRoutes.route('/novo', {
	name: 'optionsInsertRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			left: 'leftMenu',
			main: 'optionsFormView'
		});
	}
});

optionsRoutes.route('/:id', {
	name: 'optionsUpdateRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			left: 'leftMenu',
			main: 'optionsFormView'
		});
	}
});
