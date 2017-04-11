import { permRoutes } from '../../../permRoutes.js';

escalasRoutes = permRoutes.group({
	name: 'escalasRoutes',
	prefix: '/escalas',
	triggersEnter: [
		function(obj, redirect) {
			var access = false;
      // Admin tem acesso
			if (Roles.userIsInRole(Meteor.userId(), ['admin'])) access = true;
      // Manager e Perm Exclusiva do App tem acesso
			if (Roles.userIsInRole(Meteor.userId(), ['manager','escalas'], obj.params.aplicativoId)) access = true;
      // Niguem mais tem acesso
			if (!access) {
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
			left: 'leftMenu',
			main: 'escalasView'
		});
	}

});

escalasRoutes.route('/nova', {
	name: 'escalasInsertRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			left: 'leftMenu',
			main: 'escalasFormView'
		});
	}
});

escalasRoutes.route('/:id/edita', {
	name: 'escalasUpdateRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			left: 'leftMenu',
			main: 'escalasFormView'
		});
	}
});
