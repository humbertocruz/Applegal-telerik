tiposRoutes = FlowRouter.group({
	name: 'tiposRoutes',
	prefix: '/documentos/tipos',
	triggersEnter: [
		function(obj, redirect) {
			if (!Roles.userIsInRole(Meteor.userId(), ['gerente', 'documentos'],aplicativoVar.get()._id)) {
				Bert.alert('Você não tem permissão de acesso a este módulo!', 'danger');
				redirect('homeRoute');
			}
		}
	]
});

tiposRoutes.route('/', {
	name: 'documentosTiposRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			main: 'documentosTiposView'
		});
	}
});

tiposRoutes.route('/nova', {
	name: 'documentosTiposInsertRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			main: 'documentosTiposFormView'
		});
	}
});

tiposRoutes.route('/:id', {
	name: 'documentosTiposUpdateRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			main: 'documentosTiposFormView'
		});
	}
});
