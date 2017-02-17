galeriasRoutes = FlowRouter.group({
	name: 'galeriasRoutes',
	prefix: '/galerias',
	triggersEnter: [
		function(obj, redirect) {
			if (!Roles.userIsInRole(Meteor.userId(), ['gerente', 'galerias'], aplicativoVar.get()._id)) {
				Bert.alert('Você não tem permissão de acesso a este módulo!', 'danger');
				redirect('homeRoute');
			}
		}
	]
});

galeriasRoutes.route('/', {
	name: 'galeriasRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			main: 'galeriasView'
		});
	}

});

galeriasRoutes.route('/nova', {
	name: 'galeriasInsertRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			main: 'formGaleriasView'
		});
	}
});

galeriasRoutes.route('/:id', {
	name: 'galeriasUpdateRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			main: 'formGaleriasView'
		});
	}
});
