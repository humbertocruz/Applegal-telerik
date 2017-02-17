documentosRoutes = FlowRouter.group({
	name: 'documentosRoutes',
	prefix: '/documentos',
	triggersEnter: [
		function(obj, redirect) {
			if (!Roles.userIsInRole(Meteor.userId(), ['gerente','documentos'],aplicativoVar.get()._id)) {
				Bert.alert('Você não tem permissão de acesso a este módulo!', 'danger');
				redirect('homeRoute');
			}
		}
	]
});

documentosRoutes.route('/', {
	name: 'documentosRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			main: 'documentosView'
		});
	}

});

documentosRoutes.route('/nova', {
	name: 'documentosInsertRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			main: 'documentosFormView'
		});
	}
});

documentosRoutes.route('/:id/edita', {
	name: 'documentosUpdateRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			main: 'documentosFormView'
		});
	}
});
