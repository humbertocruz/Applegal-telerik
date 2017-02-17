servicosRoutes = FlowRouter.group({
	name: 'servicosRoutes',
	prefix: '/escalas/servicos',
	triggersEnter: [
		function(obj, redirect) {
			if (!Roles.userIsInRole(Meteor.userId(), ['gerente', 'escalas'],aplicativoVar.get()._id)) {
				Bert.alert('Você não tem permissão de acesso a este módulo!', 'danger');
				redirect('homeRoute');
			}
		}
	]
});

servicosRoutes.route('/', {
	name: 'escalasServicosRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			main: 'escalasServicosView'
		});
	}
});

servicosRoutes.route('/nova', {
	name: 'escalasServicosInsertRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			main: 'escalasServicosFormView'
		});
	}
});

servicosRoutes.route('/:id', {
	name: 'escalasServicosUpdateRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			main: 'escalasServicosFormView'
		});
	}
});
