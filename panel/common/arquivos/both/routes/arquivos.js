arquivosRoutes = FlowRouter.group({
	name: 'arquivosRoutes',
	prefix: '/arquivos',
	triggersEnter: [
		function(obj, redirect) {
			if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
				Bert.alert('Você não tem permissão de acesso a este módulo!', 'danger');
				redirect('homeRoute');
			}
		}
	]
});

arquivosRoutes.route('/', {
	name: 'arquivosRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			left: 'leftMenuAdmin',
			main: 'arquivosView'
		});
	}
});

arquivosRoutes.route('/novo', {
	name: 'arquivosInsertRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			left: 'leftMenuAdmin',
			main: 'arquivosFormView'
		});
	}
});

arquivosRoutes.route('/:id', {
	name: 'arquivosUpdateRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			left: 'leftMenuAdmin',
			main: 'arquivosFormView'
		});
	}
});
