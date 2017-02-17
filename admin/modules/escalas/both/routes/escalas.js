escalasRoutes = FlowRouter.group({
	name: 'escalasRoutes',
	prefix: '/escalas',
	triggersEnter: [
		function(obj, redirect) {
			if (!Roles.userIsInRole(Meteor.userId(), ['gerente', 'escala'],aplicativoVar.get()._id)) {
				Bert.alert('Você não tem permissão de acesso a este módulo!', 'danger');
				redirect('homeRoute');
			}
		}
	]
});

escalasRoutes.route('/', {
	name: 'escalasRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			main: 'escalasView'
		});
	}

});

escalasRoutes.route('/nova', {
	name: 'escalasInsertRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			main: 'escalasFormView'
		});
	}
});

escalasRoutes.route('/:id/edita', {
	name: 'escalasUpdateRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			main: 'escalasFormView'
		});
	}
});
